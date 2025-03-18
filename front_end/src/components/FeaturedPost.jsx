import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`);
    return res.data;
}

const FeaturedPost = () => {

    const {isPending, error, data} = useQuery({
        queryKey: ["featuredPost"],
        queryFn: () => fetchPost(),
    })

    if (isPending) return "Loading...";
    if (error) return "Something went wrong!" + error.message;

    const posts = data?.posts
    if(!posts || posts.length === 0) {
        return;
    }

    return (
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/*POST 1*/}
            {posts[0] && 
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* IMAGE */}
                <Link to={`/${posts[0].slug}`}>
                    <Image src={posts[0].image} className="rounded-3xl object-cover"/>
                </Link>
                {/* DETAIL */}
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold lg:text-lg">01.</h1>
                    <Link to={`/posts?cat=${posts[0].category}`} className="text-blue-400 lg:text-lg">{posts[0].category}</Link>
                    <span className="text-gray-400">{format(posts[0].createdAt)}</span>
                </div>
                {/* TITLE */}
                <Link to={`/${posts[0].slug}`} className="text-xl lg:text-3xl font-semibold lg:font-bold">
                    {posts[0].title}
                </Link>
            </div>
            }

            {/* OTHER POSTS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* POST 2 */}
                {posts[1] && 
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image src={posts[1].image} className="rounded-3xl object-cover w-1/3 aspect-video"/>
                    <div className="w-2/3 ">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">02.</h1>
                            <Link to={`/posts?cat=${posts[1].category}`} className="text-blue-400">{posts[1].category}</Link>
                            <span className="text-gray-400 text-sm">{format(posts[1].createdAt)}</span>
                        </div>
                        <Link to={`/${posts[1].slug}`} className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                            {posts[1].title}
                        </Link>
                    </div>
                </div>
                }

                {/* POST 3 */}
                {posts[2] && 
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image src={posts[2].image} className="rounded-3xl object-cover w-1/3 aspect-video"/>
                    <div className="w-2/3 ">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">03.</h1>
                            <Link to={`/posts?cat=${posts[2].category}`} className="text-blue-400">{posts[2].category}</Link>
                            <span className="text-gray-400 text-sm">{format(posts[2].createdAt)}</span>
                        </div>
                        <Link to={`/${posts[2].slug}`} className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                            {posts[2].title}
                        </Link>
                    </div>
                </div>
                }

                {/* POST 4 */}
                {posts[3] && 
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image src={posts[3].image} className="rounded-3xl object-cover w-1/3 aspect-video"/>
                    <div className="w-2/3 ">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">04.</h1>
                            <Link to={`/posts?cat=${posts[1].category}`} className="text-blue-400">{posts[3].category}</Link>
                            <span className="text-gray-400 text-sm">{format(posts[3].createdAt)}</span>
                        </div>
                        <Link to={`/${posts[3].slug}`} className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                            {posts[3].title}
                        </Link>
                    </div>
                </div>
                }
            </div>

        </div>
    )
}

export default FeaturedPost;