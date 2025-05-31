import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminEditUser = ({onClose, user}) => {
    const queryClient = useQueryClient();

    const[firstName, setFirstName] = useState(user.firstName);
    const[lastName, setLastName] = useState(user.lastName);
    const[email, setEmail] = useState(user.email);
    const[username, setUsername] = useState(user.username);
    const[role, setRole] = useState(user.role);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            id: user.id,
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            username: formData.get("username"),
            role: formData.get("role")
        };
        if (data.email && data.username) {
            console.log(data);
            editMutation.mutate(data);
        } else {
            toast.error("Email, Username, Password cannot be blank!");
        }
    }

    const editMutation = useMutation({
        mutationKey: ["users"],
        mutationFn: async (data) => {
            return await axios.post(`${import.meta.env.VITE_API_URL}/admin/update-user`, {
                data: data,
            }, {withCredentials: true});
        },

        onSuccess: () => {
            toast.success("Update successfully");
            queryClient.invalidateQueries({queryKey: ["users"]});
            onClose();
        },

        onError: (res) => {
            toast.error(res?.response?.data);
        }
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[450px]">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold">Edit user infomation</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* First Name & Last Name */}
                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <label className="text-sm font-medium justify-start flex">
                                First name
                            </label>
                            <input 
                                name="firstName" 
                                type="text" 
                                className="w-full p-2 border rounded-lg" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm font-medium justify-start flex">
                                Last name
                            </label>
                            <input 
                                name="lastName" 
                                type="text" 
                                className="w-full p-2 border rounded-lg" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
            
                    {/* Username */}
                    <div>
                        <label className="text-sm font-medium justify-start flex">Username</label>
                        <input 
                            name="username" 
                            type="text" 
                            className="w-full p-2 border rounded-lg" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium justify-start flex">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full p-2 border rounded-lg"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-sm font-medium justify-start flex">Role</label>
                        <select 
                            name="role" 
                            className="w-full p-2 border rounded-lg"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">
                                user
                            </option>
                            <option value="admin">
                                admin
                            </option>
                        </select>
                    </div>
            
                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium justify-start flex">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
            
                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button disabled={editMutation.isPending} className="bg-purple-400 text-white py-2 px-4 rounded-lg hover:bg-purple-300 ml-auto disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminEditUser;