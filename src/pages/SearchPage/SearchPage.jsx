// import React, { useState } from "react";
// import BasicLayout from "../../layouts/BasicLayout";
// import { useNavigate } from "react-router-dom";
// // import KakaoMap from "../../components/KakaoMap";
// import KakaoMap from "./KakaoMap";
// import PublicDataMap from "../../components/PublicDataMap";
// import ImageGallery from "./ImageGallery";
// import SearchCarousel from "./SearchCarousel";
// import Info from "./Info";
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import SearchListButtons from "./SearchListButtons";

// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000';  // 백엔드 서버 주소

// export default function SearchPage() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { image } = location.state || {};  // 기본값을 설정하여 오류를 방지합니다.

//     const selectedTags = useSelector(state => state.checkbox.checkboxes);
//     const selectedCities = useSelector(state => state.checkbox.selectedCities);
//     const uploadedImage = image || "https://via.placeholder.com/300";

//     // 정적 데이터 
//     const result = [
//         {
//             place_name: "Place 1",
//             url: "https://via.placeholder.com/150",
//             address_name: "Address 1",
//             phone: "123-456-7890",
//             parking: 1,
//             pet: 1,
//             baby: 1,
//             x: 127.0337,
//             y: 37.4982
//         },
//         {
//             place_name: "Place 2",
//             url: "https://via.placeholder.com/150",
//             address_name: "Address 2",
//             phone: "098-765-4321",
//             parking: 0,
//             pet: 1,
//             baby: 0,
//             x: 127.0377,
//             y: 37.5012
//         },
//     ];

//     const [category, setCategory] = useState('');
//     const [selectedResultIndex, setSelectedResultIndex] = useState(0);
//     const [ButtonSelect, valueChange] = useState(0);
//     const [LocationAddress, choiceLocation] = useState(`${result[0].place_name}`);

//     const handleCategoryChange = (newCategory) => {
//         console.log("카테고리 변경됨:", newCategory);
//         setCategory(newCategory);
//     };

//     const handleResearchButtonClick = () => {
//         navigate('/');
//     };

//     // useEffect(() => {
//     //     // category가 변경될 때마다 필요한 작업 수행
//     //     console.log("Category changed:", category);
//     //     // 필요한 경우 여기서 맵을 다시 로드하거나 다른 동작 수행
//     // }, [category, selectedResultIndex]);

//     return (
//         <BasicLayout>
//             <div className="w-full h-[50vh] px-4 flex justify-center items-center relative">
//                 <ImageGallery />
//             </div>
//             <div className="w-full flex justify-center">
//                 <div className="mx-auto min-w-40 max-w-5xl">
//                     <div id="drag-drop-area" className="text-center flex flex-row justify-center gap-10">
//                         <label htmlFor="file-upload" className="mt-10 cursor-pointer">
//                             <img className="uploadImg max-w-2xl w-80 h-60 flex rounded-md border-solid border-2 border-gray-400 p-2" src={uploadedImage} alt="upload" />
//                         </label>
//                         <div className="max-w-xl border-2 border-gray-400">
//                             <h2 className="text-2xl font-bold">Check Box Area</h2>
//                             <div className="flex flex-wrap my-4">
//                                 {selectedTags.map(tag => (
//                                     <div key={tag} className="bg-lime-500 text-white px-2 py-1 m-1 rounded flex items-center">
//                                         {tag}
//                                     </div>
//                                 ))}
//                                 {selectedCities.map(city => (
//                                     <div key={city} className="bg-indigo-500 text-white px-2 py-1 m-1 rounded flex items-center">
//                                         {city}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex flex-col mt-10">
//                         <div className="w-4/5 mx-auto p-4 border border-gray-300 rounded-lg bg-gray-100">
//                             <div className="bg-gray-100 p-4 rounded-lg mb-4 text-lg max-h-48 overflow-y-auto">
//                                 <div className="bg-blue-500 p-4 rounded-xl mb-4">
//                                     <strong className="text-white">울산대공원</strong> <br />
//                                     <span className="text-white">언제가도 좋은 최고의 공원</span>
//                                 </div>
//                                 <div className="bg-white p-4 rounded-lg mb-4">
//                                     <strong>롯데 꿈동산</strong> <br />
//                                     <span>언제가도 좋은 최고의 공원</span>
//                                 </div>
//                                 <div className="bg-white p-4 rounded-lg mb-4">
//                                     <strong>어린이 공원</strong> <br />
//                                     <span>언제가도 좋은 최고의 공원</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-10 flex justify-end w-4/5 mx-auto">
//                             <button
//                                 className="bg-indigo-700 w-28 h-10 text-center mb-2 rounded-md text-xs text-white font-Pretendard"
//                                 onClick={() => handleResearchButtonClick()}>
//                                 재탐색
//                             </button>
//                         </div>
//                     </div>

//                     <SearchCarousel onCategoryChange={handleCategoryChange} />

