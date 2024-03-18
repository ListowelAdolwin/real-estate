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
        },
        updateUser: (state, action) => {
            state.currentUser = action.payload
        },
        deleteUser: (state, action) => {
            state.currentUser = null
        },
        logoutUser: (state, action) => {
            state.currentUser = null
        }
    }
})


export const { registerStart, registerSuccess, registerFailure, updateUser, deleteUser, logoutUser } =
  userSlice.actions;

export default userSlice.reducer