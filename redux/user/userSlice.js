import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:'',
    LoggedIn:false
}

export const user = createSlice({
    name:"user",
    initialState,
    reducers:{
        setCurrentUser : (state,action) =>{
            state.user=action.payload
            state.LoggedIn=true
        },
        removeCurrentUser: (state,action) => {
            state.user = '',
            state.LoggedIn = false
        },
       
       
    }
});

export const {setCurrentUser, removeCurrentUser,updateProfileImage} = user.actions;
export default user.reducer;