import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { register } from "../../../service/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/authSlice";
import { AxiosError } from "axios";
import { NavLink, useNavigate } from "react-router";
import './register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        birthDate: "",
        gender: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mutation = useMutation(register, {
        onSuccess: (data: any) => {
            console.log("success bo'ldi");

            dispatch(setUser(data));

            toast.success("MUvaffiqiyatli ro'yxatdan o'tdingiz");
            navigate("/");
        },
        onError: (error: AxiosError) => {
            console.log("error bo'ldi", error);
            toast.error(
                (error?.response?.data as unknown as { error: string }).error ||
                "Xatolik yuz berdi"
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
        <div className="">
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
                className=""
            >
                <h1 className="">Register</h1>
                <div className="">
                    <label className="">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className=""
                        required
                    />
                </div>
                <div className="">
                    <label className="">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className=""
                        required
                    />
                </div>
                <div className="">
                    <label className="">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className=""
                        required
                    />
                </div>
                <div className="">
                    <label className="">Birth Date</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className=""
                        required
                    />
                </div>
                <div className="">
                    <label className="">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className=""
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <NavLink to="/">
                        <span>Do you already have account?</span>
                    </NavLink>
                </div>
                <button
                    type="submit"
                    className=""
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;