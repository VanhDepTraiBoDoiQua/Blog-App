import { Link } from "react-router-dom";

const AdminPostItem = ({post}) => {
    const createdAt = new Date(post.createdAt).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
        timeZone: "Asia/Ho_Chi_Minh" 
    });

    return (
        <tr className="text-center text-gray-700 hover:bg-[hwb(48_86%_2%)]">
            <td className="border-b border-gray-300 px-4 py-2 font-semibold">
                <Link to={`/${post.slug}`}>
                    {post.title}
                </Link>
            </td>
            <td className="border-b border-gray-300 px-4 py-2">{post.category}</td>
            <td className="border-b border-gray-300 px-4 py-2">{post.User.username}</td>
            <td className="border-b border-gray-300 px-4 py-2">{createdAt}</td>
            <td className="border-b border-gray-300 px-4 py-2">{post.visit}</td>
            <td className="border-b border-gray-300 px-4 py-2">
                <div className="flex items-center justify-center gap-4">
                    <span className="cursor-pointer" title="Delete">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </span>
                </div>
            </td>
        </tr>
    )
}

export default AdminPostItem;