import Post from "../models/post.model.js";

const isBot = (req) => {
    const botKeywords = [
        "bot",
        "crawl",
        "spider",
        "slurp",
        "mediapartners",
        "curl",
        "wget",
        "python-requests",
        "axios",
        "java",
    ];
    const userAgent = req.get("User-Agent")?.toLowerCase() || "";
    return botKeywords.some((keyword) => userAgent.includes(keyword));
};

export const increaseVisit = async(req, res, next) => {
    if (isBot(req)) {
        return next();
    }

    const slug = req.params.slug;

    try {
        const post = await Post.findOne({
            where: {
                slug: slug,
            },
        });

        post.increment("visit");

        next();
    } catch(err) {
        console.log(err);
        return res.status(404).json("Post not found");
    }
}