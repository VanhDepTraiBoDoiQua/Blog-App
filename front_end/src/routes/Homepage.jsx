import { Link } from "react-router-dom";
import Image from "../components/Image";
import MainCategories from "../components/MainCategories";
import FeaturedPost from "../components/FeaturedPost";
import PostList from "../components/PostList";

const Homepage = () => {
    return (
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4">
                <Link to='/'>Home</Link>
                <span>·</span>
                <span className="text-blue-800">Blogs and Articles</span>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-gray-800 text-xl md:text-3xl lg:text-4xl font-bold">
                        Nhìn lên bầu trời và thấy một vì tinh tú.
                    </h1>
                    <p className="mt-8 text-md md:text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <Link to='write' className="flex flex-col items-center">
                    <Image src="write.png" className="w-20 h-20" alt="Blog logo"/>
                    <span>Share your story!</span>
                </Link>
            </div>

            {/* CATEGORIES */}
            <MainCategories/>

            {/* FEATURED */}
            <FeaturedPost/>

            {/* POSTLIST */}
            <div className="">
                <h1 className="my-8 text-2xl text-gray-400">Recent posts</h1>
                <PostList/>
            </div>
        </div>
    )
}

export default Homepage;