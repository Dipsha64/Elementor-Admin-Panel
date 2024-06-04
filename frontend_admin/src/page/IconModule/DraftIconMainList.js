import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getParticularPackIcon, saveActiveIcon } from "../../utils/APIRoutes";
import SVG from 'react-inlinesvg';
import { MdOutlineRemoveCircle } from "react-icons/md";
import Model from "../../components/Model";
import styleOption from "../../utils/styleJSON";
import categoryOption from "../../utils/categoryJSON";

function DraftIconMainList() {
    const { register,handleSubmit, formState: { errors },} = useForm();
    const [packIconsArr, SetPackIconsArr] = useState([]);
    const [show, setShow] = useState(false);
    const { packId } = useParams();
    const [ selectedItem, setSelectedItem ] = useState({});
    const [ submitStatus, setSubmitStatus ] = useState("");

    console.log(errors);
    useEffect(()=>{
        fetchPackData();
    },[])

    useEffect(() => {
        setSubmitStatus(submitStatus);
      },[submitStatus]);

    const fetchPackData = () => {
        try {
            axios.post(getParticularPackIcon,{packId : packId}).then((res)=>{
                if(res.data && res.data.status){
                    SetPackIconsArr(res.data.data);
                }
            }).catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleRemoveTag = (data , index, packObj) =>{
        const findtagId =  packIconsArr[index].tag.findIndex((item)=>{
            return item === data
        })
        if(findtagId > -1){
            packIconsArr[index].tag.splice(findtagId,1);
            SetPackIconsArr([...packIconsArr]);
        }
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSelection = (item) => {
        setSelectedItem(item);
    };

    const handleIconTag = (event, index) => {
        if(event.key === 'Enter'){
            if(packIconsArr[index].tag){
                packIconsArr[index].tag.push(event.target.value);
            }
            packIconsArr[index].newTagVal = '';
            delete packIconsArr[index].newTagVal;
            SetPackIconsArr([...packIconsArr]);
        }
    }

    const handleNewTagInput = (e,index) => {
        packIconsArr[index].newTagVal = e.target.value;
    }
    const submitIcons = (data, status) => {
        let kitObj = { _id : selectedItem._id, kitName : selectedItem.kitName }
        const objData = {...data, kitValue : kitObj};
        axios.post(saveActiveIcon,{packId: packId,formData : objData, iconData : packIconsArr, status : status}).then((res)=>{
            console.log("res...",res);
        }).catch((error)=>{
            console.log(error);
        })
    };
    return ( 
        <div className="bg-white px-2">
            <form noValidate>
            <div className="flex justify-between bg-slate-100 items-center px-5 py-1.5">
                <div> <h3 className="font-bold"> Draft Icons </h3> </div>
                <div className="flex gap-4">
                    <button type="button" onClick={handleSubmit(data => submitIcons(data, "draft"))} className="border-2 border-indigo-500 w-80 max-w-[120px] m-auto border-solid cursor-pointer rounded-xl mt-6 text-xl py-1">Save Draft</button>
                    <button type="button" onClick={handleSubmit(data => submitIcons(data, "active"))}  className="bg-indigo-500 w-80 max-w-[120px] m-auto border-solid cursor-pointer rounded-xl mt-6 text-white text-xl py-1">Submit</button>
                </div>
            </div>
            <div className="px-5 py-10 bg-slate-100 flex">
                <div className="grow shrink basis-4/12 mx-12 border p-6 border-slate-300 rounded-md">
                    <div className="flex flex-wrap">
                        { packIconsArr.slice(0, 6).map((item,index)=>{
                            return(
                                <div className="grow shrink basis-1/3">
                                    {
                                        item.iconPathName.match(/.(svg)$/i) ?
                                        <div className="file-image"> 
                                        <SVG src={item.imageData} className="h-16 w-full"/></div> :
                                        <div className="file-image"><i className="far fa-file-alt"></i></div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 grow shrink basis-8/12">
                    <div className="grid">
                        <span>Pack Name</span>
                        <input type="text" name="packName" className="leading-6 max-w-72 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" placeholder="Enter Pack Name"
                        {...register("packName",{ required : "Pack name is required."})}/>
                        <span className="text-red-500">
                            {errors.packName && <span>{errors.packName.message}</span>}
                        </span>
                    </div>
                    <div className="grid">
                        <span>Kit Name</span>
                        <Model show={show} handleClose={handleClose} onItemSelected={handleSelection}>
                        </Model>
                        <input className="leading-6 max-w-72 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" value={selectedItem.kitName} name="kit" onClick={handleShow}/>
                    </div>
                    <div className="grid">
                        <span>Style</span>
                        <select name="styleName" id="country" className="leading-6 max-w-72 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" 
                            {...register("styleName",{ required : "Style of icon is required."})}>
                                {styleOption && styleOption.map((styleItem)=>{
                                    return (
                                        <option value={styleItem.value}>{styleItem.name}</option>
                                    )
                                })}
                        </select>
                        <span className="text-red-500">
                            {errors.styleName && <span>{errors.styleName.message}</span>}
                        </span>
                    </div>
                    <div className="grid">
                        <span>Category</span>
                        <select name="category" id="country" className="leading-6 max-w-72 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2"
                            {...register("category",{ required : "Category of icon is required."})}>
                                {categoryOption && categoryOption.map((styleItem)=>{
                                    return (
                                        <option value={styleItem.value}>{styleItem.name}</option>
                                    )
                                })}
                        </select>
                        <span className="text-red-500">
                            {errors.category && <span>{errors.category.message}</span>}
                        </span>
                    </div>
                    <div className="grid">
                        <span>Description</span>
                        <textarea name="description" className="leading-6 max-w-72 rounded-lg border-solid border-2 border-indigo-600 px-2.5 py-2" {...register("description")}>
                        </textarea>
                    </div>
                </div>
            </div>
            </form>
            <div className="">
                <h2>Element Icons Preview</h2>
                <div className="grid grid-cols-4 gap-6 px-5">
                    { packIconsArr && packIconsArr.map((data, index) => {
                            const { iconPathName,name, tag, imageData, newTagVal } = data;
                            return (
                                <div className="min-h-96 w-full">
                                    <div className="grid grid-rows-2 h-full border-solid border-1 shadow-2xl rounded-xl">
                                        <div className="row-span flex justify-center items-center bg-gradient-to-r from-gray-200 to-slate-100">
                                        {
                                            iconPathName.match(/.(svg)$/i) ?
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
                                                            <li value={tags} onClick={() => handleRemoveTag(tags,index,data)} key={ids} className="inline-flex inline-block p-1 bg-gray-200 text-sm m-1.5 rounded-md">
                                                                {tags}
                                                            <MdOutlineRemoveCircle  className="ml-1 mt-auto mb-auto cursor-pointer"/>
                                                            </li>
                                                        ))}
                                                        <li className="inline-block">
                                                            <input type="text" name="newTag" className="outline-none w-20 border-none" value={newTagVal} onChange={(event) => handleNewTagInput(event,index)} onKeyDown={(e) =>handleIconTag(e,index)}/>
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