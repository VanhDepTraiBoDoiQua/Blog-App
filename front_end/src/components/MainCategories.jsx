import { Link } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
    return (
        <div className="hidden md:flex bg-white rounded-3xl lg:rounded-full p-4 shadow-lg items-center justify-center gap-8">
            {/* LINK */}
            <div className="flex-1 flex items-center justify-between flex-wrap">
                <Link to='/posts' className="bg-blue-400 text-white rounded-full px-4 py-2">All posts</Link>
                <Link to='/posts?cat=2' className="hover:bg-blue-100 rounded-full px-4 py-2">Web design</Link>
                <Link to='/posts?cat=3' className="hover:bg-blue-100 rounded-full px-4 py-2">Development</Link>
                <Link to='/posts?cat=4' className="hover:bg-blue-100 rounded-full px-4 py-2">Database</Link>
                <Link to='/posts?cat=5' className="hover:bg-blue-100 rounded-full px-4 py-2">Search engine</Link>
                <Link to='/posts?cat=6' className="hover:bg-blue-100 rounded-full px-4 py-2">Marketing</Link>
            </div>
            <span className="text-xl font-medium"></span>

            {/* SEARCH */}
            <Search/>

        </div>
    )
}

export default MainCategories;