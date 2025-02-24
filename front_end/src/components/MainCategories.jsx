import { Link } from "react-router-dom";

const MainCategories = () => {
    return (
        <div className="hidden md:flex bg-white rounded-3xl lg:rounded-full p-4 shadow-lg items-center justify-center gap-8">
            {/* LINK */}
            <div className="flex-1 flex items-center justify-between flex-wrap">
                <Link to='/posts' className="bg-blue-400 text-white rounded-full px-4 py-2">All posts</Link>
                <Link to='/posts?cat=web-design' className="hover:bg-blue-100 rounded-full px-4 py-2">Web design</Link>
                <Link to='/posts?cat=x' className="hover:bg-blue-100 rounded-full px-4 py-2">Development</Link>
                <Link to='/posts?cat=y' className="hover:bg-blue-100 rounded-full px-4 py-2">Database</Link>
                <Link to='/posts?cat=z' className="hover:bg-blue-100 rounded-full px-4 py-2">Search engine</Link>
                <Link to='/posts?cat=t' className="hover:bg-blue-100 rounded-full px-4 py-2">Marketing</Link>
            </div>
            <span className="text-xl font-medium"></span>

            {/* SEARCH */}
            <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
                <input type="text" placeholder="🔍Search something..." className="bg-transparent outline-none rounded-full"/>
            </div>

        </div>
    )
}

export default MainCategories;