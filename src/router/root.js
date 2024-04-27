import { Suspense, lazy } from "react";
import SearchFailPage from "../pages/SearchFailPage";
import LicensePage from "../pages/LicensePage";
const { createBrowserRouter } = require("react-router-dom");

//TODO 
//현재 로딩화면이 div Loading 으로 단순 구성되어있으므로 수정화면을 별도로 만들어야 한다
const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))
const How = lazy(() => import("../pages/HowToUsePage"))
const Who = lazy(() => import("../pages/WhoWeArePage"))
//const Login = lazy(() => import("../pages/LoginPage"))
//const MyProfile = lazy(() => import("../pages/MyProfilePage"))
const Search = lazy(() => import("../pages/SearchPage"))

const root = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "/search",
        element: <Suspense fallback={Loading}><Search /></Suspense>//search 라우트 추가
    },
    {
        path: "/how",
        element: <Suspense fallback={Loading}><How /></Suspense>//how 라우트 추가 
    },
    {
        path: "/who",
        element: <Suspense fallback={Loading}><Who /></Suspense> //who 라우트 추가 
    },
    {
        path: "/fail",
        element: <Suspense fallback={Loading}><SearchFailPage /></Suspense>
    },
    {
        path: "/license",
        element: <Suspense fallback={Loading}><LicensePage /></Suspense>
    },
    // {
    //     path: "/myprofile",
    //     element: <Suspense fallback={Loading}><MyProfile /></Suspense> //myprofile 라우트 추가 
    // },
    // {
    //     path: "/login",
    //     element: <Suspense fallback={Loading}><Login /></Suspense>//login 라우트 추가 
    // }
])

export default root;