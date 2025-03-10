import { useUser } from "@clerk/clerk-react";
import AdminUserTable from "../components/AdminUserTable";
import { useState } from "react";
import AdminPostTable from "../components/AdminPostTable";
import ErrorPage from "./ErrorPage";

const AdminPage = () => {
    const {user} = useUser();
    const [selected, setSelected] = useState("users");

    if (user?.publicMetadata?.role === "admin") {
        return (
            <div className="flex flex-row h-screen border-y border-black">
                <div className="bg-purple-200 flex flex-col w-1/6 text-center items-center h-full absolute left-0 top-20 border-r border-y border-black">
                    <span onClick={() => setSelected("users")} className="w-full py-5 cursor-pointer hover:bg-purple-300">Users</span>
                    <span onClick={() => setSelected("posts")} className="w-full py-5 cursor-pointer hover:bg-purple-300">Post</span>
                </div>
                <div className="ml-[16.67%] flex-1 flex flex-col justify-start items-center p-6">
                    {selected === "users" ? (
                        <AdminUserTable/>
                    ) : (
                        <AdminPostTable/>
                    )}
                </div>
            </div>
        )
    } else {
        return <ErrorPage/>
    }
}

export default AdminPage;