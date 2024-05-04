import { myWallet } from "../../process/WalletController";
import { createAsyncThunk } from "@reduxjs/toolkit";

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


