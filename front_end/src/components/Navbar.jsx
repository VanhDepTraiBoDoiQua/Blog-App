import { useEffect, useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { getUser, isAuth } from "../auth/auth.js";
import AvatarDropdown from "./AvatarDropdown.jsx";

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const isSignedIn = isAuth();

    const cookies = document.cookie.split("; ");
    if (cookies) {
		cookies.forEach(cookie => {
			if (cookie.startsWith('user_info=')) {
				const token = cookie.split('=')[1];
                const user_info = JSON.parse(decodeURIComponent(token));
                localStorage.setItem("user", JSON.stringify(user_info));
                localStorage.setItem("exp", Date.now() + 172800000);
                document.cookie = "user_info=; max-age=0; path=/;";
			}
		});
	}

    const user = getUser();
    const role = user?.role;

    useEffect(() => {
    }, [isSignedIn]);
    
    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between ">
            {/* LOGO */}
            <Link to="/home" className="flex items-center gap-4 text-2xl font-bold outline-none">
                <Image src="logo.png" className="w-8 h-8" alt="Blog logo"/>
                <span>Blog Platform</span>
            </Link>
            
            {/* MOBILE MENU */}
            <div className="md:hidden">
                <div className="cursor-pointer" 
                    onClick={() => setOpenMenu((prev) => !prev)}>
                    {openMenu ? (
                        // <img src="/closeMenu.png" className="w-8 h-8" alt="close menu logo"/>
                        <Image src="closeMenu.png" className="w-8 h-8" alt="Blog logo"/>
                    ) : (
                        <img src="/menuLogo.png" className="w-8 h-8" alt="menu logo"/>
                        // <Image src="menuLogo.png" className="w-8 h-8" alt="menu logo"/>
                    )}
                </div>

                {/* MOBILE LINK LIST */}
                <div className={`w-full h-screen flex flex-col items-center justify-center 
                    absolute top-16 bg-amber-100 transition-all ease-in-out gap-8 font-medium text-lg
                    ${openMenu ? ("-right-0") : ("-right-full")}`}>
                    <Link to="/home" onClick={() => setOpenMenu(false)}>Home</Link>
                    <Link to="/posts?sortQuery=trending" onClick={() => setOpenMenu(false)}>Trending</Link>
                    <Link to="//posts?sortQuery=popular" onClick={() => setOpenMenu(false)}>Popular</Link>
                    {/* {role === "admin" && <Link to="/admin">Admin Page</Link>} */}

                    {isSignedIn ? (
                        <AvatarDropdown/>
                    ) : (
                        <Link to="/login">
                            <button className="py-2 px-4 rounded-3xl bg-lime-400">Login </button>
                        </Link>
                    )}
                </div>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <Link to="/home">Home</Link>
                <Link to="/posts?sortQuery=trending">Trending</Link>
                <Link to="/posts?sortQuery=popular">Popular</Link>
                {/* {role === "admin" && <Link to="/admin">Admin Page</Link>} */}
                
                {isSignedIn ? (
                    <AvatarDropdown/>
                ) : (
                    <Link to="/login">
                            <button className="py-2 px-4 rounded-3xl bg-lime-400">Login </button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default NavBar;