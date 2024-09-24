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
    // console.log(jsonData.similar_places);

    useEffect(() => {
        if (!jsonData) {
            console.error("데이터를 찾을 수 없음");
        }

    }, [jsonData]);

    const { image } = location.state || {};  // 기본값을 설정하여 오류를 방지합니다.

    const selectedTags = useSelector(state => state.checkbox.checkboxes);
    const selectedCities = useSelector(state => state.checkbox.selectedCities);

    const [category, setCategory] = useState('');
    const [selectedResultIndex, setSelectedResultIndex] = useState(0);
    const [ButtonSelect, valueChange] = useState(0);
    const [LocationAddress, choiceLocation] = useState('');
    //WARNING let -> const
    const [touristPlaces, setTouristPlaces] = useState([]);  // 관광지 정보를 저장할 상태 변수
    // WARNING const { jsonData, uploadedImage, imageFile } = location.state;

    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

    const handleResearchButtonClick = () => {
        navigate('/');
    };

    // 특정 장소의 상세 정보를 가져오는 함수
    // const handlePlaceClick = async (placeName) => {
    //     try {
    //         const detail = await getDetailPlace(placeName);
    //         setPlaceDetail(detail);  // 상세 정보를 상태 변수에 저장
    //     } catch (error) {
    //         console.error(`Error fetching detail for place ${placeName}:`, error);
    //     }
    // };

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

    useEffect(() => {
        // 정적 데이터를 상태로 설정
        const places = [
            {
                place_name: "홍대",
                url: "", // 이미지 URL이 비어 있으므로 빈 문자열로 둡니다
                address_name: "서울특별시 마포구 홍익로 20",
                phone: "02-334-7878",
                parking: 0, // "정보 없음"을 0으로 변환
                pet: 0, // "불가능"을 0으로 변환
                baby: 0, // 유아 관련 정보가 없으므로 기본값으로 0 설정
                x: 126.9227542239,
                y: 37.5543713280
            },
            {
                place_name: "Place 1",
                url: "https://via.placeholder.com/150",
                address_name: "Address 1",
                phone: "123-456-7890",
                parking: 1, // 주차 가능
                pet: 1, // 반려동물 허용
                baby: 1, // 유아 허용
                x: 127.0337,
                y: 37.4982
            },
            {
                place_name: "Place 2",
                url: "https://via.placeholder.com/150",
                address_name: "Address 2",
                phone: "098-765-4321",
                parking: 0, // 주차 불가능
                pet: 1, // 반려동물 허용
                baby: 0, // 유아 불허용
                x: 127.0377,
                y: 37.5012
            }
        ];

        // 상태를 업데이트
        setTouristPlaces(places);
    }, []);  // 빈 배열을 두어 컴포넌트가 처음 렌더링될 때만 실행되도록 함

    // 카테고리 변경 핸들러
    const handleCategoryChange = (newCategory) => {
        console.log("카테고리 변경됨:", newCategory);
        setCategory(newCategory);
        // fetchNearbyTouristInfo();  // 카테고리 변경 시 관광지 정보 재조회
    };

    const handleImageClick = (index) => {
        setSelectedResultIndex(index);
    };
    console.log(3);
    if (touristPlaces.length > 0) {
        console.log(touristPlaces[0].x); // 배열의 첫 번째 요소가 존재할 때만 콘솔 출력
    }
    console.log(touristPlaces);
    // 관광지 정보를 API로부터 가져오는 함수
    // const fetchNearbyTouristInfo = async () => {
    //     try {
    //         const coordinates = {
    //             latitude: 37.5665,  // 예시 좌표
    //             longitude: 126.9780,  // 예시 좌표
    //             contenttype: 12,  // 예시 contenttype (관광지)
    //             radius: 1000,  // 예시 반경 (단위: 미터)
    //         };
    //         const response = await axios.get(`${API_BASE_URL}/api/get_nearby_tourlist/`, {
    //             params: coordinates,
    //         });
    //         console.log(response.data.items);
    //         setTouristPlaces(response.data.items);  // 응답 데이터를 상태 변수에 저장
    //     } catch (error) {
    //         console.error('근처 관광지 로드 실패', error);
    //     }
    // };

    // useEffect(() => {
    //     // 초기 로드 시 관광지 정보 조회
    //     fetchNearbyTouristInfo();
    // }, ["seoul"]);

    return (
        <BasicLayout>
            <div className="w-full flex flex-col items-center">
                {jsonData ? (
                    <>
                        {/* <div className="w-4/5 mx-auto p-4 border border-gray-300 rounded-lg bg-gray-100">
                            <div className="grid grid-cols-3 gap-4">
                                {jsonData.similar_places.map((place, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer"
                                        onClick={() => handleImageClick(index)}
                                    >
                                        <img
                                            src={place.image.ImageUrl}
                                            alt={place.image.PlaceName}
                                            className="rounded-lg shadow-md"
                                        />
                                        <p className="text-center mt-2">{place.image.PlaceName}</p>
                                        <p className="text-center text-sm text-gray-500">Score: {place.score}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                        <div className="w-full h-64 mt-8">
                            {/* <KakaoMap
                                mapx={jsonData.similar_places[selectedResultIndex].image.x}
                                mapy={jsonData.similar_places[selectedResultIndex].image.y}
                                category={category}
                            /> */}
                        </div>
                    </>
                ) : (
                    <div>데이터 찾을 수 없음 </div>
                )}
            </div>
            {/* 
            <div className="w-full h-[50vh] md:h-[70vh] px-2 md:px-4 flex justify-center items-center relative">
                <ImageGallery />
            </div> */}

            <div className="w-full flex justify-center">
                <div className="h-32"></div>

                <div className="mx-auto max-w-5xl w-full sm:w-4/5">
                    <div id="drag-drop-area" className="text-center flex flex-col sm:flex-row justify-center items-center">
                        <label htmlFor="file-upload" className="mt-4 sm:mt-10">
                            <img
                                className="uploadImg min-w-96 sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-5xl rounded-md p-4 mt-2"
                                src={'https://cdn.pixabay.com/photo/2024/08/29/10/01/nature-9006428_640.jpg'}

                                //src={uploadedImage}
                                alt="upload"
                            />
                        </label>
                    </div>

                    {/* 카테고리 */}
                    <Accordion selectedTags={selectedTags} selectedCities={selectedCities} />

                    <div className="flex flex-col mt-6 sm:mt-10">
                        <div className="mt-10 flex justify-center sm:justify-end mx-auto">
                            <button
                                className="w-full sm:w-40 h-12 font-semibold text-lg mb-4 cursor-pointer hover:bg-gray-600 bg-gray-500 text-center text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => handleResearchButtonClick()}>
                                홈으로
                            </button>
                        </div>
                    </div>

                    <div>
                        {touristPlaces && touristPlaces.length > 0 ? (
                            <SearchCarousel onCategoryChange={handleCategoryChange} touristPlaces={touristPlaces} />
                        ) : (
                            <p>Loading or no tourist places found...</p>
                        )}
                    </div>

                    <div id="Robot_MAP_Area" className="w-full mx-auto sm:w-[700px] border-4 rounded-md shadow-md mt-8"> {/* 반응형 크기 설정 */}
                        <div id="Ria_Robot" className="flex flex-row mb-10">
                            <div className="ml-2 mt-7 mb-1 bg-[url('./img/RiaRobot.png')] bg-auto bg-no-repeat bg-center w-10 h-10"></div>
                            <span className="ml-2 mt-9 text-indigo-900 text-2xl font-semibold">
                                RIA Ai가 추천하는 장소 리스트입니다.
                            </span>
                        </div>

                        <Info buttonSelect={ButtonSelect} locationAddress={LocationAddress} />

                        <div id="kakao_map_location" className="ml-2 mb-2 mr-2 mt-2 border-4 flex flex-col sm:flex-row font-Pretendard text-indigo-900">
                            <div className="w-full sm:w-[700px] h-[300px] sm:h-[400px]">  {/* 반응형 크기 설정 */}
                                {touristPlaces.length > 0 && (
                                    <KakaoMap mapx={touristPlaces[0].x} mapy={touristPlaces[0].y} category={category} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}