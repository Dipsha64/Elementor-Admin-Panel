import React, { useState, useEffect } from 'react';
import { IoEnterOutline } from "react-icons/io5";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineRemoveCircle } from "react-icons/md";
import { getCategory,createCategory,updateCategory,deleteCategory,getStyle, createStyle, updateStyle, deleteStyle } from "../utils/APIRoutes";

function Setting() {
    const [activeTab, setActiveTab] = useState(0);

    const [categoryVal, setCategoryVal ] = useState("");
    const [categoryArr, setCategoryArr ] = useState([]);
    const [editCategory, setEditCategory ] = useState({});

    const [ styleVal, setStyleVal ] = useState("");
    const [ styleArr, setStyleArr ] = useState([]);
    const [ editStyle , setEditStyle ] = useState({});

    const tabs = [
        { name: 'Category'},
        { name: 'Style'},
        { name: 'Profile'},
    ];
    const toastOption = {
        position : "top-right",
        autoClose : 8000,
        pauseOnHover : true,
        theme : "dark",
        draggable : true
    }
    // Category Tab Methods
    const addcategory = () => {
        if(Object.keys(editCategory).length === 0){
            axios.post(createCategory,{categoryVal : categoryVal}).then((result)=>{
                toast(`Category created successfully.`,toastOption);
                getAllCategoryData();
                setCategoryVal("");
            }).catch((error)=>{
                console.log(error);
            })
        }
        else if(Object.keys(editCategory).length > 0){
            axios.put(updateCategory,{categoryObj : editCategory, newValue : categoryVal}).then((result)=>{
                toast(`Category Updated successfully.`,toastOption);
                getAllCategoryData();
                setCategoryVal("");
                setEditCategory({});
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    const handleRemoveCategory = (item) => {
        axios.post(deleteCategory,{categoryVal:item}).then((result)=>{
            toast(`Category deleted successfully.`,toastOption);
            getAllCategoryData();
        }).catch((error)=>{
            console.log(error);
        })
    }
    const handleEditCategory = (itemVal) => {
        setEditCategory(itemVal);
        setCategoryVal(itemVal.categoryName);
    }
    const getAllCategoryData = () => {
        axios.get(getCategory).then((result)=>{
            if(result.data && result.data.status){
                setCategoryArr(result.data.data);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    // Style Tab Methods
    const addStyle = () => {
        if(Object.keys(editStyle).length === 0){
            console.log("Add Style" , styleVal);
            axios.post(createStyle,{styleVal : styleVal}).then((result)=>{
                toast(`Category created successfully.`,toastOption);
                getAllStyleData();
                setStyleVal("");
            }).catch((error)=>{
                console.log(error);
            })
        }
        else if(Object.keys(editStyle).length > 0){
            axios.put(updateStyle,{styleObj : editStyle, newValue : styleVal}).then((result)=>{
                toast(`Category Updated successfully.`,toastOption);
                getAllStyleData();
                setStyleVal("");
                setEditStyle({});
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    const handleRemoveStyle = (item) => {
        axios.post(deleteStyle,{styleVal:item}).then((result)=>{
            toast(`Category deleted successfully.`,toastOption);
            getAllStyleData();
        }).catch((error)=>{
            console.log(error);
        })
    }
    const handleEditStyle = (itemVal) => {
        setEditStyle(itemVal);
        setStyleVal(itemVal.styleName);
    }
    const getAllStyleData = () => {
        axios.get(getStyle).then((result)=>{
            console.log("result..." , result.data);
            if(result.data && result.data.status){
                setStyleArr(result.data.data);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getAllCategoryData();
        getAllStyleData();
    },[])

    return (
        <>
        <div className="w-full">
            <div className="pt-3">
                <h1 className="text-center pt-sm-8 pt-6 pb-sm-8 pb-6 mb-0">Setting</h1>
            </div>
            <div className="w-full mx-auto mt-10">
                <div className="border-b border-gray-300">
                    <ul className="flex justify-evenly m-auto">
                    {tabs.map((tab, index)=>{
                        return <li className={`flex-1 py-2 px-4 text-center transition-colors duration-200 ${activeTab === index ? 'border-b-2 border-indigo-500 text-indigo-500' : 'border-b-2 border-transparent text-gray-600 hover:text-indigo-500 hover:border-indigo-500'}`}
                        key={index} onClick={() => setActiveTab(index)}>{tab.name}</li>
                    })}
                    </ul>
                </div>
            </div>
            <div>
                {activeTab === 0 && (
                    <div className='pb-7 mx-auto text-center px-sm-0 px-5'>
                        <div className="mt-7 flex rounded-xl w-80 border-2 border-slate-300 block ml-auto mr-auto">
                            <input type="text" name="category" value={categoryVal} onChange={(e) => setCategoryVal(e.target.value)} className="border-none rounded-xl outline-none px-3 py-1.5 w-72" placeholder="Enter Category"/>
                            <IoEnterOutline size={'2rem'} style={{ cursor: 'pointer',margin: '4px' }} onClick={addcategory}/>
                        </div>
                        <div className="w-6/12 flex items-center justify-center pt-16 ml-auto mr-auto">
                            <ul className="h-24">
                                {categoryArr.map((item, ids) => (
                                    <li value={item.categoryName} key={ids} className={`cursor-pointer inline-flex inline-block p-1 bg-gray-200 text-sm m-1.5 rounded-md ${editCategory._id === item._id ? 'border-solid border-2 border-indigo-500' : ''}`}>
                                        <span onClick={() => handleEditCategory(item)}>{item.categoryName}</span>
                                    <MdOutlineRemoveCircle onClick={() => handleRemoveCategory(item)} className="ml-1 mt-auto mb-auto cursor-pointer"/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {activeTab === 1 && (
                    <div className='pb-7 mx-auto text-center px-sm-0 px-5'>
                        <div className="mt-7 flex rounded-xl w-80 border-2 border-slate-300 block ml-auto mr-auto">
                            <input type="text" name="style" value={styleVal} onChange={(e) => setStyleVal(e.target.value)} className="border-none rounded-xl outline-none px-3 py-1.5 w-72" placeholder="Enter Style"/>
                            <IoEnterOutline size={'2rem'} style={{ cursor: 'pointer',margin: '4px' }} onClick={addStyle}/>
                        </div>
                        <div className="w-6/12 flex items-center justify-center pt-16 ml-auto mr-auto">
                            <ul className="h-24">
                                {styleArr.map((item, ids) => (
                                    <li value={item.styleName} key={ids} className={`cursor-pointer inline-flex inline-block p-1 bg-gray-200 text-sm m-1.5 rounded-md ${editCategory._id === item._id ? 'border-solid border-2 border-indigo-500' : ''}`}>
                                        <span onClick={() => handleEditStyle(item)}>{item.styleName}</span>
                                    <MdOutlineRemoveCircle onClick={() => handleRemoveStyle(item)} className="ml-1 mt-auto mb-auto cursor-pointer"/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {activeTab === 2 && (
                    <div>
                        <h2 className="text-xl font-bold">Tab 3 Content</h2>
                        <p>Here is the content of Tab 3. Customize this section with your own content.</p>
                    </div>
                )}
            </div>
        </div>
        <ToastContainer />
        </>
    );
}

export default Setting;