import { createSlice } from "@reduxjs/toolkit";
import { myAllBudget } from "../actions/budgetAction";

const initialBudget = {
    _myBudget: [],
    isLoading: true,
    index: 0
};

const budgetSlice = createSlice({
    name: 'budget',
    initialState: initialBudget,
    reducers: {
        setIndexBudget: (state, action) => {
            state.index = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(myAllBudget.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(myAllBudget.fulfilled, (state, action) => {
                state._myBudget = action.payload.data
                state.isLoading = false
            })
            .addCase(myAllBudget.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const { setIndexBudget } = budgetSlice.actions

export default budgetReducer = budgetSlice.reducer



