import folderAnimation from "../../lotties/folder-animation.json";
import Lottie from "react-lottie";
import { useState, useEffect } from "react";

function UploadIcon() {
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);


    useEffect(()=>{
        console.log("SetSelectedFile......>>>>>>",selectedfile);
    },[selectedfile]);
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
    const uploadDraftIcon = (e) =>{
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [...preValue, {filename: e.target.files[i].name,filetype: e.target.files[i].type,
                        fileimage: reader.result,datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                        filesize: filesizes(e.target.files[i].size)}]
                })
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    }
    const handleChangeTag = () => {

    }
    const handleKeyDownTags = () => {

    }
    return (
        <div class="py-20 bg-white px-2">
            <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                <div class="md:flex">
                    <div class="w-full p-3">
                        <div class="relative border-dotted h-48 cursor-pointer rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">

                        <div class="absolute">
                            
                            <div class="flex flex-col items-center">
                            <Lottie options={defaultOptions} height={100} width={100} />
                            <span class="block text-gray-400 font-normal">Attach you files here</span>
                            </div>
                        </div>

                        <input type="file" class="h-full w-full opacity-0 cursor-pointer" name="" onChange={uploadDraftIcon} multiple/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <h2>Element Icons Preview</h2>
                <div class="grid grid-cols-4 gap-6 px-5">
                    {
                        selectedfile && selectedfile.map((data, index) => {
                            const { filename, filetype, fileimage, datetime, filesize } = data;
                            return (
                                <div className="min-h-96">
                                    <div className="grid grid-rows-2 h-full border-solid border-1 shadow-2xl rounded-xl">
                                        <div className="row-span m-auto">
                                        {
                                            filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                            <div className="file-image"> <img src={fileimage} className="h-32 w-full" alt="" /></div> :
                                            <div className="file-image"><i className="far fa-file-alt"></i></div>
                                        }
                                        </div>
                                        <div className="row-span">
                                        <h6>{filename ? filename.split(', ')[0] : null}</h6>
                                        <label class="mt-3 pb-2 mb-0 caption font-weight-normal"> 1/10 Tags </label>
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
        

        // <div className="relative w-64 mx-auto my-auto">
        //     <div className="pt-3">
        //     <label title="Click to upload" for="button2" className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
        //     <div className="w-max relative">
        //         <img className="w-12" src="https://www.svgrepo.com/show/485545/upload-cicle.svg" alt="file upload icon" width="512" height="512"/>
        //     </div>
        //     <div className="relative">
        //         <span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
        //             Upload a file
        //         </span>
        //         <span className="mt-0.5 block text-sm text-gray-500">Max 2 MB</span>
        //     </div>
        //     </label>
        //     <input hidden="" type="file" name="button2" id="button2" className="w-40 mx-3 my-3"/>
        //     </div>
        // </div>
    );
}

export default UploadIcon;