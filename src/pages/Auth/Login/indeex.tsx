import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { login } from "../../../service/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/authSlice";
import { AxiosError } from "axios";
import { NavLink, useNavigate } from "react-router";
import './login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        login: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mutation = useMutation(login, {
        onSuccess: (data: any) => {
            console.log("Login successful");
            dispatch(setUser(data));

            toast.success("Welcome back!");
            navigate("/");
        },
        onError: (error: AxiosError) => {
            console.log("Login failed", error);
            toast.error(
                (error?.response?.data as unknown as { error: string }).error ||
                "An error occurred"
            );
        },
    });

    const handleChange = (e: ChangeEvent) => {
        const { name, value } = e.target as unknown as {
            name: string;
            value: string;
        };

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div className="form-container">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="form">
                <h1 className="form-title">Login</h1>
                <div className="form-field">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div>
                    <NavLink to="/register">
                        <span className="form-link">Don't have an account? Register</span>
                    </NavLink>
                </div>
                <button
                    type="submit"
                    className="form-button"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
