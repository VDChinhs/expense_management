import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// import { userReducer } from "./reducers/userReducer";
import walletReducer from "./reducers/walletReducer";
import groupReducer from "./reducers/groupReducer";
import budgetReducer from "./reducers/budgetReducer";
import tradeReducer from "./reducers/tradeReducer";

const rootReducer = combineReducers({
    walletReducer,
    groupReducer,
    tradeReducer,
    budgetReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
// store.subscribe(() => {console.log(store.getState())})
