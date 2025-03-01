import { Link } from "react-router-dom";
import Image from "./Image";
import React from "react";

const PostListItem = (({key, post}) => {
    return (
        <div className="flex flex-col xl:flex-row gap-8">
            {/* IMAGE */}
            <div className="md:hidden xl:block xl:w-1/3">
                <Image src="postImg.jpeg" className="rounded-2xl object-cover"/>
            </div>
            {/* DETAILS */}
            <div className="flex flex-col gap-4 xl:w-2/3">
                <Link to="/test" className="text-4xl font-semibold">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Link>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>Written by</span>
                    <Link className="text-blue-400">Jane Doe</Link>
                    <span>on</span>
                    <Link className="text-blue-400">Web design</Link>
                    <span>2 days ago</span>
                </div>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor, quas laudantium laboriosam blanditiis deserunt modi sed quaerat
                    natus pariatur praesentium ipsam eveniet quasi deleniti ab ad voluptate
                    distinctio consectetur explicabo.
                </p>
                <Link to="/test" className="text-blue-400 underline">Read more</Link>
            </div>
        </div>
    )
})

export default PostListItem;