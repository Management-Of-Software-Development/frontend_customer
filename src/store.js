import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/slices/cartSlice";
import userReducer from "./redux/slices/userSlice";
import { combineReducers } from "redux";
import { api } from "./api";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
	cart: cartReducer,
	user: userReducer,
	[api.reducerPath]: api.reducer,
});

const rootReducer = (state, action) => {
	if (action.type === "user/logout") {
		window.localStorage.removeItem("persist: root");
		state = {};
	}
	return appReducer(state, action);
};

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: [api.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(api.middleware),
	devTools: process.env.NODE_ENV !== "production",
});

export let persistor = persistStore(store);

export default store;
