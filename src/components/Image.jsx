import { IKImage } from "imagekitio-react";

const Image = ({src, className, w, h, alt}) => {
    return (
            <IKImage 
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            path={src} 
            className={className} 
            alt={alt}
            loading="lazy"
            width={w}
            height={h}
            lqip={{active: true, quality: 20}}
            />
    )
}

export default Image;