import React, { useState, useEffect } from 'react';
import Search from './Search';
import Random from './Random';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalExample from '../../components/Modal';
import { getLogOut2 } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../store/loginSlice';
import { redirect } from "react-router-dom";

function Section({ user }) {

    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
    const [modalIsOpen, setModalIsOpen] = useState(true); // 모달 상태 관리
    const [contentVisible, setContentVisible] = useState(false); // 콘텐츠 가시성 상태

    const dispatch = useDispatch();

    const generalToken = useSelector((state) => state.login?.generalToken || null);
    const kakaoToken = useSelector((state) => state.login?.kakaoToken || null);

    // console.log("프로필 토큰확인2", token);

    // 둘 중 하나의 토큰을 사용 (일반 토큰이 우선, 없으면 카카오 토큰 사용)
    const token = generalToken || kakaoToken;
    // console.log("사용할 토큰 확인:", token);

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth'); // "/auth" 페이지로 이동
        // console.log("Login button clicked");
    };

    useEffect(() => {
        // 1초 동안 로딩 상태 유지 후 모달을 닫기
        setTimeout(() => {
            setContentVisible(true); // 콘텐츠 표시
            setIsLoading(false); // 1초 후 로딩 상태 해제
            setModalIsOpen(false); // 모달 닫기
        }, 3000); // 2초 동안 로딩 유지
    }, []); // 빈 배열로 useEffect가 한 번만 실행되도록 설정

    // TokenExtractor 내부에서 token 상태 관리


    const handleLogout = async () => {
        try {
            // await getLogOut2(token);
            // console.log("로그아웃!");
            // navigate('/auth');
            dispatch(loginActions.logout());
            navigate('/auth');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='sm:px-4' style={{ scrollBehavior: 'smooth' }}>
            {isLoading && (
                <ModalExample modalIsOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
            )}
            <div className={`transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'} bg-white max-w-full sm:max-w-2xl mx-auto px-4 py-8`}>
                {user ? (
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full">
                        {/* 왼쪽 이미지와 프로필 정보 */}
                        <div className="w-full sm:w-1/2 max-w-xs mx-auto">
                            <div className="relative w-full h-48 sm:h-64">
                                <img
                                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                                    src={user?.thumbnail_image_url || './img/Namsan.jpg'}  // 유저의 썸네일 이미지가 없으면 기본 이미지 사용
                                    alt="Background Image"
                                />

                                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-b from-transparent via-black/40 to-black rounded-2xl">

                                    <div className="flex items-center space-x-4">
                                        <img
                                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-md"
                                            src={user?.profile_image_url || './img/logo.jpg'}
                                            alt="Profile Image"
                                        />

                                        <div className="text-white">
                                            <h3 className="text-lg sm:text-xl font-bold">
                                                {user.nickname || "Admin"}
                                            </h3>
                                            {/* <p className="text-white/80 text-xs sm:text-sm">
                                                Last Login: 25/06/2024 Tue
                                            </p> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* 오른쪽 버튼들 */}
                        <div className="flex flex-col w-full sm:w-1/2 max-w-xs mx-auto space-y-6">
                            <Link to="/myprofile" state={{ user: user }}>
                                <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-500 hover:to-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out">
                                    Profile
                                </button>
                            </Link>
                            {/* <Link to="/travelrecord">
                                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out">
                                    TravelRecord
                                </button>
                            </Link> */}
                            <button
                                onClick={handleLogout}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto">
                        <h2 className="text-lg font-semibold mt-4 text-center">로그인을 하시면 더 많은 정보를 확인할 수 있습니다.</h2>
                        <div className="flex justify-center">
                            <button
                                onClick={handleLoginClick}
                                className="px-4 py-2 mt-4 bg-indigo-800 text-white rounded hover:bg-indigo-700 relative z-10"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <section>
                <Search token={token} />
            </section>
            <section id='random'>
                <Random />
            </section>
        </div>
    );
}

export default Section;
