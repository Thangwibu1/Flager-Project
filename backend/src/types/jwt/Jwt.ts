export interface JwtPayload {
    userId: string;
    email?: string;
    username?: string;
    iat?: number;
    exp?: number;
}
