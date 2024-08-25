//TODO
//다른 div에 있는 버튼을 눌러도 새로 지도를 생성하지 못함 반드시 이미지를 클릭해야 선택되게 되어있음 

import React, { useState } from "react";
//import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BasicLayout from "../../layouts/BasicLayout";
import { useLocation, useNavigate } from "react-router-dom";
import KakaoMap from "../../components/KakaoMap";
import PublicDataMap from "../../components/PublicDataMap";
//import axios from "axios";
import ModalExample from "../../components/Modal";

import Info from "./Info";
//import SearchListButtons from "../components/SearchListButtons";
//import { warning } from "framer-motion";
//import Carousel from "./SearchCarousel";
//import MainCheckBoxGroup from "../components/MainCheckBoxGroup";
import SearchCarousel from "./SearchCarousel";
export default function SearchPage() {

    const navigate = useNavigate(); //사용자를 다른 경로로 이동시키는 함수

    const location = useLocation();
    const uploadedImage = "https://via.placeholder.com/300"
    //WARNING const { jsonData, uploadedImage, imageFile } = location.state;
    //console.log(jsonData);
    //파이썬 백엔드 
    //let result = jsonData;
    // 정적인 데이터
    const result = [
        {
            place_name: "Place 1",
            url: "https://via.placeholder.com/150",
            address_name: "Address 1",
            phone: "123-456-7890",
            parking: 1,
            pet: 1,
            baby: 1,
            x: 127.0337,
            y: 37.4982
        },
        {
            place_name: "Place 2",
            url: "https://via.placeholder.com/150",
            address_name: "Address 2",
            phone: "098-765-4321",
            parking: 0,
            pet: 1,
            baby: 0,
            x: 127.0377,
            y: 37.5012
        },
        // 더 많은 정적인 데이터를 추가할 수 있습니다.
    ];
    //WARNING---------------> 기존 const result = jsonData;
    console.log(result);

    //zconsole.log(result[0].placeName);
    //스프링 백엔드 v2
    //const result = jsonData.documents;

    const [category, setCategory] = useState('');

    const [selectedResultIndex, setSelectedResultIndex] = useState(0);

    const [checkedItems, setCheckedItems] = useState([]);

    const [loading, setLoading] = useState(false);

    const [ButtonSelect, valueChange] = useState(0);
    const [LocationAddress, choiceLocation] = useState(`${result[0].place_name}`);

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
        //console.log(newCheckedItems);
    };
    const handleSelectedIndex = (index) => {
        setSelectedResultIndex(index);
        //console.log(index);
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        //console.log(newCategory);
    };

    const handleResearchButtonClick = () => {
        navigate('/');
    };

    const handleButtonClick = (category, value, placeName, index) => {
        handleCategoryChange(category);
        handleSelectedIndex(index);
        valueChange(value);
        choiceLocation(placeName);
    };

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
    };

    return (
        <BasicLayout>
            <div className="w-full flex justify-center">
                <div className="min-w-40 max-w-3xl">
                    <div id="drag-drop-area" className="text-center flex flex-row justify-center gap-10" >
                        <label htmlFor="file-upload" className="mt-10 cursor-pointer">
                            <img className="uploadImg max-w-2xl w-80 h-60 flex rounded-md border-solid border-2 border-gray-400 p-2" src={uploadedImage} alt="upload" />

                        </label>



                        <div id="uploaded-image-container" className="min-w-64 min-h-64 flex flex-col ml-20 justify-center items-left">
                            {loading && <ModalExample />}
                        </div>
                    </div >
                    <div className="w-4/5 mx-auto p-4 border border-gray-300 rounded-lg bg-gray-100">
                        <div className="bg-gray-100 p-4 rounded-lg mb-4 text-lg max-h-48 overflow-y-auto">

                            <div className="bg-blue-500 p-4 rounded-xl mb-4">
                                <strong className="text-white">울산대공원</strong> <br />
                                <span className="text-white">언제가도 좋은 최고의 공원</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg mb-4">
                                <strong>롯데 꿈동산</strong> <br />
                                <span>언제가도 좋은 최고의 공원</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg mb-4">
                                <strong>어린이 공원</strong> <br />
                                <span>언제가도 좋은 최고의 공원</span>
                            </div>
                        </div>

                    </div>

                    <button
                        className={`bg-indigo-700 w-28 h-10 text-center mb-2 rounded-md inline-block text-xs text-white font-Pretendard`}
                        onClick={() => handleResearchButtonClick()}>
                        재탐색
                    </button>

                    <SearchCarousel />


                    <div id="Robot_MAP_Area" className=" border-4 rounded-md shadow-md">
                        <div id="Ria_Robot" className="flex flex-row mb-10">
                            <div className="ml-2 mt-7 mb-1 bg-[url('./img/RiaRobot.png')] bg-auto bg-no-repeat bg-center w-10 h-10"></div>
                            <span className="ml-2 mt-9 text-indigo-900 text-2xl font-semibold">RIA Ai가 추천하는 장소 리스트입니다. </span>
                        </div>

                        <Info buttonSelect={ButtonSelect} locationAddress={LocationAddress} />

                        <div id="kakao_map_loaction" className="ml-2 mb-2 mr-2 mt-2 border-4 flex flex-row font-Pretendard text-indigo-900">
                            {/*스프링 백엔드*/}
                            {/* {category !== 'AT4' && <KakaoMap mapx={result[selectedResultIndex].x} mapy={result[selectedResultIndex].y} category={category} />} */}
                            {/* {category === 'AT4' && <PublicDataMap mapx={result[selectedResultIndex].x} mapy={result[selectedResultIndex].y} category={category} />} */}
                            {/* 파이썬 백엔드 */}
                            {category !== 'AT4' && <KakaoMap mapx={result[selectedResultIndex].y} mapy={result[selectedResultIndex].x} category={category} />}
                            {category === 'AT4' && <PublicDataMap mapx={result[selectedResultIndex].y} mapy={result[selectedResultIndex].x} category={category} />}
                        </div>
                    </div>
                    {/* {category !== 'AT4' && <KakaoMap mapx={result2[selectedResultIndex].y} mapy={result2[selectedResultIndex].x} category={category} />} */}
                    {/* {category === 'AT4' && <PublicDataMap mapx={result2[selectedResultIndex].y} mapy={result2[selectedResultIndex].x} category={category} />} */}
                </div>
            </div>
        </BasicLayout >
    );
};



