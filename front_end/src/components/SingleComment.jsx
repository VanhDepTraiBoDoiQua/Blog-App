import Image from "./Image";

const SingleComment = () => {
    return (
        <div className="p-4 bg-slate-100 rounded-xl mb-4">
            <div className="flex items-center gap-4">
                <Image src="/userImg.jpeg" className="w-10 h-10 rounded-full object-cover" w="40"/>
                <span className="font-medium">Jane Doe</span>
                <span className="text-sm text-gray-400">2 days ago</span>
            </div>
            <div className="">
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aperiam nemo, vero at temporibus suscipit dolore, perferendis, cum voluptatem pariatur accusantium nihil numquam tempora consequatur! Minus cumque aperiam tempora? Provident.
                </p>
            </div>
        </div>
    )
}

export default SingleComment;