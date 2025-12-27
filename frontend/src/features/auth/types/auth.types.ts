// Request types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
    phone: string;
}

// Response types
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
    user: UserInfo;
}

export interface UserInfo {
    email: string;
    username: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
export type RegisterResponse = ApiResponse<null>;
export type LogoutResponse = ApiResponse<null>;
export type RefreshTokenResponse = ApiResponse<{ accessToken: string }>;
