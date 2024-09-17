//TODO
//imageSrc 수정


import axios from "axios";
import BasicLayout from "../../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userProfile from '../../img/userProfile.png';
import { FaBell, FaCalendarAlt, FaMapMarkedAlt, FaQuestionCircle, FaLandmark, FaUtensils, FaTree, FaHandsHelping } from 'react-icons/fa';

const callouts = [
    {
        name: 'City',
        description: 'bridges',
        imageSrc: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg',
        imageAlt: '배경1',
        href: '#',
    },
    {
        name: 'Self',
        description: 'rain',
        imageSrc: 'https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_640.jpg',
        imageAlt: '배경2',
        href: '#',
    },
    {
        name: 'Travel',
        description: 'museum',
        imageSrc: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg',
        imageAlt: '배경3',
        href: '#',
    },

    {
        name: 'City',
        description: 'bridges',
        imageSrc: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg',
        imageAlt: '배경1',
        href: '#',
    },
    {
        name: 'Self',
        description: 'rain',
        imageSrc: 'https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_640.jpg',
        imageAlt: '배경2',
        href: '#',
    },
    {
        name: 'Travel',
        description: 'museum',
        imageSrc: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg',
        imageAlt: '배경3',
        href: '#',
    },
]

const MyProfilePage = (props) => {
    const { logs } = props;
    console.log(logs);
    const navigate = useNavigate(); //사용자를 다른 경로로 이동시키는 함수


    // 초기 데이터
    const initialItems = [
        { id: 1, name: '강원도', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
        { id: 2, name: '제주', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
        { id: 3, name: '김포', date: '2023-09-15', imgUrl: 'https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg' },
    ];

    // 상태로 즐겨찾기 항목 관리
    const [items, setItems] = useState(initialItems);

    // 항목 삭제 함수
    const handleDelete = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems); // 상태 업데이트
    };

    // 초기 이미지 데이터
    const images = [
        { id: 1, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기1' },
        { id: 2, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기2' },
        { id: 3, url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg', name: '즐겨찾기3' },
    ];

    // 즐겨찾기 상태 관리
    const [favorites, setFavorites] = useState([]);

    // 즐겨찾기 추가/제거 함수
    const toggleFavorite = (imageId) => {
        if (favorites.includes(imageId)) {
            setFavorites(favorites.filter(id => id !== imageId)); // 이미 즐겨찾기된 경우 제거
        } else {
            setFavorites([...favorites, imageId]); // 즐겨찾기 추가
        }
    };


    return (
        <BasicLayout>
            <div className="max-w-7xl mx-auto p-6 bg-white ">
                <div className="w-full h-32 bg-orange-100"></div>
                <header className=" mt-6 mb-8 ">
                    <h1 className="text-2xl font-bold">NEW CLIENT (RIA_****#Incheon)</h1>
                    <div className="mt-3 border "></div>
                </header>

                <div className="flex mb-8">
                    <div className="w-1/2 flex p-4">
                        <div className="w-1/3 p-4">
                            <img src={userProfile} alt="Client" className="w-full rounded" />
                        </div>
                        <div className="w-2/3 p-4">
                            <h2 className="text-xl font-bold">Client Name</h2>
                            <p>email & Social</p>
                            <p>search log: 27</p>
                            <p>book mark: 5</p>
                            <p>(등급)</p>
                            <div className="flex flex-col space-y-2 mt-2">
                                <span className="flex items-center text-green-500">
                                    <FaLandmark className="mr-2" />
                                    관광하는 여행자
                                </span>
                                <span className="flex items-center text-pink-500">
                                    <FaUtensils className="mr-2" />
                                    맛집여행
                                </span>
                                <span className="flex items-center text-blue-500">
                                    <FaTree className="mr-2" />
                                    자연여행
                                </span>
                                <span className="flex items-center text-purple-500">
                                    <FaHandsHelping className="mr-2" />
                                    체험여행
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 p-4">
                        <h2 className="text-xl font-bold bg-fuchsia-100">나의 계획</h2>
                        <div className="flex flex-col space-y-2 mt-8">
                            <span className="flex items-center space-x-2">
                                <FaBell className="text-yellow-500" />
                                <span>알람 설정하기</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <FaCalendarAlt />
                                <span>나의 캘린더 설정하기</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <FaMapMarkedAlt className="text-red-500" />
                                <span>나의 여행 알아보기</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <FaQuestionCircle className="text-blue-500" />
                                <span>RIA에 문의하기</span>
                            </span>
                        </div>

                    </div>
                </div>
                <div className="flex mb-8">
                    <div className="w-1/2 p-4 border-r">
                        <h2 className="text-xl font-bold bg-orange-100">검색 기록</h2>
                        <div className="flex overflow-x-auto space-x-2 mt-2 p-2">
                            <img src="https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg" alt="즐겨찾기1" className="w-1/4 rounded-lg flex-shrink-0" />
                            <img src="https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg" alt="즐겨찾기2" className="w-1/4 rounded-lg flex-shrink-0" />
                            <img src="https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg" alt="즐겨찾기3" className="w-1/4 rounded-lg flex-shrink-0" />
                            <img src="https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg" alt="즐겨찾기4" className="w-1/4 rounded-lg flex-shrink-0" />
                            <img src="https://cdn.pixabay.com/photo/2023/09/14/16/17/paddle-boat-8253274_1280.jpg" alt="즐겨찾기5" className="w-1/4 rounded-lg flex-shrink-0" />
                        </div>
                        {/* <button className="mt-2 text-blue-500">자세히 확인하기</button> */}
                    </div>
                    <div className="w-1/2 p-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gray-200 p-2 rounded-md">즐겨찾기</h2>
                            <div className="flex space-x-4 mt-4 overflow-x-auto">
                                {images.map((image) => (
                                    <div key={image.id} className="relative">
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className={`w-40 h-40 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 ${favorites.includes(image.id) ? 'border-4 border-yellow-400' : 'border border-gray-300'}`}
                                            onClick={() => toggleFavorite(image.id)}
                                        />
                                        {favorites.includes(image.id) && (
                                            <span className="absolute top-2 left-2 bg-yellow-400 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
                                                ★
                                            </span>)}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold">내 즐겨찾기</h3>
                                {favorites.length === 0 ? (
                                    <p className="text-gray-500 mt-2">즐겨찾기한 항목이 없습니다.</p>
                                ) : (
                                    <ul className="mt-2 list-disc list-inside">
                                        {favorites.map((favId) => {
                                            const favoriteImage = images.find((img) => img.id === favId);
                                            return (
                                                <li key={favId} className="text-gray-700">{favoriteImage.name}</li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex mb-8">

                    {/* <h2 className="text-xl font-bold bg-orange-200">Content</h2>
                    <ul className="list-disc list-inside">
                        <li>프로필 사진 변경</li>
                        <li>나의 정보 수정</li>
                        <li>등급이란</li>
                        <li>보안</li>
                        <li>설정</li>
                    </ul> */}
                    <div className="w-1/2 p-4 border-r">
                        <h2 className="text-xl font-bold bg-orange-100">content</h2>
                        <div className="flex space-x-2 mt-2">
                            <img src="image1-url" alt="기록1" className="w-1/3" />
                            <img src="image2-url" alt="기록2" className="w-1/3" />
                            <img src="image3-url" alt="기록3" className="w-1/3" />
                        </div>
                        <button className="mt-2 text-blue-500">자세히 확인하기</button>
                    </div>
                    <div className="w-1/2 p-4">
                        <h2 className="text-xl font-bold bg-gray-200">나의 기록</h2>
                        <div className="flex flex-col space-y-4 mt-4 max-w-xs">
                            {items.map(item => (
                                <div key={item.id} className="flex items-center border border-gray-200 rounded-xl shadow-lg p-4 bg-white relative">
                                    <img src={item.imgUrl} alt={item.name} className="w-1/4 rounded-lg" />
                                    <div className="ml-4">
                                        <span className="text-lg font-semibold text-gray-800">{item.name}</span>
                                        <span className="block text-sm text-gray-500 mt-1">생성 일자: {item.date}</span>
                                    </div>
                                    <button
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            ))}
                            {items.length === 0 && (
                                <p className="text-gray-500 mt-2">즐겨찾기한 항목이 없습니다.</p>
                            )}
                        </div>
                        <button className="mt-2 text-blue-500">자세히 확인하기</button>
                    </div>

                </div>
            </div>

        </BasicLayout>
    );
}

export default MyProfilePage;