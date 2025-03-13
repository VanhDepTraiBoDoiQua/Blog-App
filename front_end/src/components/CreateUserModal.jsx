import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const CreateUserModal = ({onClose}) => {
    const queryClient = useQueryClient();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            username: formData.get("username")
        };
        if (data.email && data.password && data.username) {
            console.log(data);
            createMutation.mutate(data);
        } else {
            toast.error("Email, Username, Password cannot be blank!");
        }
    }

    const createMutation = useMutation({
        mutationKey: ["users"],
        mutationFn: async (data) => {
            return await axios.post(`${import.meta.env.VITE_API_URL}/admin`, {
                data: data,
            }, {withCredentials: true});
        },

        onSuccess: () => {
            toast.success("New user has been created!");
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
                    <h2 className="text-xl font-semibold">Create new user</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* First Name & Last Name */}
                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">
                                First name
                            </label>
                            <input name="firstName" type="text" className="w-full p-2 border rounded-lg" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">
                                Last name
                            </label>
                            <input name="lastName" type="text" className="w-full p-2 border rounded-lg" />
                        </div>
                    </div>
            
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input name="username" type="text" className="w-full p-2 border rounded-lg" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
            
                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input name="password" type="password" className="w-full p-2 border rounded-lg" />
                    </div>
            
                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button disabled={createMutation.isPending} className="bg-purple-400 text-white py-2 px-4 rounded-lg hover:bg-purple-300 ml-auto disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Create user
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUserModal;