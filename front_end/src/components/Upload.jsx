import { IKContext, IKUpload } from "imagekitio-react"
import { useRef } from "react";
import { toast } from "react-toastify";

// authenticator for uploading file
const authenticator =  async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = ({children, type, setProgress, setData}) => {
    const ref = useRef(null);

    const onError = (error) => {
        console.log(error);
        toast.error("Image upload failed!");
    }

    const onSuccess = (res) => {
        console.log(res);
        setData(res);
    }

    const onUploadProgress = (progress) => {
        console.log(progress);
        setProgress(Math.round(100 * progress.loaded / progress.total));
    }

    return (
        <IKContext 
            publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY} 
            urlEndpoint={import.meta.env.VITE_API_URL} 
            authenticator={authenticator}
        >
            <IKUpload
                useUniqueFileName
                onError = {onError}
                onSuccess = {onSuccess}
                onUploadProgress = {onUploadProgress}
                className = "hidden"
                ref = {ref}
                accept = {`${type}/*`}
            />
            <div className="cursor-pointer" onClick={() => ref.current.click()}>{children}</div>
        </IKContext>
    )
}

export default Upload;