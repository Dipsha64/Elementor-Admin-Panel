import folderAnimation from "../../lotties/folder-animation.json";
import Lottie from "react-lottie";
import { useState, useEffect } from "react";
import { draftIconSave } from "../../utils/APIRoutes";
import axios from "axios";
import { getAllDraftPackRoute } from "../../utils/APIRoutes";
import SVG from 'react-inlinesvg';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function UploadIcon() {
    const [selectedfile, SetSelectedFile] = useState([]);
    const [ sourceFile, setSourceFile ] = useState([]);
    const [showForm, setShowForm ] = useState(false);
    const [ packFiles, setPackFiles ] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(getAllDraftPackRoute).then((res)=>{
            console.log("GET ALL PACK",res);
            if(res.data && res.data.status){
                setPackFiles(res.data.data);

            }
        }).catch((error)=>{
            console.log(error);
        })
    },[]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: folderAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };

    // const filesizes = (bytes, decimals = 2) =>{
    //     if (bytes === 0) return '0 Bytes';
    //     const k = 1024;
    //     const dm = decimals < 0 ? 0 : decimals;
    //     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    //     const i = Math.floor(Math.log(bytes) / Math.log(k));
    //     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    // }
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
                console.log("Upload successfully",res , res.data.data._id);
                navigate(`/icons/${res.data.data._id}`)
                // <Navigate to={`/icons/${res.data.data._id}`}/>;
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    return (
        <div className="py-20 bg-white px-2">
            <h3 className="font-bold"> Upload icon </h3>
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
            <div className="px-5">
                <h2>Pack Preview</h2>
                <div className="grid grid-cols-6 gap-4">
                    {
                        packFiles && packFiles.map((data, index) => {
                            return (
                                <div className="min-h-56">
                                    <Link to={`/icons/${data._id}`}>
                                    <div className="grid border-solid border-2 border-slate-400 rounded-xl cursor-pointer">
                                        <span className="icon" draggable="true" clickable="true">
                                            <SVG src={data.imageData} className="h-44 w-56"/>
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <span>{data.name}</span><span> ({data.packItemCount}) </span>
                                    </div>
                                    </Link>
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