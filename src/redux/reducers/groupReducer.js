import { createSlice } from "@reduxjs/toolkit";
import { myAllGroupChi, myAllGroupThu, myAllGroupParentChi, myAllGroupParentThu } from "../actions/groupAction";

const initialGroup = {
    _myGroupChi: [],
    _myGroupThu: [],
    _myGroupParentChi: [],
    _myGroupParentThu: [],
    isLoadingChi: true,
    isLoadingThu: true,
};

const groupSlice = createSlice({
    name: 'group',
    initialState: initialGroup,
    reducers: {
        resetGroup: (state) => {
            state = initialGroup
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(myAllGroupChi.pending, (state, action) => {
                state.isLoadingChi = true
            })
            .addCase(myAllGroupChi.fulfilled, (state, action) => {
                state._myGroupChi = action.payload
                state.isLoadingChi = false
            })
            .addCase(myAllGroupChi.rejected, (state, action) => {
                state.isLoadingChi = false
            })

            
            .addCase(myAllGroupThu.pending, (state, action) => {
                state.isLoadingThu = true
            })
            .addCase(myAllGroupThu.fulfilled, (state, action) => {
                state._myGroupThu = action.payload
                state.isLoadingThu = false
            })
            .addCase(myAllGroupThu.rejected, (state, action) => {
                state.isLoadingThu = false
            })


            .addCase(myAllGroupParentChi.pending, (state, action) => {
                state.isLoadingChi = true
            })
            .addCase(myAllGroupParentChi.fulfilled, (state, action) => {
                state._myGroupParentChi = action.payload
                state.isLoadingChi = false
            })
            .addCase(myAllGroupParentChi.rejected, (state, action) => {
                state.isLoadingChi = false
            })


            .addCase(myAllGroupParentThu.pending, (state, action) => {
                state.isLoadingThu = true
            })
            .addCase(myAllGroupParentThu.fulfilled, (state, action) => {
                state._myGroupParentThu = action.payload
                state.isLoadingThu = false
            })
            .addCase(myAllGroupParentThu.rejected, (state, action) => {
                state.isLoadingThu = false
            })
    }
})

export const { resetGroup } = groupSlice.actions

export default groupReducer = groupSlice.reducer