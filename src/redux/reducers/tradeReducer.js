import { createSlice } from "@reduxjs/toolkit";
import { myTradeMMonth, myTradeMWeek, myTradeRecent, myTradeMonths, myTradeReports, myTradeReportDetailChi, myTradeReportDetailThu } from "../actions/tradeAction";

const initialTrade = {
    _tradeMostMonth: [],
    _tradeMostWeek: [],
    _tradeRecent: [],
    _tradeMonths: [],
    _tradeReport: [],
    _tradeReportDetailChi: [],
    _tradeReportDetailThu: [],
    isTradeCharHome: {},
    indexTradeMonths: 5,
    isLoadingTrade: true,
    isLoadingMMonth: true,
    isLoadingMWeek: true,
    isLoadingRecent: true,
    mes: ''
};

const tradeSlice = createSlice({
    name: 'trade',
    initialState: initialTrade,
    reducers: {
        setIndexTradeMonths: (state, action) => {
            state.indexTradeMonths = action.payload
        },
        setTradeCharHome: (state, action) => {
            state.isTradeCharHome = action.payload
        },
        resetTrade: (state) => {
            state = initialTrade
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(myTradeMMonth.pending, (state, action) => {
                state.isLoadingMMonth = true
            })
            .addCase(myTradeMMonth.fulfilled, (state, action) => {
                state._tradeMostMonth = action.payload.data
                state.isTradeCharHome = action.payload.data
                state.isLoadingMMonth = false
            })
            .addCase(myTradeMMonth.rejected, (state, action) => {
                state.isLoadingMMonth = false
            })


            .addCase(myTradeMWeek.pending, (state, action) => {
                state.isLoadingMWeek = true
            })
            .addCase(myTradeMWeek.fulfilled, (state, action) => {
                state._tradeMostWeek = action.payload.data
                state.isLoadingMWeek = false
            })
            .addCase(myTradeMWeek.rejected, (state, action) => {
                state.isLoadingMWeek = false
            })


            .addCase(myTradeRecent.pending, (state, action) => {
                state.isLoadingRecent = true
            })
            .addCase(myTradeRecent.fulfilled, (state, action) => {
                state._tradeRecent = action.payload.data
                state.isLoadingRecent = false
            })
            .addCase(myTradeRecent.rejected, (state, action) => {
                state.isLoadingRecent = false
            })


            .addCase(myTradeMonths.pending, (state, action) => {
                state.isLoadingTrade = true
            })
            .addCase(myTradeMonths.fulfilled, (state, action) => {
                state._tradeMonths = action.payload.data
                state.isLoadingTrade = false
            })
            .addCase(myTradeMonths.rejected, (state, action) => {
                state.isLoadingTrade = false
            })


            .addCase(myTradeReports.pending, (state, action) => {
                state.isLoadingTrade = true
            })
            .addCase(myTradeReports.fulfilled, (state, action) => {
                state._tradeReport = action.payload.data
                state.isLoadingTrade = false
            })
            .addCase(myTradeReports.rejected, (state, action) => {
                state.isLoadingTrade = false
            })


            .addCase(myTradeReportDetailChi.pending, (state, action) => {
                state.isLoadingTrade = true
            })
            .addCase(myTradeReportDetailChi.fulfilled, (state, action) => {
                state._tradeReportDetailChi = action.payload.data
                state.isLoadingTrade = false
            })
            .addCase(myTradeReportDetailChi.rejected, (state, action) => {
                state.isLoadingTrade = false
            })


            .addCase(myTradeReportDetailThu.pending, (state, action) => {
                state.isLoadingTrade = true
            })
            .addCase(myTradeReportDetailThu.fulfilled, (state, action) => {
                state._tradeReportDetailThu = action.payload.data
                state.isLoadingTrade = false
            })
            .addCase(myTradeReportDetailThu.rejected, (state, action) => {
                state.isLoadingTrade = false
            })
    }
})

export const { setIndexTradeMonths, setTradeCharHome, resetTrade } = tradeSlice.actions

export default tradeReducer = tradeSlice.reducer