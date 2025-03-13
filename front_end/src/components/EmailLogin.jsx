import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmailLogin = ({setEmail, onSubmit, disabled}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }

    return (
        <div className="flex items-center justify-center mt-12">
            <div className="bg-slate-50 rounded-2xl shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold m-6">Sign in to Blog App</h2>
                <p className="text-gray-600 text-sm my-4 m-6">Welcome back! Please sign in to continue</p>
                
                <div className="flex space-x-2 mb-4 m-6">
                    <a href={`${import.meta.env.VITE_API_URL}/auth/facebook`} disabled={disabled} className="flex-1 flex items-center justify-center border px-4 py-2 rounded-lg text-gray-700 hover:bg-slate-100 hover:transform hover:scale-98 hover:shadow-inner disabled:cursor-progress">
                        <FaFacebook className="mr-2 text-blue-600" /> Facebook
                    </a>
                    <a href={`${import.meta.env.VITE_API_URL}/auth/google`} disabled={disabled} className="flex-1 flex items-center justify-center border px-4 py-2 rounded-lg text-gray-700 hover:bg-slate-100 hover:transform hover:scale-98 hover:shadow-inner disabled:cursor-progress">
                        <FaGoogle className="mr-2 text-red-500" /> Google
                    </a>
                </div>
                
                <div className="text-gray-500 text-sm mb-4 m-6">
                    <span className="px-2">or</span>
                </div>
                <span className="text-xs flex justify-start ml-9 font-medium mb-1">Enter your email</span>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="hover:border-slate-500 text-sm w-5/6 px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-500 mx-6"
                    />
                    
                    <button disabled={disabled} type="submit" className="text-sm w-1/2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 m-6 disabled:cursor-progress">
                        Continue
                    </button>
                </form>
                <div className="bg-stone-200 pt-3">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <Link to="/register" className="font-bold hover:underline ml-2">Sign up</Link>
                    </p>
                </div>
                <div className="bg-stone-200 rounded-b-2xl py-2">
                </div>
            </div>
        </div>
    );
}

export default EmailLogin;