import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {},
    accessToken: null,
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
            console.log('Data from google: ', action.payload)
            state.currentUser = action.payload.user,
            state.accessToken = action.payload.accessToken,
            state.isLoading = false
        },
        registerFailure: (state, action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        updateUser: (state, action) => {
            state.currentUser = action.payload
        },
        deleteUser: (state, action) => {
            state.currentUser = null
        },
        logoutUser: (state, action) => {
            state.currentUser = null
            state.accessToken = null
        }
    }
})


export const { registerStart, registerSuccess, registerFailure, updateUser, deleteUser, logoutUser } =
  userSlice.actions;

export default userSlice.reducer