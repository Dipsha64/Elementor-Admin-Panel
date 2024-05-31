import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getParticularPackIcon } from "../../utils/APIRoutes";
import SVG from 'react-inlinesvg';
import { MdOutlineRemoveCircle } from "react-icons/md";
import Model from "../../components/Model";

function DraftIconMainList() {
    const { register, formState: { errors },} = useForm();
    const [packIconsArr, SetPackIconsArr] = useState([]);
    const [show, setShow] = useState(false);
    const { packId } = useParams();
    const [ selectedItem, setSelectedItem ] = useState({});

    console.log(errors);
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

    const handleSelect = (data , index) =>{
        console.log("Tagsss" , data , packIconsArr , index);
        if(index >= 0){
            let isExist = packIconsArr[index].tag.findIndex((item)=>{
                return item.trim() === data.trim()
            })
            console.log("isExist..",isExist);
            if(isExist > -1){
                delete packIconsArr[index].tag[isExist];
            }
        }
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSelection = (item) => {
        console.log("handleSelection..........item,",item);

        setSelectedItem(item);
    };

    return ( 
        <div className="bg-white px-2">
            <div className="flex justify-between bg-slate-100 items-center px-5 py-1.5">
                <div> <h3 className="font-bold"> Draft Icons </h3> </div>
                <div className="flex gap-4">
                <button className="border-2 border-indigo-500 w-80 max-w-[120px] m-auto border-solid cursor-pointer rounded-xl mt-6 text-xl py-1">Save Draft</button>
                    <button className="bg-indigo-500 w-80 max-w-[120px] m-auto border-solid cursor-pointer rounded-xl mt-6 text-white text-xl py-1">Submit</button>
                </div>
            </div>
            <div className="px-5 py-10 bg-slate-100 flex">
                <div className="grow shrink basis-4/12">
                    Image Preview
                </div>
                <div className="grid grid-cols-3 gap-4 grow shrink basis-8/12">
                    <div className="grid">
                        <span>Pack Name</span>
                        <input type="text" name="packName" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Pack Name"
                        {...register("packName",{ required : "Pack name is required."})}/>
                        <span className="text-red-500">
                            {errors.packName && <span>{errors.packName.message}</span>}
                        </span>
                    </div>
                    <div className="grid">
                        <span>Kit Name</span>
                        <Model show={show} handleClose={handleClose} onItemSelected={handleSelection}>
                        </Model>
                        <input className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" value={selectedItem.kitName} name="kit" onClick={handleShow}/>
                    </div>
                    <div className="grid">
                        <span>Style</span>
                        <select name="styleName" id="country" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" onClick={handleShow} 
                            {...register("styleName",{ required : "Style of icon is required."})}>
                            <option>A</option>
                            <option>A</option>
                            <option>A</option>
                        </select>
                        <span className="text-red-500">
                            {errors.styleName && <span>{errors.styleName.message}</span>}
                        </span>
                    </div>
                    <div className="grid">
                        <span>Category</span>
                        <select name="category" id="country" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" onClick={handleShow} 
                            {...register("styleName",{ required : "Category of icon is required."})}>
                            <option>A</option>
                            <option>A</option>
                            <option>A</option>
                        </select>
                        <span className="text-red-500">
                            {errors.category && <span>{errors.category.message}</span>}
                        </span>
                    </div>
                    <div className="grid">
                        <span>Description</span>
                        <textarea name="description" className="leading-6 w-96 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2">
                        </textarea>
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
                                                        {tag.map((tags, ids) => (
                                                            <li value={tags} onClick={() => handleSelect(tags,index)} key={ids} className="inline-flex inline-block p-1 bg-gray-200 text-sm m-1.5 rounded-md">
                                                                {tags}
                                                            <MdOutlineRemoveCircle  className="ml-1 mt-auto mb-auto cursor-pointer"/>
                                                            </li>
                                                        ))}
                                                        <li className="inline-block">
                                                            <input type="text" className="outline-none w-20 border-none"/>
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