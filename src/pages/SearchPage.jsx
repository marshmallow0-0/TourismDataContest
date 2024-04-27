//TODO
//다른 div에 있는 버튼을 눌러도 새로 지도를 생성하지 못함 반드시 이미지를 클릭해야 선택되게 되어있음 

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BasicLayout from "../layouts/BasicLayout";
import { useLocation, useNavigate } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";
import PublicDataMap from "../components/PublicDataMap";
import axios from "axios";
import ModalExample from "../components/Modal";
import SearchInfo from "../components/SearchInfo";
import SearchListButtons from "../components/SearchListButtons";


const SearchPage = () => {

    const navigate = useNavigate(); //사용자를 다른 경로로 이동시키는 함수

    const location = useLocation();
    const { jsonData, uploadedImage, imageFile } = location.state;
    //console.log(jsonData);
    //파이썬 백엔드 
    //let result = jsonData;
    const result = jsonData;
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
                            <div className="text-left mb-8 text-4xl font-Pretendard">
                                Search <strong className="text-sky-500">Success</strong>  <br /> Area Picture
                            </div>
                            <button
                                className={`bg-lime-700 w-28 h-10 text-center mb-2 rounded-md inline-block text-xs text-white font-Pretendard`}
                                onClick={() => handleResearchButtonClick()}>
                                Main
                            </button>

                            {/* <button
                                className={`bg-blue-700 w-28 h-10 text-center mb-2 rounded-md inline-block text-xs text-white font-Pretendard`}
                                onClick={() => handleRetryButtonClick()}>
                                Retry
                            </button> */}
                            {loading && <ModalExample />}
                        </div>
                    </div >
                    <Slider className="mt-10 mb-10"{...settings}>

                        {result.map((result, index) => (
                            <div key={index} className="mt-10 rounded-md shadow-md border-4">
                                <div className="relative" >
                                    {/* 스프링 백엔드 */}
                                    {/* <img className="rounded-md brightness-50 hover:brightness-100 w-full h-40 " src={"https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_640.jpg"} alt={result.address_name} onClick={() => { handleCategoryChange(''); handleSelectedIndex(index); choiceLocation(result.place_name); }} /> */}
                                    {/* 파이썬 백엔드 */}
                                    <img className="rounded-md brightness-50 hover:brightness-100 w-full h-40 " src={result.url} alt={result.address_name} onClick={() => { handleCategoryChange(''); handleSelectedIndex(index); choiceLocation(result.place_name); }} />
                                    <input
                                        type="checkbox" checked={index === selectedResultIndex} readOnly className="appearance-none  checked:bg-[url('./img/check.png')] ml-2 mt-2 bg-cover  absolute top-0  w-6 h-6 " />
                                    <input
                                        type="checkbox" className="appearance-none  checked:bg-[url('./img/bookmark.png')] bg-cover  absolute top-0 right-0 mr-2 mt-2 w-6 h-6" onChange={() => handleCheckboxChange(index)} />
                                    <div className="absolute bottom-0 left-0">

                                        <SearchListButtons
                                            handleButtonClick={handleButtonClick}
                                            placeName={result.place_name}
                                            index={index}
                                        />

                                    </div>
                                </div>
                                <div className="flex shadow-lg rounded-md px-2 ml-2 h-44">

                                    <div className="mt-8">
                                        <div className="font-Pretendard font-bold text-indigo-800 mb-3 flex items-center">
                                            {/* <span className="bg-indigo-800 text-white px-2 py-1 rounded-xl text-sm whitespace-nowrap ">이름</span> */}
                                            <p className="ml-2 text-center text-md select-all">{result.place_name}</p>

                                        </div>

                                        {result.phone !== "" ? (
                                            <div className="flex items-center">
                                                {/* <span className="font-Pretendard bg-indigo-800 text-white px-2 py-1 rounded-xl text-sm">번호</span> */}
                                                <p className="ml-2 text-center select-all">{result.phone}</p>
                                            </div>
                                        ) : null}

                                        <div className="flex fixed bottom-2">
                                            {result.parking === 1 && <img className="ml-2 w-9 h-9 border-2 border-solid border-gray-600 rounded-md" src="./img/parking.gif" alt="" />}
                                            {result.pet === 1 && <img className="ml-2 w-9 h-9 border-2 border-solid border-gray-600 rounded-md" src="./img/dog2.gif" alt="" />}
                                            {result.baby === 1 && <img className="ml-2 w-9 h-9 border-2 border-solid border-gray-600 rounded-md" src="./img/stroller.gif" alt="" />}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>


                    <div id="Robot_MAP_Area" className=" border-4 rounded-md shadow-md">
                        <div id="Ria_Robot" className="flex flex-row mb-10">
                            <div className="ml-2 mt-7 mb-1 bg-[url('./img/RiaRobot.png')] bg-auto bg-no-repeat bg-center w-10 h-10"></div>
                            <span className="ml-2 mt-9 text-indigo-900 text-2xl font-semibold">RIA Ai가 추천하는 장소 리스트입니다. </span>
                        </div>

                        <SearchInfo buttonSelect={ButtonSelect} locationAddress={LocationAddress} />

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

export default SearchPage;


