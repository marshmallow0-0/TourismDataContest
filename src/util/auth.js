import { redirect } from "react-router-dom";
import store from "../store/store";

// 로컬 스토리지에서 유효한 토큰을 가져오는 함수
export function getAuthToken() {
    const generalToken = localStorage.getItem('generalToken');
    const kakaoToken = localStorage.getItem('kakaoToken');

    // 유효한 토큰이 있는지 확인하고 반환
    return generalToken || kakaoToken;  // 하나의 토큰만 반환
}

// 토큰을 loader에서 반환하는 함수
export function tokenLoader() {
    const token = getAuthToken();
    return token;  // 유효한 토큰을 반환
}

// 인증을 확인하는 loader
export function checkAuthLoader() {
    const state = store.getState();  // Redux 스토어 상태를 가져옴
    const isAuthenticated = state.login.isAuthenticated;  // 로그인 여부 확인
    const token = getAuthToken();  // 하나의 토큰 가져오기

    // 유효한 토큰이 없으면 인증 페이지로 리다이렉트
    if (!token) {
        return redirect("/auth");  // 인증되지 않았으면 로그인 페이지로 리다이렉트
    }

    // 인증된 경우, null 반환
    return null;
}