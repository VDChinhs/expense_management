import { createSlice } from "@reduxjs/toolkit";
import { myLogin } from "../actions/userAction";
import { removeTokenStorage } from "../../helpers/storage";

const initialUser = {
    myData: {},
    userToken: null,
    mes: '',
    isLoging: false,
    isCreating: false,
    isDeleting: false,
    isChanging: false
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        myLogout: (state, action) => {
            removeTokenStorage()
            state.userToken = null
        },
        resetUser: (state) => {
            state = initialUser
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(myLogin.pending, (state, action) => {
                state.isLoging = true
            })
            .addCase(myLogin.fulfilled, (state, action) => {
                state.myData = action.payload.data
                state.userToken = action.payload.token
                state.isLoging = false
            })
            .addCase(myLogin.rejected, (state, action) => {
                state.isLoging = false
            })
    }
})

export const { myLogout, resetUser } = userSlice.actions

export default userReducer = userSlice.reducer