import PostListItem from "./PostListItem";
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async(searchParams) => {
    const searchParamsObj = Object.fromEntries([...searchParams]);

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: {...searchParamsObj},
    });
    return res.data;
}

const PostList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    const {isLoading, error, data} = useQuery({
        queryKey: ['posts', searchParams.toString()],
        queryFn: () => fetchPosts(searchParams),
    })

    const handlePageChange = (newPage) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev.toString());
            newParams.set("page", newPage);
            return newParams;
        })
    }

    if (isLoading) return "Loading...";

    if (error) return "An error has occured: " + error.message;

    return (
        <>
            <div>
                <div className="flex flex-col gap-12 mb-8">
                    {data?.posts?.map(post => (
                        <PostListItem key={post.id} post={post}/>
                    ))}
                    {data.posts.length === 0 && 
                    <div className="">No post found, please try again.</div>}
                </div>
                <div className="bg-white text-blue-400 font-semibold items-center flex justify-between gap-10 my-10 mx-auto rounded-full w-fit px-5 py-3">
                    <button
                        className="disabled:text-gray-400 transition-all duration-200 hover:bg-blue-100 rounded-xl px-1 py-1"
                        onClick={() => {handlePageChange(Math.max(page - 1, 1))}}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span className="">Page {page}</span>
                    <button
                        className="disabled:text-gray-400 transition-all duration-200 hover:bg-blue-100 rounded-xl px-1 py-1"
                        onClick={() => {handlePageChange(page + 1)}}
                        disabled={!data?.hasMore}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
        
    )
}

export default PostList;