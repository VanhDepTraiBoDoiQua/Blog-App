import { Link } from "react-router-dom";
import Image from "./Image";
import React from "react";
import {format} from "timeago.js";


const PostListItem = ({post}) => {
    
    return (
        <div className="flex flex-col xl:flex-row gap-8">
            {/* IMAGE */}
            <div className="md:hidden xl:block xl:w-1/3">
                <Image src={post.image} className="rounded-2xl object-cover" w={"1100"} h={"735"}/>
            </div>
            {/* DETAILS */}
            <div className="flex flex-col gap-4 xl:w-2/3">
                <Link to={`/${post.slug}`} className="text-4xl font-semibold">
                    {post.title}
                </Link>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>Written by</span>
                    <Link className="text-blue-400">{post.User.username}</Link>
                    <span>on</span>
                    <Link className="text-blue-400">{post.category}</Link>
                    <span>{format(post.createdAt)}</span>
                </div>
                <p>
                    {/* {post.description.substring(0, 100)}{post.description.length > 100 && '...'} */}
                </p>
                <Link to={`/${post.slug}`} className="text-blue-400 underline">Read more</Link>
            </div>
        </div>
    )
}

export default PostListItem;