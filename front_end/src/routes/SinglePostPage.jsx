import { Link } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";

const SinglePostPage = () => {
    return (
        <div className="flex flex-col gap-8">
            {/* DETAILS */}
            <div className="flex gap-8">
                <div className="lg:w-3/5 flex flex-col gap-8">
                    <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>Written by</span>
                        <Link className="text-blue-400">Jane Doe</Link>
                        <span>on</span>
                        <Link className="text-blue-400">Web design</Link>
                        <span>2 days ago</span>
                    </div>
                    <p className="text-gray-400 font-medium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, soluta? Nobis, sequi aliquam. Odit, consequuntur harum. Vero eligendi necessitatibus praesentium facere ducimus impedit doloremque consectetur aperiam aliquid reiciendis? Quibusdam, dolorem.
                    </p>
                </div>
                <div className="hidden lg:block w-2/5">
                    <Image src="postImg.jpeg" w="600" className="rounded-2xl"/>
                </div>

            </div>
            
            {/* CONTENT */}
            <div className="flex flex-col md:flex-row gap-12">
                {/* TEXT */}
                <div className="lg:text-lg flex flex-col gap-6 text-justify">
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur culpa earum placeat harum deleniti ducimus iste sed, illo quia assumenda ea recusandae sapiente temporibus dolor ad minus quas beatae at?
                    </p>                
                </div>
                
                {/* MENU */}
                <div className="px-4 h-max sticky top-8">
                    <h1 className="mg-4 text-sm font-medium">Author</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-8">
                            <Image src="userImg.jpeg" className="w-12 h-12 rounded-full object-cover" w="48" h="48"/>
                            <Link className="text-blue-400">Jane Doe</Link>
                        </div>
                        <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        <div className="flex gap-2">
                            <Link>
                                <Image src="facebook.svg"/>
                            </Link>
                            <Link>
                                <Image src="instagram.svg"/>
                            </Link>
                        </div>
                    </div>
                    <PostMenuActions/>
                    <h1 className="mt-8 mg-4 text-sm font-medium">Categories</h1>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link className="underline">All</Link>
                        <Link className="underline">Web design</Link>
                        <Link className="underline">Development</Link>
                        <Link className="underline">Database</Link>
                        <Link className="underline">Search engine</Link>
                        <Link className="underline">Marketing</Link>
                    </div>
                    <h1 className="mt-8 mg-4 text-sm font-medium">Search</h1>
                    <Search/>
                </div>
            </div>
            <Comments/>
        </div>
    )
}

export default SinglePostPage;