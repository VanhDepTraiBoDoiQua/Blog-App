import React from "react";

const PasswordLogin = ({setPassword, onSubmit, setIsPasswordStage, setEmail, disabled}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }

    const handleClick = () => {
        setIsPasswordStage(false);
        setEmail("");
    }

    const handleForgotPassword = () => {

    }

    return (
        <div className="flex items-center justify-center mt-12">
            <div className="bg-slate-50 rounded-2xl shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold m-6">Enter your password</h2>
                <p className="text-gray-600 text-sm my-4 m-6">Enter the password associated with your account</p>
                <div className="flex flex-row justify-between">
                    <span className="text-xs flex justify-start ml-9 font-medium mb-1">Password</span>
                    <span onClick={handleForgotPassword} className="text-xs flex justify-end mr-9 font-medium mb-1 hover:underline cursor-pointer">Forgot password?</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="hover:border-slate-500 text-sm w-5/6 px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-500 mx-6"
                    />
        
                    <button disabled={disabled} type="submit" className="text-sm w-1/2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 mx-6 mb-6 disabled:cursor-not-allowed">
                        Continue
                    </button>
                </form>
                <div className="bg-stone-200 pt-3">
                    <p className="text-sm text-gray-600 font-bold hover:underline ml-2 cursor-pointer" onClick={handleClick}>
                        Back
                    </p>
                </div>
                <div className="bg-stone-200 rounded-b-2xl py-2">
                </div>
            </div>
        </div>
    );
}
export default PasswordLogin;