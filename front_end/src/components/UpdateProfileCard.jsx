import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const UpdateProfileCard = ({img, setUpdateProfile}) => {
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (data) => {
            return axios.patch(`${import.meta.env.VITE_API_URL}/users`, 
                data, 
            {withCredentials: true});
        },

        onSuccess: () => {
            toast.success("Your user infomation has been updated!");
            queryClient.invalidateQueries({
                queryKey: ["user"],
            })
            setUpdateProfile(false);
        },

        onError: (res) => {
            toast.error(res?.response?.data);
        }
    })

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
        }
        if (data.firstName && data.lastName) {
            updateMutation.mutate(data);
        } else {
            toast.error("First name and Last name cannot be blank!");
        }
    }

    return (
        <motion.div 
                className="p-6 rounded-lg shadow-lg border ml-auto w-full"
                initial={{ opacity: 0, scale: 0.9 }} // Bắt đầu với hiệu ứng mờ và nhỏ hơn
                animate={{ opacity: 1, scale: 1 }} // Hiện dần và trở về kích thước chuẩn
                exit={{ opacity: 0, scale: 0.9 }} // Khi ẩn đi, mờ dần và nhỏ lại
                transition={{ duration: 0.3, ease: "easeOut" }} // Thời gian chuyển động 0.3s
            >
            <form onSubmit={handleUpdateProfile}>
                <h2 className="font-semibold mb-3">Update profile</h2>
                <div className="mb-4">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <img
                            src={img}
                            className="w-10 h-10 rounded-full object-cover border border-gray-300"
                            width="10"
                            height="10"
                        />
                        <span className="text-xs">Recommend size less than 10mb</span>
                        <button className="px-2 py-2 bg-gray-50 hover:bg-gray-200 rounded-md">
                            Upload
                        </button>
                    </div>
                    <div className="flex flex-row gap-6 mt-2">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button onClick={() => setUpdateProfile(false)} className="px-4 py-2 rounded-md hover:bg-gray-200">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-700">
                        Save
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

export default UpdateProfileCard;