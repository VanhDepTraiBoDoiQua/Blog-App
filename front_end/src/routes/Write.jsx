import { useUser } from "@clerk/clerk-react";
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new";

const Write = () => {
    const{isLoaded, isSignedIn} = useUser();

    if (!isLoaded) {
        return (
            <div className="">Loading...</div>
        )
    }

    if (isLoaded && !isSignedIn) {
        return (
            <div className="">You have to login first!</div>
        )
    }

    return (
        <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
            <h1 className="text-xl font-light">Create a new post!</h1>
            <form className="flex flex-col gap-6 flex-1 mb-6">
                <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-400 bg-white">Add cover</button>
                <input className="text-4xl font-semibold bg-transparent outline-none" type="text" placeholder="Share your story here!"/>
                <div className="flex items-center gap-4">
                    <label className="text-sm" htmlFor="">Category:</label>
                    <select name="cat" id="" className="p-2 rounded-xl bg-white shadow-md outline-none">
                        <option value="general">General</option>
                        <option value="web-design">Web design</option>
                        <option value="development">Development</option>
                        <option value="search-engine">Search engine</option>
                        <option value="database">Database</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <textarea name="desc" placeholder="Description" className="p-4 rounded-xl bg-white shadow-md outline-none"/>
                <ReactQuill theme="snow" className="flex-1 rounded-xl bg-white shadow-md"/>
                <button className="bg-blue-400 text-white font-medium rounded-xl mt-4 p-2 w-36 ml-auto">Upload</button>
            </form>
        </div>
    )
}

export default Write;