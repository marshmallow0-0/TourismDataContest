import { redirect } from "react-router-dom";
import store from "../store/store";

// 로컬 스토리지에서 토큰을 가져오는 함수
export function getAuthToken() {
    const token = localStorage.getItem('token');
    return token;
}

// 토큰을 loader에서 반환하는 함수
export function tokenLoader() {
    return getAuthToken();
}

// 인증을 확인하는 loader
export function checkAuthLoader() {
    const state = store.getState();  // Redux 스토어 상태를 가져옴
    const isAuthenticated = state.login.isAuthenticated;  // 로그인 여부 확인

    // 토큰이 없으면 인증 페이지로 리다이렉트
    if (!isAuthenticated) {
        return redirect("/auth");  // 인증되지 않았으면 로그인 페이지로 리다이렉트
    }

    // 토큰이 있으면 null 반환
    return null;
}