import axios from "axios";
import BasicLayout from "../../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userProfile from '../../img/userProfile.png';
import { FaLandmark } from 'react-icons/fa';
import AccordionGallery from "./AccordionGallery";
import { useLocation } from 'react-router-dom';
import { getSearchHistory } from "../../api/api";
import { useSelector } from "react-redux";

const MyProfilePage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { user } = location.state || {};  // 전달된 user 정보
    // console.log("프로필에서의 유저정보 확인", user);
    // 초기 데이터
    // const initialItems = [
    //     { id: 1, name: '강원도', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
    //     { id: 2, name: '제주', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
    //     { id: 3, name: '김포', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
    //     { id: 4, name: '김포', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
    // ];

    const [items, setItems] = useState([]);

    // 즐겨찾기 상태 관리
    const [favorites, setFavorites] = useState([]);
    const toggleFavorite = (imageId) => {
        setFavorites(prevFavorites => {
            const updatedFavorites = { ...prevFavorites };
            if (updatedFavorites[imageId]) {
                delete updatedFavorites[imageId];  // 이미 즐겨찾기에 있으면 제거
            } else {
                updatedFavorites[imageId] = true;  // 없으면 추가
            }
            return updatedFavorites;
        });
    };

    const images = [
        { id: 1, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기1' },
        { id: 2, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기2' },
        { id: 3, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기3' },
        { id: 4, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기4' },
    ];

    // const handleHistory = async () => {
    //     try {
    //         // POST 요청으로 데이터 보내기
    //         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/record/history`, {
    //             withCredentials: true, // 세션 쿠키가 전송되도록 설정
    //         });
    //         console.log('Response:', response.data);
    //     } catch (error) {
    //         console.error('Error sending data to backend:', error);
    //     }
    // };

    // // useEffect로 컴포넌트가 마운트될 때 handleHistory 실행
    // useEffect(() => {
    //     if (user && user.id) {
    //         handleHistory(); // user 정보가 있을 때만 실행
    //     }
    const generalToken = useSelector((state) => state.login?.generalToken || null);
    const kakaoToken = useSelector((state) => state.login?.kakaoToken || null);
    // console.log("프로필 토큰확인2", token);

    // 둘 중 하나의 토큰을 사용 (일반 토큰이 우선, 없으면 카카오 토큰 사용)
    const token = generalToken || kakaoToken;

    // console.log("사용할 토큰 확인:", token);

    // 검색 기록 API 호출하는 함수
    const fetchSearchHistory = async () => {
        try {
            const searchHistory = await getSearchHistory(token);  // 토큰을 사용하여 검색 기록 가져오기
            const userid = user.id;
            const historyItems = searchHistory.history[`${userid}'s search_history`].history;  // 중첩된 구조에서 history 배열에 접근
            setItems(historyItems);  // 검색 기록 상태 업데이트

            // 중첩된 구조에서 마지막 history 배열에 접근
            // console.log('Search history:', historyItems);
            // return searchHistory;  // 마지막 history 배열 반환
        } catch (error) {
            console.error("Error fetching search history:", error);
        }
    };

    // 컴포넌트가 마운트될 때 검색 기록 가져오기
    useEffect(() => {
        if (user) {
            fetchSearchHistory();  // 검색 기록 가져오는 함수 실행
            getFavorites();
        }
    }, [user]);  // user가 변경될 때마다 실행

    useEffect(() => {
        // console.log("즐겨찾기 상태 변경됨", favorites);
    }, [favorites]);  // favorites가 변경될 때마다 실행

    const deleteFavorite = async (place, token) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/record/favorites`, {
                data: {
                    name: place.name,
                    address: place.address,
                    petsAvailable: place.petsAvailable,
                    tel: place.tel,
                    parking: place.parking,
                    x: place.x,
                    y: place.y,
                    images: place.images,
                    blur_image: place.blur_image,
                },
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // 요청이 성공하면 결과를 처리합니다.
            console.log('즐겨찾기에서 삭제되었습니다:', response.data);
        } catch (error) {
            // 에러가 발생하면 에러 처리
            console.error('이미 삭제된 즐겨찾기입니다.');
        }
    };

    // 초기 즐겨찾기 목록 가져오기
    const getFavorites = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/record/favorites`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const favoritesList = response.data.favorites;
                // console.log("즐겨찾기 확인", favoritesList);
                setFavorites(favoritesList);  // favorites 배열 상태로 설정
            } else {
                console.error('즐겨찾기 목록 불러오기 실패:', response.data.favorites);
            }
        } catch (error) {
            console.error('즐겨찾기 목록 불러오는 중 오류 발생:', error);
        }
    };

    const goToHome = () => {
        navigate('/');  // '/'는 홈 경로
    };

    return (
        <BasicLayout>
            <div className="max-w-7xl mx-auto p-3 bg-gray-50 ">
                {/* 통합된 프로필 헤더 */}
                <header className="mb-4 text-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-white mb-6">myProfile</div>
                    <div className="flex flex-col items-center md:flex-row md:items-start justify-center text-white">
                        {/* 프로필 이미지 */}
                        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md border-4 border-white">
                            <img src={user?.thumbnail_image_url || './img/logo.jpg'} alt="Client" className="w-full h-full object-cover" />
                        </div>

                        {/* 프로필 세부 정보 */}
                        <div className="md:ml-4 mt-4 md:mt-0 flex flex-col items-center md:items-start">
                            <h2 className="text-2xl font-bold">{user.nickname}</h2>
                            <p className="text-indigo-200 text-md mt-1">{user.email}</p>

                            <div className="mt-4 flex space-x-6">
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-semibold">{items.length}</span>
                                    <span className="text-xs text-indigo-200">Search Logs</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-semibold">{favorites.length}</span>
                                    <span className="text-xs text-indigo-200">Bookmarks</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center space-x-1 text-green-500">
                                <FaLandmark />
                                <span className="text-md font-semibold">관광하는 여행자</span>
                            </div>
                        </div>
                    </div>

                    {/* 홈으로 가기 버튼 */}
                    <button
                        onClick={goToHome}
                        className="mt-6 px-5 py-2 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-300"
                    >
                        홈으로
                    </button>

                    {/* 구분선 */}
                    <div className="mt-4 border-t border-white opacity-40"></div>
                </header>


                {/* 검색 기록 이미지 */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">검색 기록 이미지</h3>
                    <div className="relative mt-2 p-2">
                        <div className="flex overflow-x-auto space-x-4 p-2 scrollbar-hide">
                            {items.slice().reverse().map((item, index) => (
                                <img
                                    key={index}
                                    src={item.img_url}  // 이미지 URL
                                    alt={`검색 기록 ${item.img_name}`}  // 이미지 이름
                                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg flex-shrink-0"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 즐겨찾기 섹션 */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">즐겨찾기</h3>
                    <div className="flex space-x-4 mt-4 overflow-x-auto">
                        <AccordionGallery
                            images={images}
                            favorites={favorites}
                            deleteFavorite={deleteFavorite}  // 즐겨찾기 삭제 함수 전달
                            toggleFavorite={toggleFavorite}  // 즐겨찾기 토글 함수 전달
                            token={token}  // 인증 토큰 전달
                        />
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default MyProfilePage;
