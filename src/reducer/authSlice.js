
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogined :false,
    user : null
}

const authSlice = createSlice ({
    name : 'authUser',
    initialState,
    reducers : {
        setUserToken : (state, action ) => {
            let objectData = {
                id : action.payload.email,
                token : action.payload.token
            }
            state.user = objectData;
            state.isLogined = true
        },
        delUserToken : (state ) => {
            state.user = null;
            state.isLogined = false;
        }
    }
})

export const { setUserToken , delUserToken  } = authSlice.actions;
export default authSlice.reducer;
