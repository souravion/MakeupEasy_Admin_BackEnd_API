export interface JwtPayload {
    userId: string;
    username: string;
    name: string;
    iat: number;
    exp: number;
  }