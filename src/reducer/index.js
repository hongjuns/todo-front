import { configureStore, combineReducers ,getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from 'redux-persist';
import authSlice from "./authSlice";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer : persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;