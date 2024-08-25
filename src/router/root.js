import { Suspense, lazy } from "react";
import SearchFailPage from "../pages/SearchFailPage";
import LicensePage from "../pages/LicensePage";
import Login from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage.jsx";
import Redirection from "../pages/Redirection.jsx";
import SupportPage from "../pages/SupportPage/SupportPage.jsx";
import SupportFAQPage from "../pages/SupportPage/SupportFAQPage.jsx";

const { createBrowserRouter } = require("react-router-dom");

//TODO 
//현재 로딩화면이 div Loading 으로 단순 구성되어있으므로 수정화면을 별도로 만들어야 한다
const Loading = <div>Loading....</div>; // Loading을 JSX 요소로 정의
const Main = lazy(() => import("../pages/MainPage/MainPage.jsx"));
const How = lazy(() => import("../pages/HowToUsePage"));
const Who = lazy(() => import("../pages/WhoWeArePage"));
const MyProfile = lazy(() => import("../pages/MyProfilePage/MyProfilePage.jsx"));
const Search = lazy(() => import("../pages/SearchPage/SearchPage.jsx"));

const root = createBrowserRouter([
    {
        path: "/",
        //element: <Suspense fallback={Loading}></Suspense>, // Loading 변수를 직접/ 전달/
        children: [
            {
                index: true,
                element: <Suspense fallback={Loading}><Main /></Suspense> // Main은 이제 "/main" 경로에서 렌더링
            },
            {
                path: "search",
                element: <Suspense fallback={Loading}><Search /></Suspense>
            },
            {
                path: "how",
                element: <How />
            },
            {
                path: "who",
                element: <Suspense fallback={Loading}><Who /></Suspense>
            },
            {
                path: "fail",
                element: <Suspense fallback={Loading}><SearchFailPage /></Suspense>
            },
            {
                path: "license",
                element: <Suspense fallback={Loading}><LicensePage /></Suspense>
            },
            {
                path: "myprofile",
                element: <Suspense fallback={Loading}><MyProfile /></Suspense>
            },
            {
                path: "login",
                element: <Suspense fallback={Loading}><Login /></Suspense>
            },
            {
                path: "kakao/callback",
                element: <Suspense fallback={Loading}><Redirection /></Suspense>
            },
            {
                path: "signup",
                element: <Suspense fallback={Loading}><SignUpPage /></Suspense>
            },
            {
                path: "support",
                element: <Suspense fallback={Loading}><SupportPage /></Suspense>
            },
            {
                path: "support/faq",
                element: <Suspense fallback={Loading}><SupportFAQPage /></Suspense>
            },
        ],
    },
]);

export default root;
