import { Suspense, lazy } from "react";
import SearchFailPage from "../pages/SearchPage/SearchFailPage.jsx";
import LicensePage from "../pages/LicensePage";
import SignUpPage from "../pages/SignUpPage/SignUpPage.jsx";
// import Redirection from "../pages/dev/Redirection.jsx";
// import SupportPage from "../pages/SupportPage/SupportPage.jsx";
// import SupportFAQPage from "../pages/SupportPage/SupportFAQPage.jsx";
import MyTravelRecordsForm from "../pages/TravelPage/TravelPage.jsx";
import RootLayout from "../layouts/RootLayout.js";
import { checkAuthLoader, tokenLoader } from "../util/auth.js";

import AuthenticationPage, { action } from "../pages/SignUpPage/Authentication.js";
import { logoutAction } from "../pages/Logout.js";

const { createBrowserRouter } = require("react-router-dom");

//TODO 
//현재 로딩화면이 div Loading 으로 단순 구성되어있으므로 수정화면을 별도로 만들어야 한다
const Loading = <div>Loading....</div>; // Loading을 JSX 요소로 정의
const Main = lazy(() => import("../pages/MainPage/MainPage.jsx"));
const MyProfile = lazy(() => import("../pages/MyProfilePage/MyProfilePage.jsx"));
const Search = lazy(() => import("../pages/SearchPage/SearchPage.jsx"));

const root = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        id: 'root',
        loader: tokenLoader,
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
                path: "fail",
                element: <Suspense fallback={Loading}><SearchFailPage /></Suspense>
            },
            {
                path: "license",
                element: <Suspense fallback={Loading}><LicensePage /></Suspense>
            },
            {
                path: "myprofile",
                element: <Suspense fallback={Loading}><MyProfile /></Suspense>,
                // WARNING 해제해야함
                // loader: checkAuthLoader 
            },
            // {
            //     path: "login",
            //     element: <Suspense fallback={Loading}><Login /></Suspense>
            // },
            {
                path: 'auth',
                element: <AuthenticationPage />,
                action: action,
            },
            {
                path: 'logout',
                action: logoutAction,
            },
            // {
            //     path: "kakao/callback",
            //     element: <Suspense fallback={Loading}><Redirection /></Suspense>
            // },
            {
                path: "signup",
                element: <Suspense fallback={Loading}><SignUpPage /></Suspense>
            },
            // {
            //     path: "support",
            //     element: <Suspense fallback={Loading}><SupportPage /></Suspense>
            // },
            // {
            //     path: "support/faq",
            //     element: <Suspense fallback={Loading}><SupportFAQPage /></Suspense>
            // },
            {
                path: "travelrecord",
                element: <Suspense fallback={Loading}><MyTravelRecordsForm /></Suspense>,
                loader: checkAuthLoader

            }
        ],
    },
]);

export default root;
