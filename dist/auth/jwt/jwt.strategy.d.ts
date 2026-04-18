import { TokenPayload } from "../../types/token.interface";
import { User } from "../../types/user.interface";
import { AuthService } from "../auth.service";
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: TokenPayload): Promise<User>;
}
export {};
