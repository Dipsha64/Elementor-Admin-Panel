import { loginRoute } from "../../utils/APIRoutes";
import axios from "axios";

export function loginAPI (data) {
    return new Promise(async(resolve)=>{
        const result = await axios.post(loginRoute,data);
        resolve(result);
    })
}

export function signOut() {
    return new Promise(async(resolve,reject)=>{
        try{
            resolve({data : 'Successfully Logout'});
        }
        catch(error){
            reject(error);
        }
    })
}