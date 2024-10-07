import { createSlice } from '@reduxjs/toolkit';

const initialLoginState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const loginSlice = createSlice({
    name: 'user',
    initialState: initialLoginState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            // state.user = action.payload.user;  // 사용자 정보 저장
            state.token = action.payload.token;  // 토큰 저장
            localStorage.setItem('token', action.payload.token);
        },
        setUser(state, action) {
            state.user = action.payload;  // 사용자 정보 저장
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;  // 로그아웃 시 토큰도 제거
            // 토큰을 localStorage에서 삭제
            localStorage.removeItem('token');
        },
    },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;