import { loginRoute } from "../../utils/APIRoutes";
import axios from "axios";

export function loginAPI (data) {
    return new Promise(async(resolve)=>{
        const result = await axios.post(loginRoute,data);
        resolve(result);
    })
}