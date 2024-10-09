import React, { useEffect, useState } from 'react';
import { Form, useSearchParams, useActionData, useNavigation, useLocation } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import { FaHome } from "react-icons/fa";
import { loginActions } from '../../store/loginSlice';
import { useDispatch } from 'react-redux';

// const API_BASE_URL = "http://localhost:8000";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const LoginPage = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const dispatch = useDispatch();  // Redux 액션을 디스패치하기 위한 훅

    const data = useActionData();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
    const [Error, setError] = useState("");

    // const [userInfo, setUserInfo] = useState(null);  // 사용자 정보 관리

    // 로그인 상태 확인 (쿠키에 저장된 토큰을 확인)
    // useEffect(() => {
    //     const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    //     if (token) {
    //         setIsLoggedIn(true);
    //     }
    // }, []);


    const location = useLocation();

    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        profileImage: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const username = params.get('username');
        const email = params.get('email');
        const profileImage = params.get('profile_image');
        console.log(username);
        if (username && email && profileImage) {
            setUserInfo({
                username,
                email,
                profileImage,
            });
        }
    }, [location.search]);


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    // 로그인 성공 후 사용자 정보를 로컬 스토리지에 저장하고, 페이지를 이동하는 로직
    // const onSubmitHandler = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.post(`${API_BASE_URL}/user/login`, {
    //             identifier: Email,
    //             password: Password,
    //         }, {
    //             withCredentials: true,  // 세션 쿠키를 전송하여 서버와의 인증을 유지
    //         });

    //         // 로그인 성공 시 처리
    //         // const token = response.data;  // 서버에서 받은 토큰
    //         // localStorage.setItem('token', token);  // 토큰을 로컬 스토리지에 저장

    //         dispatch(loginActions.login(response.data.user));  // 사용자 정보를 Redux에 저장

    //         setIsLoggedIn(true);  // 로그인 상태 변경
    //         console.log('로그인 성공', response.data);
    //         // 로그인 성공 후 사용자 정보를 메인 페이지로 넘기면서 이동
    //         navigate('/', { state: { user: response.data.user } });

    //     } catch (error) {
    //         console.error('로그인 실패', error);
    //         setError("이메일 또는 비밀번호가 잘못되었습니다.");
    //     }
    // }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("username", Email);
        formData.append("password", Password);

        try {
            const response = await axios.post(`${API_BASE_URL}/user/login`, formData, {
                withCredentials: true,  // 세션 쿠키를 함께 전송
                headers: {
                    'Content-Type': 'multipart/form-data', // 헤더 설정
                },
            });
            const generalToken = response.data.access_token;  // 서버에서 JWT 토큰을 반환
            dispatch(loginActions.loginWithGeneralToken({ token: generalToken }));

            setIsLoggedIn(true);  // 로그인 상태 변경
            console.log("로그인 반환값 확인", response)
            console.log('로그인 성공', generalToken);
            // 로그인 성공 후 사용자 정보를 메인 페이지로 넘기면서 이동
            //navigate('/', { state: { token: token } });
            navigate('/');
            // 나머지 코드...
        } catch (error) {
            console.error('로그인 실패', error);
            setError("이메일 또는 비밀번호가 잘못되었습니다.");
        }
    };

    const handleKakaoLogin = (event) => {
        try {
            event.preventDefault();
            // window.location.href = 'http://localhost:8000/user/auth/kakao';  // 카카오 로그인 페이지로 리다이렉트
            window.location.href = `${API_BASE_URL}/user/auth/kakao`;  // 카카오 로그인 페이지로 리다이렉트
        } catch (error) {
            console.error("카카오 로그인 실패:", error);
        }
    };

    // const handleKakaoLogin = async (event) => {
    //     event.preventDefault();
    //     try {
    //         // 카카오 로그인 API 요청
    //         const response = await axios.get(`${API_BASE_URL}/user/auth/kakao`);

    //         // 상태 코드가 200일 경우 메인 페이지로 리다이렉트
    //         if (response.status === 200) {
    //             // window.location.href = '/';  // 메인 페이지로 이동
    //             navigate('/');  // 메인 페이지로 이동 (새로고침 없이)
    //         }
    //     } catch (error) {
    //         console.error("카카오 로그인 실패:", error);
    //     }
    // };
    // 페이지 로드 시 로컬 스토리지에서 사용자 정보를 가져와 로그인 상태를 유지하는 로직
    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    return (
        <div>
            {isLoggedIn ? (
                userInfo ? (  // 사용자 정보가 로드되었을 때 MainPage로 이동
                    <MainPage userInfo={userInfo} />
                ) : (
                    <div>Loading user information...</div>  // 사용자 정보를 로드 중일 때 로딩 표시
                )
            ) : (
                <form method='post' onSubmit={onSubmitHandler}>
                    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-50">
                        {/* 로그인 실패 시 에러 메시지 표시 */}
                        {Error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                {Error}
                            </div>
                        )}
                        {data && data.errors && <ul>
                            {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
                        </ul>}
                        {data && data.message && <p>{data.message}</p>}
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col">
                            <img className="w-10 h-10 mx-auto mb-4" src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" />
                            <span className='text-blue-500 font-bold text-xl mb-4 text-center'>Recommend Image Area</span>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"></label>
                                <input
                                    type="text"
                                    placeholder='이메일'
                                    id="email"
                                    name="email"
                                    value={Email}
                                    onChange={onEmailHandler}
                                    className="bg-indigo-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"></label>
                                <input
                                    type="password"
                                    placeholder='비밀번호'
                                    id="password"
                                    name="password"
                                    value={Password}
                                    onChange={onPasswordHandler}
                                    className="bg-indigo-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold transform:ease-in-out duration-150 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    로그인
                                </button>
                            </div>
                            <div className="flex items-center justify-center mt-3">
                                <hr className="w-full border-t border-gray-300" />
                                <span className="px-5 text-gray-500 whitespace-nowrap">간편 로그인</span>
                                <hr className="w-full border-t border-gray-300" />
                            </div>
                            <div className="flex justify-center items-start">
                                <img
                                    className='h-10 w-10 cursor-pointer'
                                    src="/img/kakao_login2.png"
                                    alt="Kakao Login"
                                    onClick={handleKakaoLogin}  // 카카오 로그인 이벤트 핸들러 추가
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <a href="/" className="flex items-center space-x-2 text-blue-500 text-sm"> {/* <a> 태그로 아이콘과 텍스트 감싸기 */}
                                    <FaHome color="#000080" size={25} />
                                    <span>시작 페이지로</span>
                                </a>
                            </div>
                            <div className="flex items-center justify-center mt-4">
                                <span className="text-gray-500 text-sm">계정이 없으신가요? </span>
                                <a href="/auth?mode=signup" className="text-blue-500 text-sm ml-1">가입하기</a>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default LoginPage;
