import folderAnimation from "../../lotties/folder-animation.json";
import Lottie from "react-lottie";
import { useState } from "react";
import { draftIconSave } from "../../utils/APIRoutes";
import axios from "axios";
import { useForm } from "react-hook-form"

function UploadIcon() {
    const [selectedfile, SetSelectedFile] = useState([]);
    const [ sourceFile, setSourceFile ] = useState([]);
    const [showForm, setShowForm ] = useState(false);
    const { register, handleSubmit, formState: { errors },} = useForm();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: folderAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };

    const filesizes = (bytes, decimals = 2) =>{
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    const uploadDraftIcon = async (e) =>{
        let images = [];
        console.log("on Chnage Calling...,");
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [...preValue, {filename: e.target.files[i].name,filetype: e.target.files[i].type,
                        fileimage: reader.result,createdAt: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                    }];
                })
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
        setSourceFile(e.target.files);
        uploadDraftData(e.target.files);
    }
    const uploadDraftData = (fileData) =>{
        let formdata = new FormData();
        setShowForm(true);
        if(fileData && fileData.length > 0){
            for(let i= 0;i<fileData.length;i++){
                formdata.append('files',fileData[i]);
            }
            axios.post(draftIconSave,formdata).then((res)=>{
                console.log("Upload successfully",res);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    return (
        <div className="py-20 bg-white px-2">
            { showForm ? 
            <div className="flex justify-between items-center">
                <div> <h3 className="font-bold"> Draft Icons </h3> </div>
                <div className="flex gap-4">
                <button className="border-2 border-indigo-500 w-80 max-w-[120px] m-auto border-solid cursor-pointer rounded-2xl mt-6 text-xl py-1">Save Draft</button>
                    <button className="bg-indigo-500 w-80 max-w-[120px] m-auto border-solid cursor-pointer rounded-2xl mt-6 text-white text-xl py-1">Sumit</button>
                </div>
            </div>
            : <h3 className="font-bold"> Upload icon </h3> }
        
            { !showForm ?
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                <div className="md:flex">
                    <div className="w-full p-3">
                        <div className="relative border-dotted h-48 cursor-pointer rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">

                        <div className="absolute">
                            
                            <div className="flex flex-col items-center">
                            <Lottie options={defaultOptions} height={100} width={100} />
                            <span className="block text-gray-400 font-normal">Attach you files here</span>
                            </div>
                        </div>

                        <input type="file" className="h-full w-full opacity-0 cursor-pointer" name="files" onChange={uploadDraftIcon} multiple/>
                        </div>
                    </div>
                </div>
            </div>
            :
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
            }
            <div className="">
                <h2>Element Icons Preview</h2>
                <div className="grid grid-cols-4 gap-6 px-5">
                    {
                        selectedfile && selectedfile.map((data, index) => {
                            const { filename, filetype, fileimage, datetime, filesize } = data;
                            return (
                                <div className="min-h-96">
                                    <div className="grid grid-rows-2 h-full border-solid border-1 shadow-2xl rounded-xl">
                                        <div className="row-span flex justify-center items-center bg-gradient-to-r from-gray-200 to-slate-100">
                                        {
                                            filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                            <div className="file-image"> <img src={fileimage} className="h-32 w-full" alt="" /></div> :
                                            <div className="file-image"><i className="far fa-file-alt"></i></div>
                                        }
                                        </div>
                                        <div className="row-span">
                                            <div className="">
                                                <h6>{filename ? filename.split(', ')[0] : null}</h6>
                                            </div>
                                            <label className="mt-3 pb-2 mb-0 caption font-weight-normal"> 1/10 Tags </label>
                                            <div>
                                                <div className="tags-input">
                                                {/* {this.props.value.map((tag, index) => (
                                                    <Tag>
                                                    {tag}
                                                    <Delete onClick={this.handleRemoveTag} />
                                                    </Tag>
                                                ))} */}
                                                {/* <textarea className="border-2 border-solid border-gray-500 h-28 w-full h-28" type="text" 
                                                    onChange={handleChangeTag}
                                                    onKeyDown={handleKeyDownTags} /> */}
                                                </div>
                                                <span>hit 'Enter' to add new tags</span>
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

export default UploadIcon;