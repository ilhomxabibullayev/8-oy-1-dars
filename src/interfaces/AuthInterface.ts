export interface RegisterBody {
    username: string;
    password: string;
    email: string;
    birthDate: string;
    gender: string;
}

export interface LoginBody {
    login: string;
    password: string;
}

export interface AuthResponse {
    accsesToken: string,
    user: {
        username: string;
        password: string;
        email: string;
        birthDate: string;
        gender: string;
        bio: string | null;
        avatar: string | null;
        id: number
    }
}