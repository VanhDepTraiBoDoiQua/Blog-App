import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <div 
                className="flex flex-col items-center justify-center h-[80vh] mt-10"
                style={{ 
                    backgroundImage: "url('/landing-1.jpg')", 
                    backgroundSize: "cover", 
                    backgroundPosition: "center" 
                }}>
                <h2 className="text-2xl font-semibold">Publish your passion, your way</h2>
                <p className="text-xl my-4">Create a unique and beautiful blog easily.</p>
                <div className="bg-orange-400 w-fit rounded-full px-4 py-3 my-4 font-bold text-gray-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-orange-500 active:scale-95">
                    <Link to="/write">Start writing now!</Link>
                </div>
            </div>
            <div 
                className="flex flex-col justify-center items-end h-[80vh] px-20"
                style={{ 
                    backgroundImage: "url('/landing-2.jpg')", 
                    backgroundSize: "cover", 
                    backgroundPosition: "center" 
                }}>
                <h2 className="text-2xl font-semibold w-1/2">Know your audience</h2>
                <p className="text-xl my-4 w-1/2">Find out which posts are a hit with built-in analytics. 
                You’ll see where your audience is coming from and what they’re interested in.
                </p>
            </div>
            <div 
                className="flex flex-col justify-center h-[80vh] px-20"
                style={{ 
                    backgroundImage: "url('/landing-3.jpg')", 
                    backgroundSize: "cover", 
                    backgroundPosition: "center" 
                }}>
                <h2 className="text-2xl font-semibold">Hang onto your memories</h2>
                <p className="text-xl my-4 w-1/2">Save the moments that matter. Our website 
                    lets you safely store thousands of posts, photos, and more!
                </p>
            </div>
            <div 
                className="flex flex-col justify-center items-center h-[100vh] px-20 xl:mb-10 xl:justify-end xl:pb-20"
                style={{ 
                    backgroundImage: "url('/landing-4.jpg')", 
                    backgroundSize: "cover",
                    backgroundPosition: "0px -100px", 
                    backgroundRepeat: "no-repeat",
                }}>
                <h2 className="text-2xl font-semibold w-1/2">Join millions of others</h2>
                <p className="text-xl my-4 w-1/2">Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company. Sign up to discover why millions of people have published their passions here.
                </p>
                <div className="w-1/2">
                    <div className="bg-orange-400 w-fit rounded-full px-4 py-3 my-4 mx-auto font-bold text-gray-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-orange-500 active:scale-95">
                        <Link to="/write">Start writing now!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;