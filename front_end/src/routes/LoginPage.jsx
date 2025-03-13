import { useState } from "react";
import EmailLogin from "../components/EmailLogin.jsx";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordLogin from "../components/PasswordLogin.jsx";
import { isAuth } from "../auth/auth.js";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordStage, setIsPasswordStage] = useState(false);
    const navigate = useNavigate();
    const isSignedIn = isAuth();

    const emailMutation = useMutation({
        mutationFn: (email) => {
            return axios.post(`${import.meta.env.VITE_API_URL}/auth/login/email`, {
                email: email,
            });
        },

        onSuccess: () => {
            setIsPasswordStage(true);
        },

        onError: () => {
            toast.error("Email not found");
        },
    });

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email is required.");
        } else {
            emailMutation.mutate(email);
        }
    };

    const passwordMutation = useMutation({
        mutationFn: ({email, password}) => {
            return axios.post(`${import.meta.env.VITE_API_URL}/auth/login/password`, {
                email: email,
                password: password,
            }, {withCredentials: true});
        },

        onSuccess: (res) => {
            localStorage.removeItem("user");
            localStorage.removeItem("exp");
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("exp", Date.now() + 172800000);
            window.location.replace("/home");
        },

        onError: () => {
            toast.error("Wrong password");
        },
    });

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (!password) {
            toast.error("Password is required.");
        } else {
            passwordMutation.mutate({email, password});
        }
    }

    if (isSignedIn) {
        navigate('/home');
    }

    if (!isPasswordStage) {
        return <EmailLogin setEmail={setEmail} onSubmit={handleEmailSubmit} disabled={emailMutation.isPending}/>
    } else {
        return <PasswordLogin setPassword={setPassword} onSubmit={handlePasswordSubmit} setIsPasswordStage={setIsPasswordStage} setEmail={setEmail} disabled={emailMutation.isPending}/>
    }
}

export default LoginPage;