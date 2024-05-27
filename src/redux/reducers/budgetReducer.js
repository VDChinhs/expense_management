import { createSlice } from "@reduxjs/toolkit";
import { myAllBudget, myBudgetAdd, myBudgetChange, myBudgetDele } from "../actions/budgetAction";

const initialBudget = {
    isCreating: false,
    isChangeing: false,
    isDeleting: false,
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
        },
        resetBudget: (state) => {
            state = initialBudget
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(myBudgetAdd.pending, (state, action) => {
                state.isCreating = true
            })
            .addCase(myBudgetAdd.fulfilled, (state, action) => {
                state.isCreating = false
            })
            .addCase(myBudgetAdd.rejected, (state, action) => {
                state.isCreating = false
            })

            .addCase(myBudgetChange.pending, (state, action) => {
                state.isChangeing = true
            })
            .addCase(myBudgetChange.fulfilled, (state, action) => {
                state.isChangeing = false
            })
            .addCase(myBudgetChange.rejected, (state, action) => {
                state.isChangeing = false
            })

            .addCase(myBudgetDele.pending, (state, action) => {
                state.isDeleting = true
            })
            .addCase(myBudgetDele.fulfilled, (state, action) => {
                state.isDeleting = false
            })
            .addCase(myBudgetDele.rejected, (state, action) => {
                state.isDeleting = false
            })

            .addCase(myAllBudget.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(myAllBudget.fulfilled, (state, action) => {
                state.index = 0
                state._myBudget = action.payload.data
                state.isLoading = false
            })
            .addCase(myAllBudget.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const { setIndexBudget, resetBudget } = budgetSlice.actions

export default budgetReducer = budgetSlice.reducer



