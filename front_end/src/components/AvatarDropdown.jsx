import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IoIosSettings } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import UserSettingModal from './UserSettingModal.jsx';
import { useQuery } from "@tanstack/react-query";

const AvatarDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userModal, setUserModal] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logoutMutation = useMutation({
        mutationFn: async () => {
            return await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {withCredentials: true});
        },
        onSuccess: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("exp");
            window.location.replace("/login");
        },

        onError: (err) => {
            console.log(err);
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate();
    }

    const {isPending, error, data} = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
                withCredentials: true
            });
            return res.data;
        },
    });
    
    const user = data;
    const role = user?.role;

    if(user) {
        return (
            <div className="relative inline-block">
                {/* Avatar */}
                <img
                    src={user?.img}
                    onClick={toggleDropdown}
                    className="mx-auto w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-300"
                    width="10"
                    height="10"
                />

                {/* Dropdown menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="p-2 pl-4 flex flex-row items-center gap-3">
                            <img
                                src={user?.img}
                                className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                width="10"
                                height="10"
                            />
                            <p className="text-sm text-gray-800">{user.username}</p>
                        </div>
                        <div className="text-sm text-slate-500 border">
                            <span
                                onClick={() => setUserModal(true)}
                                className="flex items-center px-7 py-3 hover:bg-gray-100 cursor-pointer border-b gap-6"
                            >
                                <IoIosSettings/>
                                Manage account
                            </span>

                            {userModal && <UserSettingModal user={user} onClose={() => setUserModal(false)}/>}

                            <span
                                onClick={handleLogout}
                                className="flex items-center px-7 py-3 hover:bg-gray-100 cursor-pointer border-b gap-6"
                            >
                                <PiSignOutBold/>
                                Sign out
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default AvatarDropdown;