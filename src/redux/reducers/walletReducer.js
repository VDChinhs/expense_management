import { createSlice } from "@reduxjs/toolkit";
import { myAllWallet, myWalletAdd, myWalletChange, myWalletDele } from "../actions/walletAction";

const initialWallet = {
    isCreating: false,
    isChangeing: false,
    isDeleting: false,
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

            .addCase(myWalletAdd.pending, (state, action) => {
                state.isCreating = true
            })
            .addCase(myWalletAdd.fulfilled, (state, action) => {
                state.isCreating = false
            })
            .addCase(myWalletAdd.rejected, (state, action) => {
                state.isCreating = false
            })

            .addCase(myWalletChange.pending, (state, action) => {
                state.isChangeing = true
            })
            .addCase(myWalletChange.fulfilled, (state, action) => {
                state.isChangeing = false
            })
            .addCase(myWalletChange.rejected, (state, action) => {
                state.isChangeing = false
            })

            .addCase(myWalletDele.pending, (state, action) => {
                state.isDeleting = true
            })
            .addCase(myWalletDele.fulfilled, (state, action) => {
                state.isDeleting = false
            })
            .addCase(myWalletDele.rejected, (state, action) => {
                state.isDeleting = false
            })
    }
})

export const { setMyWalleting, resetWallet } = walletSlice.actions

export default walletReducer = walletSlice.reducer
