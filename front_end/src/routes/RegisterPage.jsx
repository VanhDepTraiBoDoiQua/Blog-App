import { SignUp } from "@clerk/clerk-react";

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-80px)] my-10">
            <SignUp signInUrl="/login" forceRedirectUrl="/home"/>
        </div>
    )
}

export default RegisterPage;