import React, { useState } from 'react';
import { IoEnterOutline } from "react-icons/io5";
import axios from 'axios';
import { getCategory,createCategory,updateCategory,deleteCategory } from "../utils/APIRoutes";

function Setting() {
    const [activeTab, setActiveTab] = useState(0);
    const [categoryVal, setCategoryVal ] = useState("");

    const tabs = [
        { name: 'Category'},
        { name: 'Style'},
        { name: 'Profile'},
    ];

    const addcategory = () => {
        axios.post(createCategory,{categoryVal : categoryVal}).then((result)=>{
            console.log("result..",result);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return ( 
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
                            <input type="email" name="email" value={categoryVal} onChange={(e) => setCategoryVal(e.target.value)} className="border-none rounded-xl outline-none px-3 py-1.5 w-72" placeholder="Enter Email"/>
                            <IoEnterOutline size={'2rem'} style={{ cursor: 'pointer',margin: '4px' }} onClick={addcategory}/>
                        </div>
                    </div>
                )}
                {activeTab === 1 && (
                    <div>
                        <h2 className="text-xl font-bold">Tab 2 Content</h2>
                        <p>This is the content of Tab 2. Feel free to add more details as needed.</p>
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
    );
}

export default Setting;