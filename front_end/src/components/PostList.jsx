import PostListItem from "./PostListItem";
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from "react";

const fetchPosts = async(page) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: {page},
    });
    return res.data;
}

const PostList = () => {
    const currentPage = sessionStorage.getItem('page') ? parseInt(sessionStorage.getItem('page')) : 1;
    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        sessionStorage.setItem('page', page);
        window.scrollTo(0, 0);
    }, [page]);

    const {isLoading, error, data} = useQuery({
        queryKey: ['posts', page],
        queryFn: () => fetchPosts(page),
    })

    if (isLoading) return "Loading...";

    if (error) return "An error has occured: " + error.message;

    return (
        <>
            <div>
                <div className="flex flex-col gap-12 mb-8">
                    {data.posts.map(post => (
                        <PostListItem key={post.id} post={post}/>
                    ))}
                </div>
                <div className="bg-white text-blue-400 font-semibold items-center flex justify-between gap-10 my-10 mx-auto rounded-full w-fit px-5 py-3">
                    <button
                        className="disabled:text-gray-400 transition-all duration-200 hover:bg-blue-100 rounded-xl px-1 py-1"
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span className="">Page {page}</span>
                    <button
                        className="disabled:text-gray-400 transition-all duration-200 hover:bg-blue-100 rounded-xl px-1 py-1"
                        onClick={() => setPage(prev => prev + 1)}
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