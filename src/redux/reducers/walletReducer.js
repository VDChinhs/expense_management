import { createSlice } from "@reduxjs/toolkit";
import { myAllWallet } from "../actions/walletAction";

const initialWallet = {
    _myWallet: [],
    _isWalleting: {},
    isLoadingWallet: true
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialWallet,
    reducers: {
        setMyWalleting: (state, action) => {
            state._isWalleting = action.payload
        },
        resetWallet: (state) => {
            state = initialWallet
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(myAllWallet.pending, (state, action) => {
                state.isLoadingWallet = true
            })
            .addCase(myAllWallet.fulfilled, (state, action) => {
                state._myWallet = action.payload

                if (action.payload.length != 0 && state._isWalleting != {}) {
                    action.payload.map(value => {
                        if (value._id == state._isWalleting._id) {
                            state._isWalleting = value
                        }
                    })
                }
                state.isLoadingWallet = false
            })
            .addCase(myAllWallet.rejected, (state, action) => {
                state.isLoadingWallet = false
            })
    }
})

export const { setMyWalleting, resetWallet } = walletSlice.actions

export default walletReducer = walletSlice.reducer
