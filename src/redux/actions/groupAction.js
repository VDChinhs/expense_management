import { myGroup, groupParent, allGroupThuChi } from "../../process/GroupController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myAllGroupChi = createAsyncThunk(
    'group/myAllGroupChi',
    async ({ userToken, walletId }) => {
        try {
            let res = await myGroup(userToken, 0, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myAllGroupThu = createAsyncThunk(
    'group/myAllGroupThu',
    async ({ userToken, walletId }) => {
        try {
            let res = await myGroup(userToken, 1, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myAllGroupParentChi = createAsyncThunk(
    'group/myAllGroupParentChi',
    async ({ userToken, walletId }) => {
        try {
            let res = await groupParent(userToken, 0, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myAllGroupParentThu = createAsyncThunk(
    'group/myAllGroupParentThu',
    async ({ userToken, walletId }) => {
        try {
            let res = await groupParent(userToken, 1, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myAllGroupThuChi = createAsyncThunk(
    'group/myAllGroupThuChi',
    async ({ userToken, walletId }) => {
        try {
            let res = await allGroupThuChi(userToken, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)