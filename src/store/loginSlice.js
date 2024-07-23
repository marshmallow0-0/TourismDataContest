import { createSlice } from '@reduxjs/toolkit';

const initialLoginState = {
    isAuthenticated: false,
    user: null,
};

const loginSlice = createSlice({
    name: 'user',
    initialState: initialLoginState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;