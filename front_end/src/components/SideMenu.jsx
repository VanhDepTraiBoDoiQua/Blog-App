import Search from "./Search";
import { useSearchParams } from "react-router-dom";

const SideMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterChange = (e) => {
        if (searchParams.get("sort") !== e.target.value) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                sortQuery: e.target.value,
            })
        }
    }

    const handleCategoryChange = (category) => {
        if (searchParams.get("cat") !== category) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                cat: category,
            })
        }
    }

    return (
        <div className="px-4 h-max top-8">
            <h1 className="mb-4 text-sm font-medium">Search</h1>
            <Search/>
            <h1 className="mb-4 text-sm font-medium mt-8">Filter</h1>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="newest" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" value="newest" id="newest" onChange={handleFilterChange}
                    className="appearance-none w-4 h-4 border-[1.5px] border-indigo-400 cursor-pointer rounded-sm bg-white checked:bg-lime-400"/>
                    Newest
                </label>
                <label htmlFor="popular" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" value="popular" id="popular" onChange={handleFilterChange}
                    className="appearance-none w-4 h-4 border-[1.5px] border-indigo-400 cursor-pointer rounded-sm bg-white checked:bg-lime-400"/>
                    Most popular
                </label>
                <label htmlFor="trending" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" value="trending" id="trending" onChange={handleFilterChange}
                    className="appearance-none w-4 h-4 border-[1.5px] border-indigo-400 cursor-pointer rounded-sm bg-white checked:bg-lime-400"/>
                    Trending
                </label>
                <label htmlFor="oldest" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" value="oldest" id="oldest" onChange={handleFilterChange}
                    className="appearance-none w-4 h-4 border-[1.5px] border-indigo-400 cursor-pointer rounded-sm bg-white checked:bg-lime-400"/>
                    Oldest
                </label>
            </div>
            <h1 className="mb-4 text-sm font-medium mt-8">Categories</h1>
            <div className="flex flex-col gap-2 text-sm">
                <span className="underline cursor-pointer" onClick={() => handleCategoryChange("")}>All</span>
                <span className="underline cursor-pointer" onClick={() => handleCategoryChange("general")}>General</span>
                <span className="underline cursor-pointer" onClick={() => handleCategoryChange("web-design")}>Web design</span>
                <span className="underline cursor-pointer" onClick={() => handleCategoryChange("development")}>Development</span>
                <span className="underline cursor-pointer" onClick={() => handleCategoryChange("database")}>Database</span>
                <span className="underline cursor-pointer" onClick={() => handleCategoryChange("search-engine")}>Search engine</span>
                <span className="underline cursor-pointer" onClick={() => handleCategoryChange("marketing")}>Marketing</span>
            </div>
        </div>
    )
}

export default SideMenu;