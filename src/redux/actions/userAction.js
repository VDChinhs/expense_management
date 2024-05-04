import { setTokenStorage } from "../../helpers/storage";
import { doLogin } from "../../process/LoginSign";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myLogin = createAsyncThunk(
    'user/loginUser',
    async ({ username, password }) => {
        try {
            const res = await doLogin(username, password)
            await setTokenStorage(res.token)
            return res
        } catch (error) {
            return error
        }
    }
)
