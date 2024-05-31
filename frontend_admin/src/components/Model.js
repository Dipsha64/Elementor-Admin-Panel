import React, {useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { addNewKitRoute, getAllKitRoute } from "../utils/APIRoutes";
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ show, handleClose, onItemSelected }) => {
    const [ kitSection, setKitSection ] = useState(false);
    const { register,handleSubmit, formState: { errors }} = useForm();
    const [kitItems, setKitItems] = useState([]);

    useEffect(()=>{
      if(show){
        setKitSection(false);
        axios.get(getAllKitRoute).then((res)=>{
          if(res.data.status){
            setKitItems(res.data.data);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    },[show]);

    const handleKitSection = () => {
        if(!kitSection){
            setKitSection(true);
        }   
        else{
            setKitSection(false);
        }
    }

    const handleCreateKit = (data) =>{
        axios.post(addNewKitRoute,data).then((res)=>{
          handleClose();
        }).catch((error)=>{
          console.log(error);
        })
    }

    const handleItemClick = (item) => {
      onItemSelected(item);
      handleClose();
    };

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2">
            <div className="flex justify-end">
            <RxCross2 onClick={handleClose}/>
            </div>
            <div className="p-4">
            <div className={`${kitSection ? 'flex' : ''}`}>
                {kitSection ? 
                <div className="pr-3.5 border pl-1.5 border-r-1 border-t-0 border-b-0 border-l-0 border-slate-200">
                    <form noValidate onSubmit={handleSubmit(handleCreateKit)}>
                        <h1 className="text-xl font-bold">Create Kit</h1>
                        <div className="mt-4">
                            <span className="ml-auto mr-auto">Kit Name</span>
                            <div className="rounded-lg w-48 border-2 border-indigo-500 block ml-auto mr-auto flex justify-center">
                                <input type="text" name="kitName" className="border-none outline-none py-1 w-40" placeholder="Enter Kit Name"
                                {...register("kitName",{ required : "The Kit Name is required."})}/>
                            </div>
                            <span className="text-red-500">
                                {errors.kitName && <span>{errors.kitName.message}</span>}
                            </span>
                        </div>
                        <div className="my-3 flex justify-center pt-2">
                            <button className="bg-indigo-500 w-48 border-solid cursor-pointer rounded-lg text-white text-xl p-1 ">Create</button>
                        </div>
                    </form>
                </div>
                : '' }
                <div className="w-full pl-4">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold mb-4">My Icon Kits</h2>
                        <input className="border border-solid border-gray-400 p-2 rounded-md" type="text" name="searchKit" placeholder="Search Kit name"/>
                    </div>
                    <div className={`${kitSection ? 'grid grid-cols-3 gap-3' : 'grid grid-cols-4 gap-4'}`}>
                      { kitItems.map((items)=>{
                        return (
                          <div className='shadow-xl shadow-slate-300 min-h-32 p-2.5 text-center flex flex-col' onClick={() => handleItemClick(items)}>
                            <MdOutlineDeleteOutline />
                            {/* <div className='text-center flex flex-col'> */}
                              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="package"><path fill="#1689fc" d="M12 24c-.4 0-.7-.1-1.1-.2l-7.1-3.3c-.5-.3-.8-.8-.8-1.4v-6.8l1 .5v6.3c0 .2.1.4.3.5l7.1 3.3c.4.2.9.2 1.3 0l7.1-3.3c.2-.1.3-.3.3-.5v-6.3l1-.5v6.8c0 .6-.3 1.1-.9 1.4l-7.1 3.3c-.4.1-.7.2-1.1.2z"></path><path fill="#3e5959" d="M6.5 19.2h-.2l-.4-.2c-.6-.3-.9-.8-.9-1.4v-1.1c0-.3.2-.5.5-.5s.5.2.5.5v1.1c0 .2.1.4.3.5l.4.2c.3 0 .4.3.3.6-.1.2-.3.3-.5.3zm7-11.2h-3c-.3 0-.5-.2-.5-.5V5H8.5c-.2 0-.4-.1-.5-.3s0-.4.1-.5l3.5-4c.2-.2.6-.2.8 0l3.5 4c.1.1.1.3.1.5s-.3.3-.5.3H14v2.5c0 .3-.2.5-.5.5zM11 7h2V4.5c0-.3.2-.5.5-.5h.9L12 1.3 9.6 4h.9c.3 0 .5.2.5.5V7z"></path><path fill="#3e5959" d="M22.9 11 21 7.2l-.9.5 1.9 3.8-7 3.5-2.6-3.8h-.8L9 15l-7-3.5 1.9-3.8-.8-.4-2 3.7c-.1.2-.1.3-.1.5 0 .4.2.7.6.9l7 3.5c.1.1.2.1.4.1.3 0 .6-.2.8-.4l2.2-3.2 2.2 3.2c.2.3.5.4.8.4.2 0 .3 0 .4-.1l7-3.5c.3-.2.6-.5.6-.9 0-.2 0-.3-.1-.5z"></path><circle cx="8.5" cy="19.6" r=".5" fill="#3e5959"></circle><path fill="#1689fc" d="m20.7 7-3-1.4c-.3-.1-.5 0-.7.2-.1.2 0 .5.2.7l2.1 1-7.3 3.4-7.3-3.4 2.1-1c.2-.1.3-.4.2-.6-.1-.3-.4-.4-.7-.3L3.3 7c-.2.1-.3.3-.3.5s.1.4.3.5l8.2 3.9v11.7h1V11.8L20.7 8c.2-.1.3-.3.3-.5s-.1-.4-.3-.5z"></path></svg> */}
                              <span className='text-lg font-semibold'>{items.kitName}</span>
                              <span className='text-lg font-semibold'>{items.kitItemCount}</span>
                            {/* </div> */}
                          </div>
                        )
                      })}
                    </div>
                </div>
            </div>
            <div className="flex justify-between my-6">
                <button className="border-2 border-indigo-500 w-28 border-solid cursor-pointer rounded-lg text-xl" onClick={handleKitSection}>New Kit</button>
                <button className="bg-indigo-500 w-28 border-solid cursor-pointer rounded-lg text-white text-xl p-1.5">Continue</button>
            </div>
              {/* {children} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;