import { useQuery } from "@tanstack/react-query";
import AdminUserItem from "./AdminUserItem";
import axios from "axios";
import { useState } from "react";
import CreateUserModal from "./CreateUserModal";

const AdminUserTable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);

    const {isPending, error, data} = useQuery({
        queryKey: ["users", page],
        queryFn: () => {
            return axios.get(`${import.meta.env.VITE_API_URL}/admin`, {
                params: {page},
                withCredentials: true
            });
        },
    });

    if (isPending) return "Loading...";

    return (
        <>
            <div className="flex items-center gap-4 mb-2 w-full">
                {/* <input 
                    type="text" 
                    placeholder="Search..." 
                    className="px-4 py-2 border border-gray-300 rounded-xl outline-none"
                /> */}
                <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-purple-400 hover:bg-purple-300 text-white rounded-xl ml-auto">Add New</button>

                {isOpen && <CreateUserModal onClose={() => setIsOpen(false)}/>}

            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-300 w-full">
                <table className="table-auto border-separate border-spacing-0 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border-b border-gray-300 px-4 py-2">User</th>
                            <th className="border-b border-gray-300 px-4 py-2">Username</th>
                            <th className="border-b border-gray-300 px-4 py-2">Role</th>
                            <th className="border-b border-gray-300 px-4 py-2">Updated at</th>
                            <th className="border-b border-gray-300 px-4 py-2">Created at</th>
                            <th className="border-b border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.users?.map((user) => (
                            <AdminUserItem key={user.id} user={user}/>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex ml-auto items-center gap-4 mt-5">
                <button
                    className="disabled:text-gray-400 px-1 py-1"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span className="">Page {page}</span>
                <button
                    className="disabled:text-gray-400 px-1 py-1"
                    onClick={() => setPage(prev => prev + 1)}
                    disabled={!data?.data?.hasMore}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default AdminUserTable;