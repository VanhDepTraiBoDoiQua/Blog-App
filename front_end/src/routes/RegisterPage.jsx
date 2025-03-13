import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuth } from "../auth/auth.js";

const RegisterPage = () => {
    const navigate = useNavigate();
    const isSignedIn = isAuth();

    const registerMutation = useMutation({
        mutationFn: async (userdata) => {
            return await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
                data: userdata,
            })
        },

        onSuccess: () => {
            toast.success("Account created! Please login again");
            navigate("/login");
        },

        onError: (res) => {
            toast.error(res?.response?.data);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password")
        }
        if (userData.username && userData.email && userData.password) {
            registerMutation.mutate(userData);
        } else {
            toast.error("Username, email and password are required!");
        }
    }

    if (isSignedIn) {
        navigate('/home');
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-slate-50 rounded-2xl shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold m-6">Create your account</h2>
                <p className="text-gray-600 text-sm my-4 m-6">Welcome! Please fill in the details to get started</p>
                
                <div className="flex space-x-2 mb-4 m-6">
                    <a href={`${import.meta.env.VITE_API_URL}/auth/facebook`} className="flex-1 flex items-center justify-center border px-4 py-2 rounded-lg text-gray-700 hover:bg-slate-100 hover:transform hover:scale-98 hover:shadow-inner disabled:cursor-progress">
                        <FaFacebook className="mr-2 text-blue-600" /> Facebook
                    </a>
                    <a href={`${import.meta.env.VITE_API_URL}/auth/google`} disabled={registerMutation.isPending} className="flex-1 flex items-center justify-center border px-4 py-2 rounded-lg text-gray-700 hover:bg-slate-100 hover:transform hover:scale-98 hover:shadow-inner">
                        <FaGoogle className="mr-2 text-red-500 disabled:cursor-progress" /> Google
                    </a>
                </div>
                
                <div className="text-gray-500 text-sm mb-4 m-6">
                    <span className="px-2">or</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-between text-xs font-medium mb-1">
                        <div className="flex gap-6">
                            <span className="ml-9">First name</span>
                            <span className="font-light">Optional</span>
                        </div>
                        <div className="flex gap-6">
                            <span className="">Last name</span>
                            <span className="font-light mr-9">Optional</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center gap-6">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            className="hover:border-slate-500 text-sm w-1/2 px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-500 ml-8"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            className="hover:border-slate-500 text-sm w-1/2 px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-500 mr-8"
                        />
                    </div>

                    <span className="text-xs flex justify-start ml-9 font-medium mb-1">Username</span>
                    <input
                        type="text"
                        name="username"
                        className="hover:border-slate-500 text-sm w-5/6 px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-500 mx-6"
                    />

                    <span className="text-xs flex justify-start ml-9 font-medium mb-1">Enter your email</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="hover:border-slate-500 text-sm w-5/6 px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-500 mx-6"
                    />

                    <span className="text-xs flex justify-start ml-9 font-medium mb-1">Enter your password</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="hover:border-slate-500 text-sm w-5/6 px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-500 mx-6"
                    />
                    
                    <button disabled={registerMutation.isPending} type="submit" className="text-sm w-1/2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 m-6 disabled:cursor-progress">
                        Continue
                    </button>
                </form>
                <div className="bg-stone-200 pt-3">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link to="/login" className="font-bold hover:underline ml-2">Sign in</Link>
                    </p>
                </div>
                <div className="bg-stone-200 rounded-b-2xl py-2">
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;