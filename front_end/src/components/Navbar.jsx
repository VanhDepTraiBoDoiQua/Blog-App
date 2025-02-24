import { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between ">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
                <Image src="logo.png" className="w-8 h-8" alt="Blog logo"/>
                <span>Blog Platform</span>
            </Link>
            
            {/* MOBILE MENU */}
            <div className="md:hidden">
                <div className="cursor-pointer" 
                    onClick={() => setOpenMenu((prev) => !prev)}>
                    {openMenu ? (
                        <img src="/closeMenu.png" className="w-8 h-8" alt="menu logo"/>
                    ) : (
                        <img src="/menuLogo.png" className="w-8 h-8" alt="menu logo"/>
                    )}
                </div>

                {/* MOBILE LINK LIST */}
                <div className={`w-full h-screen flex flex-col items-center justify-center 
                    absolute top-16 bg-amber-100 transition-all ease-in-out gap-8 font-medium text-lg
                    ${openMenu ? ("-right-0") : ("-right-full")}`}>
                    <Link to="/">Home</Link>
                    <Link to="/">Trending</Link>
                    <Link to="/">Popular</Link>
                    <Link to="/">About</Link>
                    <SignedOut>
                        <Link to="/login">
                            <button className="py-2 px-4 rounded-3xl bg-lime-400">Login </button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <Link to="/">Home</Link>
                <Link to="/">Trending</Link>
                <Link to="/">Popular</Link>
                <Link to="/">About</Link>
                <SignedOut>
                    <Link to="/login">
                        <button className="py-2 px-4 rounded-3xl bg-lime-400">Login </button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </div>
    )
}

export default NavBar;