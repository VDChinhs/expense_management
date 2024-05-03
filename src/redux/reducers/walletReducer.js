import { createSlice } from "@reduxjs/toolkit";
import { myAllWallet } from "../actions/walletAction";

const initialWallet = {
    _myWallet: [],
    _isWalleting: {},
    isLoading: true
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialWallet,
    reducers: {
        setMyWalleting: (state, action) => {
            state._isWalleting = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(myAllWallet.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(myAllWallet.fulfilled, (state, action) => {
                state._myWallet = action.payload
                state.isLoading = false
            })
            .addCase(myAllWallet.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const { setMyWalleting } = walletSlice.actions

export default walletReducer = walletSlice.reducer
