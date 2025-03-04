import { format } from "timeago.js";

const SingleComment = ({comment}) => {
    return (
        <div className="p-4 bg-slate-100 rounded-xl mb-4">
            <div className="flex items-center gap-4">
                {/* <Image src="/userImg.jpeg" className="w-10 h-10 rounded-full object-cover" w="40"/> */}
                <img src={comment.User.img} className="w-10 h-10 rounded-full object-cover" width="40" height="40"/>
                <span className="font-medium">{comment.User.username}</span>
                <span className="text-sm text-gray-400">{format(comment.createdAt)}</span>
            </div>
            <div className="">
                <p>
                    {comment.content}
                </p>
            </div>
        </div>
    )
}

export default SingleComment;