import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getParticularPackIcon } from "../../utils/APIRoutes";
import SVG from 'react-inlinesvg';
import { MdOutlineRemoveCircle } from "react-icons/md";


function DraftIconMainList() {
    const { register, handleSubmit, formState: { errors },} = useForm();
    const [packIconsArr, SetPackIconsArr] = useState([]);
    const { packId } = useParams();

    useEffect(()=>{
        console.log("packId..",packId);
        axios.post(getParticularPackIcon,{packId : packId}).then((res)=>{
            console.log("getParticularPackIcon..RESS", res);
            if(res.data && res.data.status){
                SetPackIconsArr(res.data.data);
            }
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const handleChangeTag = () =>{

    }

    const handleKeyDownTags = () => {

    }

    return ( 
        <div className="py-20 bg-white px-2">
            <div className="flex justify-between items-center">
                <div> <h3 className="font-bold"> Draft Icons </h3> </div>
                <div className="flex gap-4">
                <button className="border-2 border-indigo-500 w-80 max-w-[120px] m-auto border-solid cursor-pointer rounded-2xl mt-6 text-xl py-1">Save Draft</button>
                    <button className="bg-indigo-500 w-80 max-w-[120px] m-auto border-solid cursor-pointer rounded-2xl mt-6 text-white text-xl py-1">Sumit</button>
                </div>
            </div>
            <div className="px-5 py-10 bg-slate-100">
                <div className="grid grid-cols-3 gap-4">
                    <div className="grid">
                        <span>Pack Name</span>
                        <input type="email" name="email" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Pack Name"
                        {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                    </div>
                    <div className="grid">
                        <span>Kit Name</span>
                        <select name="country" id="country" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2">
                            <option>Material Tailwind HTML</option>
                            <option>Material Tailwind React</option>
                            <option>Material Tailwind Vue</option>
                            <option>Material Tailwind Angular</option>
                            <option>Material Tailwind Svelte</option>
                        </select>
                        {/* <input type="email" name="email" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Kit Name"
                        {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/> */}
                    </div>
                    <div className="grid">
                        <span>Pack Name</span>
                        <input type="email" name="email" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Pack Name"
                        {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                    </div>
                    <div className="grid">
                        <span>Pack Name</span>
                        <input type="email" name="email" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Pack Name"
                        {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                    </div>
                    <div className="grid">
                        <span>Pack Name</span>
                        <input type="email" name="email" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Pack Name"
                        {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                    </div>
                    <div className="grid">
                        <span>Pack Name</span>
                        <input type="email" name="email" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Pack Name"
                        {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                    </div>
                    <div className="grid">
                        <span>Pack Name</span>
                        <input type="email" name="email" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Pack Name"
                        {...register("email",{ required : "Email is required.",pattern : {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message : "Email not valid"}})}/>
                    </div>
                </div>
            </div>
            <div className="">
                <h2>Element Icons Preview</h2>
                <div className="grid grid-cols-4 gap-6 px-5">
                    { packIconsArr && packIconsArr.map((data, index) => {
                            const { iconPathName,name, tag, imageData } = data;
                            return (
                                <div className="min-h-96 w-full">
                                    <div className="grid grid-rows-2 h-full border-solid border-1 shadow-2xl rounded-xl">
                                        <div className="row-span flex justify-center items-center bg-gradient-to-r from-gray-200 to-slate-100">
                                        {
                                            iconPathName.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                            <div className="file-image"> 
                                            <SVG src={imageData} className="h-32 w-full"/></div> :
                                            <div className="file-image"><i className="far fa-file-alt"></i></div>
                                        }
                                        </div>
                                        <div className="row-span">
                                            <div className="border border-slate-200 border-t-1 border-t-0 border-l-0 border-r-0 border-b-1 p-2.5">
                                                <h6>{name ? name.split(', ')[0] : null}</h6>
                                            </div>
                                            <div className="p-2.5">
                                                <div>
                                                    <label className="mt-3 pb-2 mb-0 caption font-weight-normal"> 1/10 Tags </label>
                                                </div>
                                                <div className="overflow-scroll block items-center justify-between box-content">
                                                    <ul className="h-24">
                                                        {tag.map((tag, index) => (
                                                            <li className="inline-flex inline-block p-1 bg-gray-200 text-sm cursor-pointer m-1.5 rounded-md">{tag}
                                                            <MdOutlineRemoveCircle className="mt-1.5 ml-1"/>
                                                            </li>
                                                        ))}
                                                        <li className="inline-block">
                                                            <input type="text" className=""/>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <div className="">
                                                    {tag.map((tag, index) => (
                                                        <span className="">
                                                            {tag}
                                                        <button className="delete"/> 
                                                        </span>
                                                    ))}
                                                    <textarea className="h-28 w-full h-28" type="text" 
                                                        onChange={handleChangeTag}
                                                        onKeyDown={handleKeyDownTags} />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    } 
                </div>
            </div>
        </div>
    );
}

export default DraftIconMainList;