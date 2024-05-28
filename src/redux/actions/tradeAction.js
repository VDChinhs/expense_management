import { mostTradeMonth, mostTradeWeek, tradeRecent, tradeMonths, tradeReports, tradeReportDetail, addTrade, changeTrade, deleTrade } from "../../process/TradeController";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAllBudget } from "./budgetAction";
import { myAllWallet } from "./walletAction";

export const myTradeAdd = createAsyncThunk(
    'trade/myTradeAdd',
    async ({ token, money, groupId, note, date, walletId, dispatch }) => {
        try {
            let res = await addTrade(token, money, groupId, note, date, walletId)
            dispatch(myAllWallet(token))
            dispatch(myAllBudget(token))
            
            dispatch(myTradeMMonth(token))
            dispatch(myTradeMWeek(token))
            dispatch(myTradeRecent(token))
            dispatch(myTradeMonths({ userToken: token, walletId: walletId }))
            dispatch(myTradeReports({ userToken: token, walletId: walletId }))
            dispatch(myTradeReportDetailChi({ userToken: token, walletId: walletId }))
            dispatch(myTradeReportDetailThu({ userToken: token, walletId: walletId }))
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeChange = createAsyncThunk(
    'trade/myTradeChange',
    async ({ token, id, money, groupId, note, date, walletId, dispatch }) => {
        try {
            let res = await changeTrade(token, id, money, groupId, note, date, walletId)
            dispatch(myAllWallet(token))
            dispatch(myAllBudget(token))
            
            dispatch(myTradeMMonth(token))
            dispatch(myTradeMWeek(token))
            dispatch(myTradeRecent(token))
            dispatch(myTradeMonths({ userToken: token, walletId: walletId }))
            dispatch(myTradeReports({ userToken: token, walletId: walletId }))
            dispatch(myTradeReportDetailChi({ userToken: token, walletId: walletId }))
            dispatch(myTradeReportDetailThu({ userToken: token, walletId: walletId }))
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeDele = createAsyncThunk(
    'trade/myTradeDele',
    async ({ token, id , walletId, dispatch}) => {
        try {
            let res = await deleTrade(token, id)
            dispatch(myAllWallet(token))
            dispatch(myAllBudget(token))
            
            dispatch(myTradeMMonth(token))
            dispatch(myTradeMWeek(token))
            dispatch(myTradeRecent(token))
            dispatch(myTradeMonths({ userToken: token, walletId: walletId }))
            dispatch(myTradeReports({ userToken: token, walletId: walletId }))
            dispatch(myTradeReportDetailChi({ userToken: token, walletId: walletId }))
            dispatch(myTradeReportDetailThu({ userToken: token, walletId: walletId }))
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeMMonth = createAsyncThunk(
    'trade/myTradeMMonth',
    async (userToken) => {
        try {
            let res = await mostTradeMonth(userToken, ((new Date).getMonth() + 1))
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeMWeek = createAsyncThunk(
    'trade/myTradeMWeek',
    async (userToken) => {
        try {
            let res = await mostTradeWeek(userToken)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeRecent = createAsyncThunk(
    'trade/tradeRecent',
    async (userToken) => {
        try {
            let res = await tradeRecent(userToken)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeMonths = createAsyncThunk(
    'trade/myTradeMonths',
    async ({ userToken, walletId }) => {
        try {
            let res = await tradeMonths(userToken, 5, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeReports = createAsyncThunk(
    'trade/tradeReports',
    async ({ userToken, walletId }) => {
        try {
            let res = await tradeReports(userToken, 5, walletId)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeReportDetailChi = createAsyncThunk(
    'trade/myTradeReportDetailChi',
    async ({ userToken, walletId }) => {
        try {
            let res = await tradeReportDetail(userToken, 5, walletId, 0)
            return res
        } catch (error) {
            return error
        }
    }
)

export const myTradeReportDetailThu = createAsyncThunk(
    'trade/myTradeReportDetailThu',
    async ({ userToken, walletId }) => {
        try {
            let res = await tradeReportDetail(userToken, 5, walletId, 1)
            return res
        } catch (error) {
            return error
        }
    }
)
