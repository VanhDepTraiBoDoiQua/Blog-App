import { IKImage } from "imagekitio-react";

const Image = ({src, className, w, h, alt}) => {
    return (
            <IKImage
                urlEndpoint = {import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
                path = {src}
                className = {className}
                loading = "lazy"
                width = {w}
                height = {w}
                alt = {alt}
                lqip = {{active: true, quality: 20}}
                transformation={[
                    {
                        width: w,
                        height: h,
                    }
                ]}
            />
    )
}

export default Image;