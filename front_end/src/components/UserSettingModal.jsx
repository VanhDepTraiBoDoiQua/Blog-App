import { useState } from "react";
import UpdateUsernameCard from "./UpdateUsernameCard.jsx";
import UpdateProfileCard from "./UpdateProfileCard.jsx";
import UpdatePasswordCard from "./UpdatePasswordCard.jsx";
import { MdFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { GrGoogle } from "react-icons/gr";

const UserSettingModal = ({onClose, user}) => {
    const [updateProfile, setUpdateProfile] = useState(false);
    const [updateUsername, setUpdateUsername] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);

    const profileButton = () => {
        setUpdateProfile(true);
        setUpdateUsername(false);
        setUpdatePassword(false);
    }
    
    const usernameButton = () => {
        setUpdateProfile(false);
        setUpdateUsername(true);
        setUpdatePassword(false);
    }
    
    const passwordButton = () => {
        setUpdateProfile(false);
        setUpdateUsername(false);
        setUpdatePassword(true);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex flex-row items-center justify-between mb-2">
                    <h2 className="text-2xl font-semibold">Profile details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 mb-6">
                            ✕
                    </button>
                </div>
                <div className="border rounded-lg p-6 space-y-6">
                    {/* Profile Section */}
                    <div className="flex items-center justify-between border-t pt-4">
                        <p className="text-gray-500 font-semibold w-1/3">Profile</p>
                        <div className="flex flex-row items-center gap-6 w-2/3">
                            {!updateProfile &&
                                <>
                                    <img
                                        src={user.img}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-300 ml-2"
                                        width="10"
                                        height="10"
                                    />
                                    <button onClick={profileButton} className="px-4 py-2 rounded-lg text-sm ml-auto hover:bg-slate-100">Update profile</button>
                                </>
                            }
                            {updateProfile &&
                                <UpdateProfileCard img={user.img} setUpdateProfile={setUpdateProfile}/>
                            }
                        </div>
                    </div>
            
                    {/* Username */}
                    <div className="flex items-center justify-between border-t pt-4">
                        <p className="text-gray-500 font-semibold w-1/3">Username</p>
                        <div className="flex flex-row items-center gap-6 w-2/3">
                            {!updateUsername &&
                                <>
                                    <p className="font-medium ml-2">{user.username}</p>
                                    <button onClick={usernameButton} className="px-4 py-2 rounded-lg text-sm ml-auto hover:bg-slate-100">Update username</button>
                                </>
                            }
                            {updateUsername &&
                                <UpdateUsernameCard setUpdateUsername={setUpdateUsername}/>
                            }
                        </div>
                    </div>
            
                    {/* Email Section */}
                    <div className="flex items-center justify-between border-t pt-4">
                        <p className="text-gray-500 font-semibold w-1/3">Email address</p>
                        <div className="flex flex-row items-center gap-6 w-2/3">
                            <p className="font-medium ml-2">{user.email}</p>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="flex items-center justify-between border-t pt-4">
                        <p className="text-gray-500 font-semibold w-1/3">Password</p>
                        <div className="flex flex-row items-center gap-6 w-2/3">
                            {!updatePassword &&
                                <button onClick={passwordButton} className="px-4 py-2 rounded-lg text-sm ml-auto hover:bg-slate-100">Change password</button>
                            }
                            {updatePassword &&
                                <UpdatePasswordCard setUpdatePassword={setUpdatePassword}/>
                            }
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div className="flex items-center justify-between border-t pt-4">
                        <p className="text-gray-500 font-semibold w-1/3">Connected Account</p>
                        <div className="flex flex-row items-center gap-6 w-2/3">
                            <div className="flex flex-col gap-2">
                                {user.hasFacebook ? (
                                    <div className="flex flex-row items-center gap-3 px-2">
                                        <MdFacebook className="text-blue-500 w-8 h-8"/>
                                        <span>Connected</span>
                                    </div>
                                ) : (
                                    <a href={`${import.meta.env.VITE_API_URL}/users/connect/facebook`}>
                                        <div className="flex flex-row items-center gap-3 px-2">
                                            <MdFacebook className="w-8 h-8"/>
                                            <button>Connect to Facebook Account</button>
                                        </div>
                                    </a>
                                )}

                                {user.hasGoogle ? (
                                    <div className="flex flex-row items-center gap-3 px-2">
                                        <FcGoogle className="w-8 h-8"/>
                                        <span>Connected</span>
                                    </div>
                                ) : (
                                    <a href={`${import.meta.env.VITE_API_URL}/users/connect/google`} >
                                        <div className="flex flex-row items-center gap-3 px-2">
                                            <GrGoogle className="w-8 h-8"/>
                                            <button>Connect to Google Account</button>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSettingModal;