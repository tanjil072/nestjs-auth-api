import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { TokenPayload } from "../../types/token.interface";
import { User } from "../../types/user.interface";
import { AuthService } from "../auth.service";

type AuthHeader = string | string[] | undefined;

interface RequestWithHeaders {
  headers?: {
    authorization?: AuthHeader;
  };
}

const extractBearerToken = (req: RequestWithHeaders): string | null => {
  const authHeader = req.headers?.authorization;
  if (!authHeader) {
    return null;
  }

  const headerValue = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  const [scheme, token] = headerValue.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private authService: AuthService) {
    // `passport-jwt` strategy typing can resolve loosely in some lint setups.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      jwtFromRequest: extractBearerToken,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "super-secret-key-for-dev",
    });
  }

  async validate(payload: TokenPayload): Promise<User> {
    const user = (await this.authService.validateUser(payload)) as User | null;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
