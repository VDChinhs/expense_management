import { createSlice } from "@reduxjs/toolkit";
import { myAllGroupChi, myAllGroupThu, myAllGroupParentChi, myAllGroupParentThu, myAllGroupThuChi, myGroupAdd, myGroupChange, myGroupDele } from "../actions/groupAction";

const initialGroup = {
    isCreating: false,
    isChangeing: false,
    isDeleting: false,
    _myGroupChi: [],
    _myGroupThu: [],
    _myGroupParentChi: [],
    _myGroupParentThu: [],
    _myAllGroupThuChi: [],
    isLoadingChi: true,
    isLoadingThu: true,
    isLoading: true
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
            .addCase(myGroupAdd.pending, (state, action) => {
                state.isCreating = true
            })
            .addCase(myGroupAdd.fulfilled, (state, action) => {
                state.isCreating = false
            })
            .addCase(myGroupAdd.rejected, (state, action) => {
                state.isCreating = false
            })

            .addCase(myGroupChange.pending, (state, action) => {
                state.isChangeing = true
            })
            .addCase(myGroupChange.fulfilled, (state, action) => {
                state.isChangeing = false
            })
            .addCase(myGroupChange.rejected, (state, action) => {
                state.isChangeing = false
            })

            .addCase(myGroupDele.pending, (state, action) => {
                state.isDeleting = true
            })
            .addCase(myGroupDele.fulfilled, (state, action) => {
                state.isDeleting = false
            })
            .addCase(myGroupDele.rejected, (state, action) => {
                state.isDeleting = false
            })

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

            .addCase(myAllGroupThuChi.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(myAllGroupThuChi.fulfilled, (state, action) => {
                state._myAllGroupThuChi = action.payload
                state.isLoading = false
            })
            .addCase(myAllGroupThuChi.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const { resetGroup } = groupSlice.actions

export default groupReducer = groupSlice.reducer