import SingleComment from "./SingleComment";

const Comments = () => {
    return (
        <div className="flex flex-col gap-8 lg:w-m/5">
            <h1 className="text-xl text-gray-400 underline">Comments</h1>
            <div className="flex items-center justify-between gap-8 w-full">
                <textarea className="outline-none w-full p-4 rounded-full" placeholder="Write your thought..."/>
                <button className="bg-emerald-100 px-4 py-3 font-medium rounded-xl">Send</button>
            </div>
            <SingleComment/>
            <SingleComment/>
            <SingleComment/>
            <SingleComment/>
            <SingleComment/>
        </div>
    )
}

export default Comments;