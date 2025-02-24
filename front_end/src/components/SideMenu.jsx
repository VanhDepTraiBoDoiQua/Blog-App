import Search from "./Search";
import { Link } from "react-router-dom";

const SideMenu = () => {
    return (
        <div className="px-4 h-max sticky top-8">
            <h1 className="mb-4 text-sm font-medium">Search</h1>
            <Search/>
            <h1 className="mb-4 text-sm font-medium mt-8">Filter</h1>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" value="newest" 
                    className="appearance-none w-4 h-4 border-[1.5px] border-indigo-400 cursor-pointer rounded-sm bg-white checked:bg-lime-400"/>
                    Newest
                </label>
                <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" value="newest" 
                    className="appearance-none w-4 h-4 border-[1.5px] border-indigo-400 cursor-pointer rounded-sm bg-white checked:bg-lime-400"/>
                    Most popular
                </label>
                <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" value="newest" 
                    className="appearance-none w-4 h-4 border-[1.5px] border-indigo-400 cursor-pointer rounded-sm bg-white checked:bg-lime-400"/>
                    Trending
                </label>
                <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" value="newest" 
                    className="appearance-none w-4 h-4 border-[1.5px] border-indigo-400 cursor-pointer rounded-sm bg-white checked:bg-lime-400"/>
                    Oldest
                </label>
            </div>
            <h1 className="mb-4 text-sm font-medium mt-8">Categories</h1>
            <div className="flex flex-col gap-2 text-sm">
                <Link className="underline" to="/posts">All</Link>
                <Link className="underline" to="/posts?cat=web-design">Web design</Link>
                <Link className="underline" to="/posts?cat=development">Development</Link>
                <Link className="underline" to="/posts?cat=database">Database</Link>
                <Link className="underline" to="/posts?cat=search-engine">Search engine</Link>
                <Link className="underline" to="/posts?cat=marketing">Marketing</Link>
            </div>
        </div>
    )
}

export default SideMenu;