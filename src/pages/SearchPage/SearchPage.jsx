import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";
import KakaoMap from "./KakaoMap";
import PublicDataMap from "../../components/PublicDataMap";
import ImageGallery from "./ImageGallery";
import SearchCarousel from "./SearchCarousel";
import Info from "./Info";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SearchListButtons from "./SearchListButtons";
import axios from 'axios';
import { getDetailPlace } from "../../api/api";
import Accordion from "./Accordion";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
// 백엔드 서버 주소

export default function SearchPage() {


    const navigate = useNavigate();
    const location = useLocation();

    const { jsonData, uploadedImage } = location.state || {}; // 데이터를 안전하게 추출
    // const uploadedImage = image || "https://via.placeholder.com/300";
    console.log(2);
    console.log(jsonData);
    console.log("이미지 확인", uploadedImage); // 전달된 uploadedImage 확인

    // console.log(jsonData.similar_places);


    const { image } = location.state || {};  // 기본값을 설정하여 오류를 방지합니다.

    const selectedTags = useSelector(state => state.checkbox.checkboxes);
    const selectedCities = useSelector(state => state.checkbox.selectedCities);

    const [category, setCategory] = useState('');
    const [selectedResultIndex, setSelectedResultIndex] = useState(0);
    const [ButtonSelect, setButtonSelect] = useState(0);  // buttonSelect 값을 상태로 관리
    const [LocationAddress, choiceLocation] = useState('');
    //WARNING let -> const
    const [touristPlaces, setTouristPlaces] = useState([]);  // 관광지 정보를 저장할 상태 변수
    // WARNING const { jsonData, uploadedImage, imageFile } = location.state;

    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

    const handleResearchButtonClick = () => {
        navigate('/');
    };

    const fetchDetail = async () => {
        try {
            const data = await getDetailPlace("seoul");
            console.log("1");
            console.log(data);
            setDetail(data.data);
        } catch (err) {
            setError('실패');
            console.error(err);
        }
    };

    // 최초 로드 시 정보 가져오기
    useEffect(() => {
        fetchDetail();
    }, []);

    // 카테고리 변경 핸들러
    const handleCategoryChange = (newCategory) => {
        console.log("카테고리 변경됨:", newCategory);
        setCategory(newCategory);

        // 카테고리에 따라 buttonSelect 값 변경 (0: 기본, 1: 카페, 2: 음식점, 3: 관광지)
        if (newCategory === "CE7") {
            setButtonSelect(1);  // 카페
        } else if (newCategory === "FD6") {
            setButtonSelect(2);  // 음식점
        } else if (newCategory === "AT4") {
            setButtonSelect(3);  // 관광지
        } else {
            setButtonSelect(0);  // 기본
        }
    };

    const handleSlideChange = (index) => {
        setSelectedResultIndex(index);
    };
    console.log(3);
    if (touristPlaces.length > 0) {
        console.log(touristPlaces[0].x); // 배열의 첫 번째 요소가 존재할 때만 콘솔 출력
    }
    console.log(touristPlaces);

    return (
        <BasicLayout>
            <div className="w-full flex justify-center">
                <div className="mx-auto max-w-3xl w-full sm:w-3/5 px-4">
                    <h1 className="text-center text-3xl font-bold text-indigo-800">이미지 분석 결과</h1>

                    {/* 이미지 업로드 및 분석 태그 영역 */}
                    <div className="bg-white rounded-md p-6 mt-6">
                        <div className="text-center flex flex-col sm:flex-row justify-center items-center">
                            <label htmlFor="file-upload" className="mb-4 sm:mb-0">
                                <img
                                    className="uploadImg w-96 sm:max-w-md md:max-w-xl lg:max-w-xl xl:max-w-2xl rounded-md border border-gray-300"
                                    src={uploadedImage}
                                    alt="uploaded"
                                />
                            </label>

                            {/* 태그 및 카테고리 선택 */}
                            <div className="w-full sm:w-auto sm:ml-6 mt-4 sm:mt-0">
                                <Accordion selectedTags={selectedTags} selectedCities={selectedCities} />
                            </div>
                        </div>
                    </div>

                    {/* 홈으로 버튼 */}
                    <div className="flex justify-center sm:justify-center mt-6">
                        <button
                            className="w-full sm:w-40 h-12 font-semibold text-lg mb-4 cursor-pointer hover:bg-gray-600 bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => handleResearchButtonClick()}
                        >
                            홈으로
                        </button>
                    </div>

                    {/* AI 분석 결과 제목 */}


                    {/* SearchCarousel 컴포넌트 */}
                    <div className="bg-white rounded-md p-6">

                        {jsonData && jsonData.length > 0 ? (

                            <SearchCarousel
                                onCategoryChange={handleCategoryChange}
                                touristPlaces={jsonData}
                                onSlideChange={handleSlideChange}
                            />
                        ) : (
                            <p>Loading or no tourist places found...</p>
                        )}
                    </div>

                    {/* 지도 및 추가 정보 영역 */}
                    <div id="Robot_MAP_Area" className="bg-white rounded-md p-6 mt-8">
                        <div className="flex flex-row mb-10">
                            <div className="ml-2 mt-7 mb-1 bg-[url('./img/RiaRobot.png')] bg-auto bg-no-repeat bg-center w-10 h-10"></div>
                            <span className="ml-2 mt-9 text-indigo-900 text-2xl font-semibold">
                                RIA Ai가 추천하는 장소 리스트입니다.
                            </span>
                        </div>

                        {/* Info 컴포넌트 */}
                        <Info buttonSelect={ButtonSelect} locationAddress={jsonData[selectedResultIndex].name} />

                        {/* KakaoMap 컴포넌트 */}
                        <div className="rounded-md mt-4">
                            <div className="w-full sm:w-[700px] h-[300px] sm:h-[400px]">  {/* 반응형 크기 설정 */}
                                {jsonData.length > 0 && (
                                    <KakaoMap mapx={jsonData[selectedResultIndex].y} mapy={jsonData[selectedResultIndex].x} category={category} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>

    );
}