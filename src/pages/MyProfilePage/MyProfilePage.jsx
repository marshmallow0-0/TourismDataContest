//TODO
//imageSrc 수정


import axios from "axios";
import BasicLayout from "../../layouts/BasicLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userProfile from '../../img/userProfile.png';

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



    return (
        <BasicLayout>
            <div className="max-w-7xl mx-auto p-6 bg-white ">
                <div className="w-full h-32 bg-orange-100"></div>
                <header className=" mt-6 mb-8 ">
                    <h1 className="text-2xl font-bold">NEW CLIENT (RIA_****#Incheon)</h1>
                    <div className="mt-3 border "></div>
                </header>

                <div className="flex mb-8">
                    <div className="w-1/3 p-4">
                        <img src={userProfile} alt="Client" className="w-full rounded-full" />
                    </div>
                    <div className="w-1/2 p-4">
                        <h2 className="text-xl font-bold">Client Name</h2>
                        <p>email & Social</p>
                        <p>search log: 27</p>
                        <p>book mark: 5</p>
                        <p>(등급)</p>
                        <div className="flex flex-col space-x-2 mt-2">
                            <span className="text-green-500">관광하는 여행자</span>
                            <span className="text-pink-500">맛집여행</span>
                            <span className="text-blue-500">자연여행</span>
                            <span className="text-purple-500">체험여행</span>
                        </div>
                    </div>
                    <div className="w-1/2 p-4 border border-gray-300">
                        <h2 className="text-xl font-bold">Client Name</h2>
                        <p>email & Social</p>
                        <p>search log: 27</p>
                        <p>book mark: 5</p>
                        <p>(등급)</p>

                    </div>
                </div>
                <div className="flex mb-8">
                    <div className="w-1/2 p-4 border-r">
                        <h2 className="text-xl font-bold bg-orange-100">나의 기록</h2>
                        <div className="flex space-x-2 mt-2">
                            <img src="image1-url" alt="기록1" className="w-1/3" />
                            <img src="image2-url" alt="기록2" className="w-1/3" />
                            <img src="image3-url" alt="기록3" className="w-1/3" />
                        </div>
                        <button className="mt-2 text-blue-500">모달창으로 한눈에 보이기</button>
                    </div>
                    <div className="w-1/2 p-4">
                        <h2 className="text-xl font-bold">나의 즐겨찾기</h2>
                        <div className="flex space-x-2 mt-2">
                            <img src="image4-url" alt="즐겨찾기1" className="w-1/3" />
                            <img src="image5-url" alt="즐겨찾기2" className="w-1/3" />
                            <img src="image6-url" alt="즐겨찾기3" className="w-1/3" />
                        </div>
                        <button className="mt-2 text-blue-500">모달창으로 한눈에 보이기</button>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold bg-orange-200">Content</h2>
                    <ul className="list-disc list-inside">
                        <li>지금 뜨는 여행지</li>
                        <li>관광하는 여행자</li>
                        <li>맛집여행</li>
                        <li>자연여행</li>
                        <li>체험여행</li>
                    </ul>
                </div>
            </div>

        </BasicLayout>
    );
}

export default MyProfilePage;