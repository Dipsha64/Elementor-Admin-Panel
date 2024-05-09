import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI , signOut } from "./AuthAPI";

const initialState = {
    userInfo: {},
    error: null,
    success: false,
}

export const loginAsync = createAsyncThunk('user/loginAPI',async(data)=>{
    const response = await loginAPI(data);
    return response.data;
})

export const signOutAsync = createAction('user/signOut',async(userId)=>{
    const response = await signOut(userId);
    return response.data;
})

export const authSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {

    },
    extraReducers : (builder) =>{
        builder 
        .addCase(loginAsync.pending,(state)=>{
            state.error = null;
            state.loading = true
        })
        .addCase(loginAsync.fulfilled,(state,action)=>{
            console.log("SLICE action...",action);
            state.userInfo = action.payload.data;
            state.error = false;
            state.success = true;
            state.loading = false;
        })
        .addCase(signOutAsync,(state)=>{
            Object.assign(state, initialState);
        })
    }
})

export const isAuthenticated = (state) => state.auth.userInfo;
export default authSlice.reducer;