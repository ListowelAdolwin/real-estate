import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    errors: null,
    isLoading: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        registerStart: (state) => {
            state.isLoading = true
        },
        registerSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.isLoading = false
        },
        registerFailure: (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        }
    }
})


export const {registerStart, registerSuccess, registerFailure} = userSlice.actions

export default userSlice.reducer