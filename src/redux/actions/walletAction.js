import { myWallet, addWallet, changeWallet, deleWallet } from "../../process/WalletController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myWalletAdd = createAsyncThunk(
    'wallet/myWalletAdd',
    async ({ token, name, money, image, dispatch }) => {
        try {
            const res = await addWallet(token, name, money, image)
            dispatch(myAllWallet(token))
            return res
        } catch (error) {
            return error
        }
    }
)

export const myWalletChange = createAsyncThunk(
    'wallet/myWalletChange',
    async ({ token, id, name, image, dispatch }) => {
        try {
            const res = await changeWallet(token, id, name, image)
            dispatch(myAllWallet(token))
            return res
        } catch (error) {
            return error
        }
    }
)

export const myWalletDele = createAsyncThunk(
    'wallet/myWalletDele',
    async ({ token, id, dispatch }) => {
        try {
            const res = await deleWallet(token, id)
            dispatch(myAllWallet(token))
            return res
        } catch (error) {
            return error
        }
    }
)

export const myAllWallet = createAsyncThunk(
    'wallet/myAllWallet',
    async (userToken) => {
        try {
            const res = await myWallet(userToken)
            return res
        } catch (error) {
            return error
        }
    }
)


