import { Link } from "react-router-dom";
import logo from "./assets/spotify-to-youtube-logo.png"
import { useState, useEffect, useRef } from "react";
import "./Header.css";

function Header({user}) {

    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) =>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler);
    }, [])

    const [theme, setTheme] = useState("light");
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    useEffect(() => {
        if(userTheme === "dark" || (!userTheme && systemTheme)){
            setTheme("dark");
        }
        else{
            setTheme("light");
        }
    }, [userTheme, systemTheme])

    useEffect(() =>{
        if(theme === "dark"){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
    }, [theme])

    const handleThemeSwitch = () =>{
        if(theme === "dark"){
            setTheme("ligth");
            localStorage.setItem("theme", "light")
        }
        else{
            setTheme("dark");
            localStorage.setItem("theme", "dark")
        }
    };

  return (
    <header className="dark:bg-gray-900 md:flex sm:items-center md:items-center md:justify-between bg-amber-300 p-6 border-b shadow-md dark:shadow-neutral-800">
        <div className="flex flex-shrink-0 text-black dark:text-stone-50 gap-5 items-center justify-between">
            <a href="/" className='flex gap-5 items-center'>
                <img className="w-10 select-none" src={logo} alt="logo"/>
                <span className="text-2xl font-semibold tracking-tight duration-500 select-none">
                    <span className="text-custom-green">Spotify</span>
                    To
                    <span className="text-custom-red">YouTube</span>
                </span>
            </a>
            <span className="cursor-pointer md:hidden" onClick={() => {setOpen(!open)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </span>
        </div>
        <div className="flex cursor-pointer">
            <div ref={menuRef} className={`dropdown-menu ${open ? 'active' : 'inactive'} bg-amber-300 dark:bg-gray-900 z-10`}>
                
                <ul className="text-xl font-semibold md:flex md:items-center text-black dark:text-stone-50 md:static 
                md:w-auto md:pl-0 md:opacity-100 md:my-0">
                    <li className="mx-5 my-6 sm:my-6">
                    <Link to={"/Howto"} onClick={() => {setOpen(!open)}} className="hover:text-green-500 duration-500">
                        How to
                    </Link>
                    </li>{
                        user ? (                    
                            <li className="mx-5 my-5">
                                <Link to={'/YoutubeLogout'} onClick={() => {setOpen(!open)}} className="hover:text-custom-red duration-500">
                                    Sign out
                                </Link>
                            </li>
                        ) : (                        
                            <li className="mx-5 my-5">
                                <Link to={'/YoutubeLogin'} onClick={() => {setOpen(!open)}} className="hover:text-custom-red duration-500">
                                    Sign in
                                </Link>
                            </li>)
                    }
                    <li className="mx-5 my-5 flex">
                        <div className={`theme-icon-sun ${theme === "dark" ? "light" : "dark"}`}>
                            <svg onClick={handleThemeSwitch} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 dark:text-white  dark:hover:text-amber-300 ">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                            </svg>
                        </div>
                        <div className={`theme-icon-moon ${theme === "light" ? "dark" : "light"}`}>
                            <svg onClick={handleThemeSwitch} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-black hover:text-gray-800">
                                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </header>
  );
}

export default Header