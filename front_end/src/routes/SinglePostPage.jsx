import { Link, useLocation, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorPage from "../routes/ErrorPage";
import { format } from "timeago.js";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { isAuth } from "../auth/auth.js";

const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return res.data;
}

const SinglePostPage = () => {
    const isSignedIn = isAuth();
    
    const path = useLocation();
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [path]);

    const {slug} = useParams();
    const {isPending, error, data} = useQuery({
        queryKey: ["post", slug],
        queryFn: () => fetchPost(slug),
    })

    if (isPending) return "Loading...";
    if (error) return "Something went wrong!" + error.message;
    if (!data) return <ErrorPage/>;

    const postContent = (content) => {
        const satinizedContent = DOMPurify.sanitize(content);
        return <div>{parse(satinizedContent)}</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            {/* DETAILS */}
            <div className="flex gap-8">
                <div className="lg:w-3/5 flex flex-col gap-8">
                    <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{data.title}</h1>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>Written by</span>
                        <Link className="text-blue-400">{data.User.username}</Link>
                        <span>on</span>
                        <Link className="text-blue-400">{data.category}</Link>
                        <span>{format(data.createdAt)}</span>
                    </div>
                    <p className="text-gray-400 font-medium">
                        {data.description}
                    </p>
                </div>
                <div className="hidden lg:block w-2/5">
                    <Image src={data.image} w={"1100"} h={"735"} className="rounded-2xl"/>
                </div>

            </div>
            
            {/* CONTENT */}
            <div className="flex flex-col md:flex-row gap-12">
                {/* TEXT */}
                <div className="lg:text-lg flex flex-col gap-6 text-justify">
                    {postContent(data.content)}
                </div>
                
                {/* MENU */}
                <div className="px-4 h-max lg:sticky top-8 lg:ml-auto">
                    <h1 className="mg-4 text-sm font-medium">Author</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-8">
                            <img src={data.User.img} className="w-12 h-12 rounded-full object-cover" width="48" height="48"/>
                            <Link className="text-blue-400">{data.User.username}</Link>
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
                    {isSignedIn && <PostMenuActions post={data}/>}
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
            <Comments postId={data.id}/>
        </div>
    )
}

export default SinglePostPage;