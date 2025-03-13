import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const UpdatePasswordCard = ({setUpdatePassword}) => {
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
            setUpdatePassword(false);
        },

        onError: (res) => {
            toast.error(res?.response?.data);
        }
    })

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            curPass: formData.get("curPass"),
            newPass: formData.get("newPass"),
            conPass: formData.get("conPass"),
        }
        if (data.curPass && data.newPass && data.conPass) {
            if (data.newPass === data.conPass) {
                updateMutation.mutate(data);
            } else {
                toast.error("Confirm password is different from New password");
            }
        } else {
            toast.error("Password cannot be blank!");
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
            <form onSubmit={handleUpdatePassword}>
                <h2 className="font-semibold mb-3">Update password</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
                    <input
                        type="password"
                        name="curPass"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                    <input
                        type="password"
                        name="newPass"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                    <input
                        type="password"
                        name="conPass"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end gap-4">
                <button onClick={() => setUpdatePassword(false)} className="px-4 py-2 rounded-md hover:bg-gray-200">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-700">
                        Save
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

export default UpdatePasswordCard;