import { myWallet, addWallet, changeWallet, deleWallet } from "../../process/WalletController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myWalletAdd = createAsyncThunk(
    'wallet/myWalletAdd',
    async ({ token, name, money, image }, { rejectWithValue }) => {
        try {
            const res = await addWallet(token, name, money, image)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myWalletChange = createAsyncThunk(
    'wallet/myWalletChange',
    async ({ token, id, name, image }, { rejectWithValue }) => {
        try {
            const res = await changeWallet(token, id, name, image)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myWalletDele = createAsyncThunk(
    'wallet/myWalletDele',
    async ({ token, id, }, { rejectWithValue }) => {
        try {
            const res = await deleWallet(token, id)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
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


