import axios from "axios";
import BasicLayout from "../../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userProfile from '../../img/userProfile.png';
import { FaLandmark } from 'react-icons/fa';
import AccordionGallery from "./AccordionGallery";

const MyProfilePage = (props) => {
    const { logs } = props;
    const navigate = useNavigate();

    // 초기 데이터
    const initialItems = [
        { id: 1, name: '강원도', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
        { id: 2, name: '제주', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
        { id: 3, name: '김포', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
        { id: 4, name: '김포', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
    ];

    const [items, setItems] = useState(initialItems);

    // 즐겨찾기 상태 관리
    const [favorites, setFavorites] = useState([]);
    const toggleFavorite = (imageId) => {
        if (favorites.includes(imageId)) {
            setFavorites(favorites.filter(id => id !== imageId)); 
        } else {
            setFavorites([...favorites, imageId]);
        }
    };

    const images = [
        { id: 1, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기1' },
        { id: 2, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기2' },
        { id: 3, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기3' },
        { id: 4, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기4' },
    ];

    return (
        <BasicLayout>
            <div className="max-w-7xl mx-auto p-6 bg-white">
                {/* 프로필 헤더 */}
                <header className="mb-8 text-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-white">
                        Profile<span className="font-light"> User</span>
                    </h1>
                    <div className="mt-3 border-t border-white opacity-50"></div>
                </header>

                {/* 프로필 정보 */}
                <div className="flex flex-col md:flex-row items-center justify-center mb-8 bg-white p-6 rounded-lg shadow-md">
                    {/* 프로필 이미지 */}
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-md border-4 border-indigo-600">
                        <img src={userProfile} alt="Client" className="w-full h-full object-cover" />
                    </div>

                    {/* 프로필 세부 정보 */}
                    <div className="mt-6 md:mt-0 md:ml-8 flex flex-col items-center md:items-start">
                        <h2 className="text-2xl font-bold text-gray-800">Client Name</h2>
                        <p className="text-gray-500 mt-2">email@example.com</p>

                        <div className="mt-4 flex space-x-6">
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-semibold text-indigo-600">27</span>
                                <span className="text-sm text-gray-500">Search Logs</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-semibold text-indigo-600">5</span>
                                <span className="text-sm text-gray-500">Bookmarks</span>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col space-y-2">
                            <span className="flex items-center text-green-500">
                                <FaLandmark className="mr-2" />
                                관광하는 여행자
                            </span>
                        </div>
                    </div>
                </div>

                {/* 검색 기록 이미지 */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">검색 기록 이미지</h3>
                    <div className="relative mt-2 p-2">
                        {/* 이미지 리스트 */}
                        <div className="flex overflow-x-auto space-x-4 p-2 scrollbar-hide">
                            {items.map((item) => (
                                <img key={item.id} src={item.imgUrl} alt={`검색 기록 ${item.name}`} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg flex-shrink-0" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 즐겨찾기 섹션 */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold">즐겨찾기</h3>
                    <div className="flex space-x-4 mt-4 overflow-x-auto">
                        <AccordionGallery images={images} favorites={favorites} toggleFavorite={toggleFavorite} />
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default MyProfilePage;
