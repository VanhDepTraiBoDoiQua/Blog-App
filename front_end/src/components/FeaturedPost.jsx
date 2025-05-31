import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fetchPost = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts?featured=true&limit=20&sort=newest`);
    return res.data;
};

const chunkArray = (arr, size) => {
    const result = [];
    const totalChunks = Math.ceil(arr.length / size);
  
    for (let i = 0; i < totalChunks; i++) {
      let chunk = arr.slice(i * size, i * size + size);
  
      if (chunk.length < size) {
        const missing = size - chunk.length;
        chunk = chunk.concat(arr.slice(0, missing));
      }
  
      result.push(chunk);
    }
  
    return result;
  };

const FeaturedPost = () => {
    
    const {isPending, error, data} = useQuery({
        queryKey: ["featuredPost"],
        queryFn: () => fetchPost(),
    });

    if (isPending) return "Loading...";
    if (error) return "Something went wrong!" + error.message;

    const posts = data?.posts
    if(!posts || posts.length === 0) {
        return;
    }

    const postChunks = chunkArray(posts, 4);

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoHeight={true}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 10000 }}
            speed={500}
            modules={[Navigation, Pagination, Autoplay]}
            className="swiper w-full"
        >
            {postChunks.map((chunk, index) => (
                <SwiperSlide key={index}>
                    <div className="mt-8 flex flex-col lg:flex-row gap-8 w-full overflow-hidden">
                        {/* POST 1 */}
                        {chunk[0] && (
                            <div className="relative w-full lg:w-1/2">
                            <Link to={`/${chunk[0].slug}`}>
                            <Image
                                src={chunk[0].image}
                                className="rounded-3xl object-cover w-full h-[500px]" // chiều cao cố định để overlay đẹp
                            />
                            {/* Lớp phủ gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-3xl" />

                            {/* Nội dung chồng trên ảnh */}
                            <div className="absolute bottom-6 left-6 right-6 text-white z-10 space-y-3">
                                <div className="flex items-center gap-4 text-sm lg:text-base">
                                <h1 className="font-semibold">01.</h1>
                                <Link to={`/posts?cat=${chunk[0].category.id}`} className="text-blue-400 hover:underline">
                                    {chunk[0].category.name}
                                </Link>
                                <span className="text-gray-300">{format(chunk[0].createdAt)}</span>
                                </div>
                                <Link to={`/${chunk[0].slug}`} className="text-xl lg:text-3xl font-semibold lg:font-bold drop-shadow-md">
                                {chunk[0].title}
                                </Link>
                            </div>
                            </Link>
                            </div>
                        )}

                        {/* POSTS 2–4 */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        {[1, 2, 3].map((i) =>
                            chunk[i] ? (
                            <div key={i} className="lg:h-1/3 flex justify-between gap-4">
                                <Image
                                src={chunk[i].image}
                                className="rounded-3xl object-cover w-1/3 aspect-video"
                                />
                                <div className="w-2/3">
                                <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                                    <h1 className="font-semibold">{`0${i + 1}.`}</h1>
                                    <Link to={`/posts?cat=${chunk[i].category.id}`} className="text-blue-400">
                                    {chunk[i].category.name}
                                    </Link>
                                    <span className="text-gray-400 text-sm">{format(chunk[i].createdAt)}</span>
                                </div>
                                <Link
                                    to={`/${chunk[i].slug}`}
                                    className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
                                >
                                    {chunk[i].title}
                                </Link>
                                </div>
                            </div>
                            ) : null
                        )}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default FeaturedPost;