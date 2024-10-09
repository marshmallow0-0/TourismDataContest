import { createSlice } from '@reduxjs/toolkit';

const initialLoginState = {
    isAuthenticated: false,
    user: null,
    generalToken: null,  // 일반 로그인 토큰
    kakaoToken: null,    // 카카오 로그인 토큰
};

const loginSlice = createSlice({
    name: 'user',
    initialState: initialLoginState,
    reducers: {
        loginWithGeneralToken(state, action) {
            state.isAuthenticated = true;
            state.generalToken = action.payload.token;  // 일반 로그인 토큰 저장
            localStorage.setItem('generalToken', action.payload.token);
        },
        loginWithKakaoToken(state, action) {
            state.isAuthenticated = true;
            state.kakaoToken = action.payload.token;  // 카카오 로그인 토큰 저장
            localStorage.setItem('kakaoToken', action.payload.token);
        },
        setUser(state, action) {
            state.user = action.payload;  // 사용자 정보 저장
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.generalToken = null;  // 일반 토큰 제거
            state.kakaoToken = null;  // 카카오 토큰 제거
            // 토큰을 localStorage에서 삭제
            localStorage.removeItem('generalToken');
            localStorage.removeItem('kakaoToken');
        },
    },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;