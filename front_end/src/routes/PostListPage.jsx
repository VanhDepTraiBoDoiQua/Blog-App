import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="">
            <h1 className="mb-8 text-2xl"></h1>
            <button className="mb-4 bg-blue-400 text-sm text-white px-4 py-2 rounded-2xl md:hidden" onClick={() => setOpenMenu((prev) => !prev)}>
                {openMenu ? ("Close") : ("Filter or search")}
            </button>
            <div className="flex flex-col-reverse md:flex-row gap-8">
                <div className="">
                    <PostList/>
                </div>
                <div className={`${openMenu ? ("block") : ("hidden")} md:block`}>
                    <SideMenu/>
                </div>
            </div>
        </div>
    )
}

export default PostListPage;