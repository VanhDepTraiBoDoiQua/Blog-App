const PostMenuActions = () => {
    return (
        <div className="">
            <h1 className="mt-8 mg-4 text-sm font-medium">Actions</h1>
            <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                <span>➕Save this post</span>
            </div>
            <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                <span>🗑️Delete this post</span>
            </div>
        </div>
    )
}

export default PostMenuActions;