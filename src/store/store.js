import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imageSlice';
import loginReducer from './loginSlice';
import checkboxReducer from './checkboxSlice';
const store = configureStore({
    reducer: {
        login: loginReducer,
        image: imageReducer,
        checkbox: checkboxReducer,
    },
});

export default store;