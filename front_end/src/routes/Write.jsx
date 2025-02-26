import { useAuth, useUser } from "@clerk/clerk-react";
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import Progress from "../components/Progress";
import Image from "../components/Image";

const Write = () => {
    const {isLoaded, isSignedIn} = useUser();
    const [value, setValue] = useState("");
    const [cover, setCover] = useState("");
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [progress, setProgress] = useState(0);
    const {getToken} = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },

        onSuccess: (res) => {
            toast.success("Your post has been created!");
            navigate(`/${res.data.slug}`);
        },

        onError: (res) => {
            toast.error("An error has occured!");
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        // get data from form
        const formData = new FormData(e.target);
        const data = {
            image: cover.filePath || "",
            title: formData.get("title"),
            category: formData.get("category"),
            description: formData.get("description"),
            content: value,
        }

        // send data to back-end
        mutation.mutate(data);
    }

    useEffect(()=> {
        image && setValue(prev => prev + `<p><img src="${image.url}"/></p>`)
    }, [image])

    useEffect(()=> {
        video && setValue(prev => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`)
    }, [video])

    useEffect(()=> {
        cover && setCover(cover);
    }, [cover])

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
            <h1 className="text-xl font-light">Create a new post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
                <Upload type="image" setProgress={setProgress} setData={setCover}>
                    <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-400 bg-white" type="button">Add cover</button>
                </Upload>
                {
                    cover ? (
                        <Image src={cover.filePath} className="rounded-2xl object-cover" w="600"/>
                        ) : (
                            null
                        )
                }
                <input name="title" className="text-4xl font-semibold bg-transparent outline-none" 
                type="text" placeholder="Your title goes here!"/>
                <div className="flex items-center gap-4">
                    <label className="text-sm" htmlFor="">Category:</label>
                    <select name="category" id="" className="p-2 rounded-xl bg-white shadow-md outline-none">
                        <option value="general">General</option>
                        <option value="web-design">Web design</option>
                        <option value="development">Development</option>
                        <option value="search-engine">Search engine</option>
                        <option value="database">Database</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <textarea name="description" placeholder="Description" className="p-4 rounded-xl bg-white shadow-md outline-none"/>
                <div className="flex flex-1">
                    <div className="flex flex-col gap-2 mr-2">
                        <Upload type="image" setProgress={setProgress} setData={setImage}>
                            <div className="cursor-pointer">🖼️</div>
                        </Upload>
                        <Upload type="video" setProgress={setProgress} setData={setVideo}>
                            <div className="cursor-pointer">📽️</div>
                        </Upload>
                    </div>
                    <ReactQuill 
                        value={value} 
                        onChange={setValue} 
                        theme="snow" 
                        className="flex-1 rounded-xl bg-white shadow-md" 
                        readOnly={0 < progress && progress < 100}
                    />
                </div>
                <div className="flex items-center justify-between w-full">
                    <Progress progress={progress}/>
                    <button disabled={mutation.isPending || (0 < progress && progress < 100)} className="bg-blue-400 text-white 
                    font-medium rounded-xl mt-4 p-2 w-36 ml-auto transition-all duration-200 hover:-translate-y-1 hover:shadow-lg
                    disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {mutation.isPending ? "Loading..." : "Upload"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Write;