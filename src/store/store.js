import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import imageReducer from './imageSlice';
import loginReducer from './loginSlice';
import checkboxReducer from './checkboxSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    login: loginReducer,
    image: imageReducer,
    checkbox: checkboxReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;