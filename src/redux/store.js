import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./slice/cryptoslice";
import themeReducer from "./slice/themeslice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Configuration for persisting the crypto slice data in local storage
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["crypto", "theme"],
};

// Combine reducers and apply persistence settings to the crypto reducer
const rootReducer = combineReducers({
	crypto: cryptoReducer,
	theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer and disable the serializable check
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// Export the persistor to persist store state and store
export const persistor = persistStore(store);
export default store;
