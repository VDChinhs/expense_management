import { myBudget, addBudget, changeBudget, deleBudget } from "../../process/BudgetController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myBudgetAdd = createAsyncThunk(
    'budget/myBudgetAdd',
    async ({token, money, groupId, startDate, endDate, walletId}) => {
        try {
            const res = await addBudget(token, money, groupId, startDate, endDate, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myBudgetChange = createAsyncThunk(
    'budget/myBudgetChange',
    async ({token, id, money, groupId, startDate, endDate, walletId}) => {
        try {
            const res = await changeBudget(token, id, money, groupId, startDate, endDate, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myBudgetDele = createAsyncThunk(
    'budget/myBudgetDele',
    async ({token, id}) => {
        try {
            const res = await deleBudget(token, id)
            return res
        } catch (error) {
            return error
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

