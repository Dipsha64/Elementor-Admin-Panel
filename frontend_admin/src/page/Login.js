import animationData from "../lotties/login-animation.json";
import React from "react";
import Lottie from "react-lottie";
import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { loginAsync } from "../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handlePassword = () =>{
        setShowPassword(preve => !preve);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors },} = useForm();
    console.log("ERR",errors)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };
    const toastOption = {
        position : "top-right",
        autoClose : 8000,
        pauseOnHover : true,
        theme : "dark",
        draggable : true
    }
    const loginSubmit = (data) =>{
        dispatch(loginAsync(data)).then((res)=>{
            if(res.payload && res.payload.status === true){
                navigate("/");
            }
            else if(res.payload && res.payload.status === false){
                toast(res.payload.message,toastOption);
            }  
        })
    }

    return (
        <div className="h-full bg-gradient-to-r from-indigo-400 px-40 py-32">
            <div className="bg-white flex justify-center rounded-3xl">
                <div className="w-1/2 text-center">
                    <form noValidate className="pt-28" onSubmit={handleSubmit(loginSubmit)}>
                        <h3>Welcome</h3>
                        <span>Please, Enter your details & start your work!</span>
                        <div className="mt-4">
                            <span className="ml-auto mr-auto">Email</span>
                            <div className="rounded-2xl w-80 border-2 border-indigo-500 block ml-auto mr-auto">
                                <input type="email" name="email" className="border-none outline-none px-3 py-1 w-72" placeholder="Enter Email"
                                    {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                            </div>
                            <span className="text-red-500">
                                {errors.email && <span>{errors.email.message}</span>}
                            </span>
                        </div>
                        <div className="mt-4">
                            <span>Password</span>
                            <div className="flex rounded-2xl w-80 border-2 border-indigo-500 block ml-auto mr-auto px-2 py-1 ">
                                <input type={showPassword ? "text" : "password"} name="password" className="border-none outline-none px-3 py-1 w-72" placeholder="Enter Password" {...register("password",{required : "Password is required.",pattern: {value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message: `at least 8 characters\n
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                        - Can contain special characters`}})}/>
                                <span className="flex text-xl mt-auto mb-auto" onClick={handlePassword}>{showPassword ? <BiShow/> : <BiHide/>}</span>
                            </div>
                            <span className="text-red-500">
                                {errors.password && <span>{errors.password.message}</span>}
                            </span>
                        </div>
                        <button className="bg-indigo-500 w-full max-w-[120px] m-auto border-solid cursor-pointer rounded-2xl mt-6 text-white text-xl py-1">Login</button>
                        <div className="relative flex py-5 items-center px-24">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="flex-shrink mx-4 text-gray-400">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <button className="border-2 border-indigo-500 w-80 m-auto border-solid cursor-pointer rounded-2xl mt-6 text-xl py-1">Login with google</button>
                    </form>
                </div>
                <div className="w-1/2">
                    <Lottie options={defaultOptions} height={600} width={600} />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;