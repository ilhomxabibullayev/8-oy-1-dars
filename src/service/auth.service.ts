import { apiClaint } from "../config/aoi.config";
import { LoginBody, RegisterBody } from "../interfaces/AuthInterface";

export async function register(body: RegisterBody) {
    const res = await apiClaint.post('/auth/register', body);
    return res.data
}

export function login(body: LoginBody) {
    return apiClaint.post('/auth/login', body)
}

