const Image = ({src, className, w, h, alt}) => {
    return (
            <img
            src={src}
            className={className}
            alt={alt}
            loading="lazy"
            width={w}
            height={h}
            />
    )
}

export default Image;