//                     <div id="Robot_MAP_Area" className="border-4 rounded-md shadow-md mt-8">
//                         <div id="Ria_Robot" className="flex flex-row mb-10">
//                             <div className="ml-2 mt-7 mb-1 bg-[url('./img/RiaRobot.png')] bg-auto bg-no-repeat bg-center w-10 h-10"></div>
//                             <span className="ml-2 mt-9 text-indigo-900 text-2xl font-semibold">RIA Ai가 추천하는 장소 리스트입니다. </span>
//                         </div>

//                         <Info buttonSelect={ButtonSelect} locationAddress={LocationAddress} />

//                         <div id="kakao_map_loaction" className="ml-2 mb-2 mr-2 mt-2 border-4 flex flex-row font-Pretendard text-indigo-900">
//                             {<KakaoMap mapx={result[0].x} mapy={result[0].y} category={category} />}
//                             {/* {category !== 'AT4' && <KakaoMap mapx={result[0].x} mapy={result[0].y} category={category} />} */}
//                             {/* {category === 'AT4' && <PublicDataMap mapx={result[selectedResultIndex].y} mapy={result[selectedResultIndex].x} category={category} />} */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </BasicLayout>
//     );
// }
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

const API_BASE_URL = 'http://localhost:8000';  // 백엔드 서버 주소

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
                    <div>No data found. Please try again.</div>
                )}
            </div>

            <div className="w-full h-[50vh] px-4 flex justify-center items-center relative">
                <ImageGallery />
            </div>
            <div className="w-full flex justify-center">
                <div className="mx-auto min-w-40 max-w-5xl">
                    <div id="drag-drop-area" className="text-center flex flex-row justify-center gap-10">
                        <label htmlFor="file-upload" className="mt-10 cursor-pointer">
                            <img
                                className="uploadImg max-w-2xl w-96 h-72 flex rounded-md border-solid border-2 border-gray-400 p-4"
                                src={uploadedImage}
                                alt="upload"
                            />
                        </label>
                        <div className="max-w-2xl">
                            <div className="my-6">
                                {/* 카테고리 */}
                                <h1 className="w-full text-left font-semibold text-lg mb-2">카테고리</h1>
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {selectedTags.map((tag) => (
                                        <div key={tag} className="bg-lime-500 text-white px-4 py-2 rounded-md flex items-center text-lg">
                                            {tag}
                                        </div>
                                    ))}
                                </div>

                                {/* 지역 */}
                                <h1 className="w-full mt-6 text-left font-semibold text-lg mb-2">지역</h1>
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {selectedCities.map((city) => (
                                        <div key={city} className="bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center text-lg">
                                            {city}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-10">
                        {/* <div className="w-4/5 mx-auto p-4 border border-gray-300 rounded-lg bg-gray-100">
                            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-lg max-h-48 overflow-y-auto">
                                {touristPlaces.map((place, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg mb-4">
                                        <strong>{place.name}</strong> <br />
                                        <span>{place.address}</span> <br />
                                        <span>{place.telephone}</span> <br />
                                        <span>
                                            주차: {place.parking !== "정보 없음" ? place.parking : '정보 없음'},
                                            반려동물: {place.pets_available === '가능' ? '허용' : '불허'},
                                            결제: {place.credit_card === '가능' ? '가능' : '불가능'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                        <div className="mt-10 flex justify-end w-4/5 mx-auto">
                            <button
                                className="bg-indigo-700 w-28 h-10 text-center mb-2 rounded-md text-xs text-white font-Pretendard"
                                onClick={() => handleResearchButtonClick()}>
                                재탐색
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        {touristPlaces && touristPlaces.length > 0 ? (
                            <SearchCarousel onCategoryChange={handleCategoryChange} touristPlaces={touristPlaces} />
                        ) : (
                            <p>Loading or no tourist places found...</p> // 데이터가 없을 때 적절한 메시지
                        )}
                    </div>

                    <div id="Robot_MAP_Area" className="border-4 rounded-md shadow-md mt-8">
                        <div id="Ria_Robot" className="flex flex-row mb-10">
                            <div className="ml-2 mt-7 mb-1 bg-[url('./img/RiaRobot.png')] bg-auto bg-no-repeat bg-center w-10 h-10"></div>
                            <span className="ml-2 mt-9 text-indigo-900 text-2xl font-semibold">
                                RIA Ai가 추천하는 장소 리스트입니다.
                            </span>
                        </div>

                        <Info buttonSelect={ButtonSelect} locationAddress={LocationAddress} />

                        <div id="kakao_map_loaction" className="ml-2 mb-2 mr-2 mt-2 border-4 flex flex-row font-Pretendard text-indigo-900">
                            <div style={{ width: '100%', height: '400px' }}>
                                {touristPlaces.length > 0 && (
                                    <KakaoMap mapx={touristPlaces[0].x} mapy={touristPlaces[0].y} category={category} />
                                )}                                {/* {category === 'AT4' && <PublicDataMap mapx={result[selectedResultIndex].y} mapy={result[selectedResultIndex].x} category={category} />} */}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </BasicLayout>
    );
}
