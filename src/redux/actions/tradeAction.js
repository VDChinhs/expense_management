import { mostTradeMonth, mostTradeWeek, tradeRecent, tradeMonths, tradeReports, tradeReportDetail, addTrade, changeTrade, deleTrade } from "../../process/TradeController";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const myTradeAdd = createAsyncThunk(
    'trade/myTradeAdd',
    async ({ token, money, groupId, note, date, walletId }, { rejectWithValue }) => {
        try {
            let res = await addTrade(token, money, groupId, note, date, walletId)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myTradeChange = createAsyncThunk(
    'trade/myTradeChange',
    async ({ token, id, money, groupId, note, date, walletId }, { rejectWithValue }) => {
        try {
            let res = await changeTrade(token, id, money, groupId, note, date, walletId)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const myTradeDele = createAsyncThunk(
    'trade/myTradeDele',
    async ({ token, id }, { rejectWithValue }) => {
        try {
            let res = await deleTrade(token, id)
            if (res) {
                return res
            }
            return rejectWithValue(res.mes)
        } catch (error) {
            return rejectWithValue(error)
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
