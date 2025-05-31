import { useState } from "react";
import AdminEditCategory from "./AdminEditCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const AdminCategoryrItem = ({category}) => {
    const updatedAt = new Date(category.updatedAt).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
        timeZone: "Asia/Ho_Chi_Minh" 
    });
    const createdAt = new Date(category.createdAt).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
        timeZone: "Asia/Ho_Chi_Minh" 
    });

    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => {
            return axios.delete(`${import.meta.env.VITE_API_URL}/category/${category.id}`, {withCredentials: true});
        },

        onSuccess: () => {
            toast.success("Category deleted!");
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },

        onError: (error) => {
            toast.error(error.response.data);
            console.log(error);
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    }

    return (
        <tr className="text-center text-gray-700 hover:bg-[hwb(48_86%_2%)]">
            <td className="border-b border-gray-300 px-4 py-2">{category.name}</td>
            <td className="border-b border-gray-300 px-4 py-2">{category.posts}</td>
            <td className="border-b border-gray-300 px-4 py-2">{updatedAt}</td>
            <td className="border-b border-gray-300 px-4 py-2">{createdAt}</td>
            <td className="border-b border-gray-300 px-4 py-2">
                <div className="flex items-center justify-center gap-4">
                    <span onClick={() => setIsOpen(true)} className="cursor-pointer" title="Edit">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 10L14 6M18 10L21 7L17 3L14 6M18 10L17 11M14 6L8 12V16H12L14.5 13.5M20 14V20H12M10 4L4 4L4 20H7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </span>
                    {isOpen && <AdminEditCategory onClose={() => setIsOpen(false)} category={category}/>}
                    <span 
                        // onClick={handleDelete} 
                        onClick={() => {
                            if (window.confirm("This action cannot be undone, are you sure?")) {
                            handleDelete();
                            }
                        }}
                        className="cursor-pointer" 
                        title="Delete"
                    >
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </span>
                </div>
            </td>
        </tr>
    )
}

export default AdminCategoryrItem;