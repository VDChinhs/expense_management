import { myBudget, addBudget, changeBudget, deleBudget } from "../../process/BudgetController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myBudgetAdd = createAsyncThunk(
    'budget/myBudgetAdd',
    async ({ token, money, groupId, startDate, endDate, walletId }, { rejectWithValue }) => {
        try {
            let res = await addBudget(token, money, groupId, startDate, endDate, walletId)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myBudgetChange = createAsyncThunk(
    'budget/myBudgetChange',
    async ({ token, id, money, groupId, startDate, endDate, walletId }) => {
        try {
            let res = await changeBudget(token, id, money, groupId, startDate, endDate, walletId)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myBudgetDele = createAsyncThunk(
    'budget/myBudgetDele',
    async ({ token, id }) => {
        try {
            let res = await deleBudget(token, id)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myAllBudget = createAsyncThunk(
    'budget/myAllBudget',
    async (userToken) => {
        try {
            const res = await myBudget(userToken)
            return res
        } catch (error) {
            return error
        }
    }
)

