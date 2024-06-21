import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import { signOutAsync } from "../features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const [showMenu, setShowMenu ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMenu = () =>{
        setShowMenu(preve => !preve);
    }
    const handleLogout = () =>{
        dispatch(signOutAsync());
        navigate("/adminLogin");
    }
    return ( 
        <header className="h-20 w-full px-2 md:px-4 bg-gradient-to-r from-indigo-400">
            <div className="flex items-center h-full justify-between">
                <Link to={"/"}>
                    <div className="h-full pl-32">
                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="none" id="iconscout-logo"><path fill="#000" fill-rule="evenodd" d="M41.573 55.504a2.282 2.282 0 0 0-2.414-1.087 18.057 18.057 0 0 1-3.376.318c-10.29 0-18.576-8.584-18.098-18.986.427-9.289 7.96-16.828 17.242-17.255 10.396-.479 18.974 7.814 18.974 18.11 0 4.458-1.608 8.54-4.275 11.697a2.275 2.275 0 0 0-.244 2.607l5.173 8.966c.872 1.511 3.051 1.511 3.923 0L70.712 38.67a4.537 4.537 0 0 0 0-4.532L55.209 7.267A4.529 4.529 0 0 0 51.286 5H20.28a4.528 4.528 0 0 0-3.922 2.266L.855 34.136a4.535 4.535 0 0 0 0 4.533L16.358 65.54a4.528 4.528 0 0 0 3.922 2.266h24.468c1.744 0 2.833-1.888 1.962-3.4l-5.137-8.902Z" clip-rule="evenodd"></path><path fill="#000" fill-rule="evenodd" d="M35.783 27.425c-5.003 0-9.059 4.058-9.059 9.065s4.056 9.065 9.06 9.065c5.003 0 9.058-4.058 9.058-9.065s-4.055-9.065-9.059-9.065Z" clip-rule="evenodd"></path></svg>
                    </div>
                </Link>
                <div className="flex items-center gap-4 md:gap-7">
                    <nav className="flex gap-4 md:gap-6 text-xl md:text-xl text-indigo-600 font-semibold">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/icons"}>Icon</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className="text-slate-900" onClick={handleMenu}>
                        <div className="text-2xl border-2 border-solid border-slate-600 p-1 cursor-pointer rounded-full">
                            <FaUser />
                        </div>
                        { showMenu && 
                            <div className="absolute right-3 bg-white py-3 px-2 shadow drop-shadow-md flex flex-col text-indigo-600">
                                <Link to={"/setting"}><span className="whitespace-nowrap cursor-pointer">Setting</span></Link>
                                <span className="whitespace-nowrap cursor-pointer" onClick={handleLogout}>Logout</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;