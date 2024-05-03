import { myBudget } from "../../process/BudgetController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myAllBudget = createAsyncThunk(
    'budget/myAllBudget',
    async (userToken) => {
        try {
            let res = await myBudget(userToken)
            return res
        } catch (error) {
            return error
        }
    }
)

