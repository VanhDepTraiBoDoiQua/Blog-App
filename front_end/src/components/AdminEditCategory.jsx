import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminEditCategory = ({onClose, category}) => {
    const queryClient = useQueryClient();

    const [name, setName] = useState(category.name);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            id: category.id,
            categoryName: formData.get("categoryName"),
        };
        if (data.categoryName) {
            editMutation.mutate(data);
        } else {
            toast.error("Category name cannot be blank!");
        }
    }

    const editMutation = useMutation({
        mutationKey: ["categories"],
        mutationFn: async (data) => {
            return await axios.post(`${import.meta.env.VITE_API_URL}/category/update-cat`, {
                data: data,
            }, {withCredentials: true});
        },

        onSuccess: () => {
            toast.success("Update successfully");
            queryClient.invalidateQueries({queryKey: ["categories"]});
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
                    <h2 className="text-xl font-semibold">Update category</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            
                    {/* Category name */}
                    <div>
                        <label className="block text-sm font-medium">Category name</label>
                        <input 
                            name="categoryName" 
                            type="text" 
                            className="w-full p-2 border rounded-lg" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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

export default AdminEditCategory;