export interface TokenPayload {
  sub: string;
  email: string;
  role: "user" | "admin";
}
