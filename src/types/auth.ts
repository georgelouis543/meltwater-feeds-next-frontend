export interface AuthData {
    access_token?: string,
    token_type?: string,
    user_email?: string,
    user_role?: string,
}

export interface AuthContextType {
    auth: AuthData;
    setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};

export interface RefreshResponse {
    access_token: string,
    token_type: string,
    user_email: string,
    user_role: string
}