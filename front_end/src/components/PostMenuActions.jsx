import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { getUser, isAuth } from "../auth/auth.js";

const PostMenuActions = ({post}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isSignedIn = isAuth();
    const user = getUser();

    const {isPending, error, data} = useQuery({
        queryKey: ["savedPost"],
        queryFn: async () => {
            return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {withCredentials: true});
        },
    });

    const isSaved = data?.data?.some((p) => p === post.id) || false;

    const isAdmin = user?.role === "admin" || false;

    const featureMutation = useMutation({
        mutationFn: () => {
            return axios.patch(`${import.meta.env.VITE_API_URL}/posts/feature`, {
                postId: post.id,
            }, {withCredentials: true});
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["post", post.slug]});
        },

        onError: (error) => {
            toast.error(error.response.data);
        },
    });

    const handleFeature = () => {
        featureMutation.mutate();
    }

    const deleteMutation = useMutation({
        mutationFn: () => {
            return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post.id}`, {withCredentials: true});
        },

        onSuccess: () => {
            toast.success("Post deleted!");
            navigate("/home");
        },

        onError: (error) => {
            toast.error(error.response.data);
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    }

    const saveMutation = useMutation({
        mutationFn: () => {
            return axios.patch(`${import.meta.env.VITE_API_URL}/users/save`, {
                postId: post.id,
            }, {withCredentials: true});
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["savedPost"]});
        },

        onError: (error) => {
            toast.error(error.response.data);
        },
    });

    const handleSave = () => {
        if (!user) {
            return navigate("/login");
        }
        saveMutation.mutate();
    }

    const handleEdit = () => {
        if (!user) {
            return navigate("/login");
        }
        navigate(`/edit/${post.slug}`);
    }

    return (
        <div className="">
            <h1 className="mt-8 mg-4 text-sm font-medium">Actions</h1>
            {isPending ? (
                    "Loading..."
                ) : (
                    <div onClick={handleSave} className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                        {isSaved ? (
                                <span className="flex items-center gap-2">
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>save_fill</title> <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="File" transform="translate(-576.000000, -144.000000)"> <g id="save_fill" transform="translate(576.000000, 144.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero"> </path> <path d="M6,2 C4.89543,2 4,2.89543 4,4 L4,20 C4,21.1046 4.89543,22 6,22 L18,22 C19.1046,22 20,21.1046 20,20 L20,6.41421 C20,5.88378 19.7893,5.37507 19.4142,5 L17,2.58579 C16.6249,2.21071 16.1162,2 15.5858,2 L6,2 Z M16.2383,10.793 C16.6289,10.4025 16.6289,9.76934 16.2383,9.37881 C15.8478,8.98829 15.2147,8.98829 14.8241,9.37881 L10.5815,13.6215 L9.16727,12.2072 C8.77675,11.8167 8.14358,11.8167 7.75306,12.2072 C7.36253,12.5978 7.36253,13.2309 7.75306,13.6215 L9.80367,15.6721 C10.2332,16.1016 10.9297,16.1016 11.3593,15.6721 L16.2383,10.793 Z" id="形状" fill="#09244B"> </path> </g> </g> </g> </g></svg>
                                    Unsave this post
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>save_line</title> <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="File" transform="translate(-576.000000, -96.000000)"> <g id="save_line" transform="translate(576.000000, 96.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero"> </path> <path d="M6,2 C4.89543,2 4,2.89543 4,4 L4,20 C4,21.1046 4.89543,22 6,22 L18,22 C19.1046,22 20,21.1046 20,20 L20,6.41421 C20,5.88378 19.7893,5.37507 19.4142,5 L17,2.58579 C16.6249,2.21071 16.1162,2 15.5858,2 L6,2 Z M6,4 L15.5858,4 L18,6.41421 L18,20 L6,20 L6,4 Z M16.2383,10.793 C16.6289,10.4025 16.6289,9.76934 16.2383,9.37881 C15.8478,8.98829 15.2147,8.98829 14.8241,9.37881 L10.5815,13.6215 L9.16727,12.2072 C8.77675,11.8167 8.14358,11.8167 7.75306,12.2072 C7.36253,12.5978 7.36253,13.2309 7.75306,13.6215 L9.80367,15.6721 C10.2332,16.1016 10.9297,16.1016 11.3593,15.6721 L16.2383,10.793 Z" id="形状" fill="#09244B"> </path> </g> </g> </g> </g></svg>
                                    Save this post
                                </span>
                            )
                        }
                    </div>
                )
            }
            {
                isAdmin && 
                <div onClick={handleFeature} className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                    {post.isFeatured ? (
                            <div className="flex items-center gap-2">
                                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32" id="Glyph" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M29.895,12.52c-0.235-0.704-0.829-1.209-1.549-1.319l-7.309-1.095l-3.29-6.984C17.42,2.43,16.751,2,16,2 s-1.42,0.43-1.747,1.122l-3.242,6.959l-7.357,1.12c-0.72,0.11-1.313,0.615-1.549,1.319c-0.241,0.723-0.063,1.507,0.465,2.046 l5.321,5.446l-1.257,7.676c-0.125,0.767,0.185,1.518,0.811,1.959c0.602,0.427,1.376,0.469,2.02,0.114l6.489-3.624l6.581,3.624 c0.646,0.355,1.418,0.311,2.02-0.114c0.626-0.441,0.937-1.192,0.811-1.959l-1.259-7.686l5.323-5.436 C29.958,14.027,30.136,13.243,29.895,12.52z" id="XMLID_328_"></path></g></svg>
                                <span>Unfeature this post</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <svg width="20px" height="20px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32" id="Editable-line" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d=" M16.842,3.548l3.29,6.984c0.137,0.29,0.401,0.491,0.707,0.538l7.357,1.12c0.77,0.117,1.077,1.108,0.52,1.677l-5.324,5.436 c-0.221,0.226-0.322,0.551-0.27,0.87l1.257,7.676c0.131,0.803-0.673,1.416-1.362,1.036l-6.58-3.624c-0.273-0.151-0.6-0.151-0.873,0 l-6.58,3.624c-0.688,0.379-1.493-0.233-1.362-1.036l1.257-7.676c0.052-0.319-0.049-0.644-0.27-0.87l-5.324-5.436 c-0.557-0.569-0.25-1.56,0.52-1.677l7.357-1.12c0.306-0.047,0.57-0.248,0.707-0.538l3.29-6.984 C15.503,2.817,16.497,2.817,16.842,3.548z" fill="none" id="XMLID_16_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path></g></svg>
                                <span>Feature this post</span>
                            </div>
                        )
                    }
                </div>
            }
            {
                user && 
                (post.User.username === user.username || isAdmin) && 
                <div 
                    onClick={() => {
                        if (window.confirm("Bạn có chắc chắn muốn xoá không?")) {
                            handleDelete();
                        }
                    }}
                    className="flex items-center gap-2 py-2 text-sm cursor-pointer"
                >
                    <span className="flex items-center gap-2"> 
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" fill="red" width="20px" height="20px"><path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"/></svg>
                        Delete this post
                    </span>
                    {deleteMutation.isPending && <span className="text-xs">Deleting...</span>}
                </div>
            }
            {
                user &&
                (post.User.username === user.username) &&
                <div onClick={handleEdit} className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                    <span className="flex items-center gap-2"> 
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" width="20px" height="20px"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fillRule="evenodd" d="M15.198 3.52a1.612 1.612 0 012.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 00-5.102-.128L3.11 12.238a1 1 0 00-.253.388l-1.8 5.037a1 1 0 001.072 1.328l4.8-.63a1 1 0 00.56-.267L18.8 7.304a3.612 3.612 0 00.122-5.106zM12 17a1 1 0 100 2h6a1 1 0 100-2h-6z"></path> </g></svg>
                        Edit content
                    </span>
                </div>
            }
        </div>
    )
}

export default PostMenuActions;