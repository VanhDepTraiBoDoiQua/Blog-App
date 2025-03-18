import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "../components/Image";
import MainCategories from "../components/MainCategories";
import FeaturedPost from "../components/FeaturedPost";
import PostList from "../components/PostList";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Homepage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const err = params.get("error");
        const success = params.get("success");

        if (err) {
            toast.error(err);

            params.delete("error");
            navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
        }

        if (success) {
            toast.success(success);

            params.delete("success");
            navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4">
                <Link to='/home'>Home</Link>
                <span>·</span>
                <span className="text-blue-800">Blogs and Articles</span>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-gray-800 text-xl md:text-3xl lg:text-4xl font-bold">
                        Where great minds put thoughts into words.
                    </h1>
                    <p className="mt-8 text-md md:text-xl">
                        Write to explore, read to grow.
                    </p>
                </div>
                <Link to='/write' className="flex flex-col items-center">
                    <Image src="write.png" className="w-20 h-20" alt="Blog logo"/>
                    <span>Share your story!</span>
                </Link>
            </div>

            {/* CATEGORIES */}
            <MainCategories/>

            {/* FEATURED */}
            <FeaturedPost/>

            {/* POSTLIST */}
            <h1 className="my-4 text-2xl text-gray-400">Recent posts</h1>
            <div className="xl:flex xl:flex-row">
                <PostList/>
            </div>
        </div>
    )
}

export default Homepage;