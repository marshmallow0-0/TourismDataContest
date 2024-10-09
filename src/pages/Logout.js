import { redirect } from "react-router-dom";

export function logoutAction() {
    localStorage.removeItem('generalToken');
    localStorage.removeItem('kakaoToken');
    return redirect('/');
}