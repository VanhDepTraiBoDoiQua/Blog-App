import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const CreateNewCategory = ({onClose}) => {
    const queryClient = useQueryClient();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            categoryName: formData.get("categoryName"),
        };
        if (data.categoryName) {
            createMutation.mutate(data);
        } else {
            toast.error("Category name cannot be blank!");
        }
    }

    const createMutation = useMutation({
        mutationKey: ["categories"],
        mutationFn: async (data) => {
            return await axios.post(`${import.meta.env.VITE_API_URL}/category`, {
                data: data,
            }, {withCredentials: true});
        },

        onSuccess: () => {
            toast.success("New category has been created!");
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
                    <h2 className="text-xl font-semibold">Create new category</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            
                    {/* Category name */}
                    <div>
                        <label className="block text-sm font-medium">Category name</label>
                        <input name="categoryName" type="text" className="w-full p-2 border rounded-lg" />
                    </div>
            
                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button disabled={createMutation.isPending} className="bg-purple-400 text-white py-2 px-4 rounded-lg hover:bg-purple-300 ml-auto disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Create category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateNewCategory;