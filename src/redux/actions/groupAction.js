import { myGroup, groupParent, allGroupThuChi, addGroup, changeGroup, deleGroup } from "../../process/GroupController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myGroupAdd = createAsyncThunk(
    'budget/myGroupAdd',
    async ({ token, name, image, type, parent, walletId }, { rejectWithValue }) => {
        try {
            let res = await addGroup(token, name, image, type, parent, walletId)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myGroupChange = createAsyncThunk(
    'budget/myGroupChange',
    async ({ token, id, name, image, parent, walletId }, { rejectWithValue }) => {
        try {
            let res = await changeGroup(token, id, name, image, parent, walletId)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myGroupDele = createAsyncThunk(
    'budget/myGroupDele',
    async ({ token, id }, { rejectWithValue }) => {
        try {
            let res = await deleGroup(token, id)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

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