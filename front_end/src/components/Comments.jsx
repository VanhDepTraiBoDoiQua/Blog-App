import SingleComment from "./SingleComment";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useRef } from "react";

const fetchComments = async (postId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
    return res.data;
}

const Comments = ({postId}) => {
    const {getToken} = useAuth();
    const {user, isSignedIn} = useUser();
    const textAreaRef = useRef();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken();
            return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },

        onSuccess: () => {
            toast.success("Comment created!");
            queryClient.invalidateQueries({
                queryKey: ["comments", postId]
            });
        },

        onError: (res) => {
            toast.error("You have to login first!");
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            content: formData.get("content"),
        };
        if (data.content) {
            mutation.mutate(data);
            textAreaRef.current.value = "";
        } else {
            toast.error("Can't post an empty comment!");
        }
    }

    const {isPending, error, data} = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => fetchComments(postId),
    });

    if (isPending) return "Loading...";
    if (error) return "Something went wrong!" + error.message;

    return (
        <div className="flex flex-col gap-8 lg:w-m/5 mb-12">
            <h1 className="text-xl text-gray-400 underline">Comments</h1>
            <form onSubmit={handleSubmit} className="flex items-center justify-between gap-8 w-full">
                <textarea 
                    ref={textAreaRef} 
                    name="content"
                    className="outline-none w-full p-4 rounded-full"
                    placeholder="Write your thought..."
                />
                <button disabled={mutation.isPending} className="bg-emerald-100 px-4 py-3 font-medium rounded-xl">{
                        mutation.isPending ? (
                            "Sending..."
                        ) : (
                            "Send"
                        )
                    }
                </button>
            </form>
            {data.length === 0 ? (
                <div className="text-lg flex items-center justify-center">Be the first to comment!</div>
            ) : (
                <>
                    {isSignedIn && mutation.isPending && (
                        <SingleComment 
                            comment={{
                                content: `${mutation.variables.content}(Sending...)`,
                                createdAt: new Date(),
                                User: {
                                    img: user.imageUrl,
                                    username: user.username,
                                },
                        }}
                        />
                    )}
                    {data.map((comment) => (
                        <SingleComment key={comment.id} comment={comment}/>
                    ))}
                </>
            )
            }
        </div>
    )
}

export default Comments;