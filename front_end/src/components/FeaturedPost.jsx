import { Link } from "react-router-dom";
import Image from "./Image";

const FeaturedPost = () => {
    return (
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/*POST 1*/}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* IMAGE */}
                <Image src="featured1.jpeg" className="rounded-3xl object-cover"/>
                {/* DETAIL */}
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold lg:text-lg">01.</h1>
                    <Link className="text-blue-400 lg:text-lg">Web design</Link>
                    <span className="text-gray-400">2 days ago</span>
                </div>
                {/* TITLE */}
                <Link to="/test" className="text-xl lg:text-3xl font-semibold lg:font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Link>
            </div>

            {/* OTHER POSTS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* POST 2 */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image src="featured2.jpeg" className="rounded-3xl object-cover w-1/3 aspect-video"/>
                    <div className="w-2/3 ">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">02.</h1>
                            <Link className="text-blue-400">Web design</Link>
                            <span className="text-gray-400 text-sm">2 days ago</span>
                        </div>
                        <Link to="/test" className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Link>
                    </div>
                </div>

                {/* POST 3 */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image src="featured3.jpeg" className="rounded-3xl object-cover w-1/3 aspect-video"/>
                    <div className="w-2/3 ">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">03.</h1>
                            <Link className="text-blue-400">Web design</Link>
                            <span className="text-gray-400 text-sm">2 days ago</span>
                        </div>
                        <Link to="/test" className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Link>
                    </div>
                </div>

                {/* POST 4 */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    <Image src="featured4.jpeg" className="rounded-3xl object-cover w-1/3 aspect-video"/>
                    <div className="w-2/3 ">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">04.</h1>
                            <Link className="text-blue-400">Web design</Link>
                            <span className="text-gray-400 text-sm">2 days ago</span>
                        </div>
                        <Link to="/test" className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FeaturedPost;