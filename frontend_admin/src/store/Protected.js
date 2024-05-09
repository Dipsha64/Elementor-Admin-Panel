import React from "react";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../features/Auth/AuthSlice";
import { Navigate } from "react-router-dom";

function Protected({children}){
    const user = useSelector(isAuthenticated);
    console.log("user.. Protected",user);
    if(Object.keys(user).length <= 0){
        <Navigate to={"/adminLogin"}></Navigate>
    }
    if(Object.keys(user).length> 0){
        return children;
    }
    return ( children );
}

export default Protected;