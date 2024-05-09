import animationData from "../lotties/login-animation.json";
import React from "react";
import Lottie from "react-lottie";
import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handlePassword = () =>{
        setShowPassword(preve => !preve);
    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="h-full bg-gradient-to-r from-indigo-400 px-40 py-32">
            <div className="bg-white flex justify-center rounded-3xl">
                <div className="w-1/2 text-center">
                    <form className="pt-28">
                        <h3>Welcome</h3>
                        <span>Please, Enter your details & start your work!</span>
                        <div className="mt-4">
                            <span className="ml-auto mr-auto">Email</span>
                            <div className="rounded-2xl w-80 border-2 border-indigo-500 block ml-auto mr-auto">
                                <input type="text" name="email" className="border-none outline-none px-3 py-1 w-72" placeholder="Enter Email"/>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span>Password</span>
                            <div className="flex rounded-2xl w-80 border-2 border-indigo-500 block ml-auto mr-auto px-2 py-1 ">
                                <input type={showPassword ? "text" : "password"} name="password" className="border-none outline-none px-3 py-1 w-72" placeholder="Enter Password"/>
                                <span className="flex text-xl mt-auto mb-auto" onClick={handlePassword}>{showPassword ? <BiShow/> : <BiHide/>}</span>
                            </div>
                        </div>
                        <button className="bg-indigo-500 w-full max-w-[120px] m-auto border-solid cursor-pointer rounded-2xl mt-6 text-white text-xl py-1">Login</button>
                        <div class="relative flex py-5 items-center px-24">
                            <div class="flex-grow border-t border-gray-400"></div>
                            <span class="flex-shrink mx-4 text-gray-400">or</span>
                            <div class="flex-grow border-t border-gray-400"></div>
                        </div>
                        <button className="border-2 border-indigo-500 w-80 m-auto border-solid cursor-pointer rounded-2xl mt-6 text-xl py-1">Login with google</button>
                    </form>
                </div>
                <div className="w-1/2">
                    <Lottie options={defaultOptions} height={600} width={600} />
                </div>
            </div>
        </div>
    );
}

export default Login;