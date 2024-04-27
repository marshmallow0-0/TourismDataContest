//MainBody은 파일을 업로드하고 백엔드와 통신하여 성공하면 SearchPage로 이동하는 부분이다 
//이 파일은 메인화면의 Drop Box Area Pickture 요소와 crop 요소, 2024년 추천 장소 요소 Email Newsletter 요소 4개를 가지고 있다. 

//TODO
//현재 function을 const 변수에 저장하는 형식과 function으로 설정하는 방식이 혼재하고 있으므로 형식을 통일할 필요가 있다
//id recommend-area 부분은 추천 장소 요소는 더 알아보기 클릭 후 처리하는 부분이 존재하지 않는다.
//이메일을 입력하고 send 버튼을 눌러도 처리되는 로직이 존재하지 않는다.
//proxy 관련 설정을 localhost:8080 으로 설정하여 기존 이미지 업로드 방법이 유효하지 않아서 온라인으로 이미지 파일을 가져오거나 src 아래 폴더를 새로 만들어야 한다
//이미지가 업로드되지 않으면 버튼 클릭 자체를 막아야한다  



import { createRef } from "react";
import Cropper from "react-cropper"; // ReactCropperElement import 제거
import "cropperjs/dist/cropper.css";


import React, { useEffect, useState } from 'react';
import initializeDragAndDrop from '../functions/initializeDragAndDrop'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Banners, NOTUPLOAD } from "../pages/data";

import ModalExample from '../components/Modal';
import CheckBoxGroup from '../components/MainCheckBoxGroup';

const MainBody = () => {

    const defaultSrc = Banners[1].image;
    const [image, setImage] = useState(defaultSrc);
    const [uploadedImage, setUploadedImage] = useState(null); //이미지가 업로드되면 그 이미지를 저장하는 상태 
    const [isImageUploaded, setIsImageUploaded] = useState(false); //이미지가 업로드되어 있는지를 확인하는 상태
    const [imageFile, setImageFile] = useState(null); //파일이 업로드되면 해당 파일을 저장하는 상태 
    //const [loading, setLoading] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [modal, setModal] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [checkboxes, setCheckboxes] = useState([]);

    const [checkedValues, setCheckedValues] = useState([true, true]);
    //const [checkedLabels, setCheckedLabels] = useState([]);
    const [mappedValues, setMappedValues] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const handleCheckboxGroupChange = (updatedCheckboxes) => {

        let combinedLabels = [];

        const mapping = {
            'Incheon_history': 2,
            'Incheon_building': 0,
            'Incheon_recreation': 4,
            'Incheon_nature': 3,
            'Incheon_culture': 1,
            'Seoul_history': 7,
            'Seoul_building': 5,
            'Seoul_recreation': 9,
            'Seoul_nature': 8,
            'Seoul_culture': 6
        };

        // 인천과 서울이 선택되었는지 확인
        const isIncheonChecked = updatedCheckboxes[0].isChecked;
        const isSeoulChecked = updatedCheckboxes[1].isChecked;

        // 변경된 체크박스 상태를 콘솔에 출력
        console.log('Updated Checkboxes:', updatedCheckboxes);
        const updatedCheckedValues = updatedCheckboxes.map(cb => cb.isChecked);
        setCheckedValues(updatedCheckedValues);


        //변경된 체크박스 상태를 로컬 스토리지에 저장
        localStorage.setItem('checkboxes', JSON.stringify(updatedCheckboxes));

        // 인천과 서울 모두 체크되었을 경우
        if (isIncheonChecked && isSeoulChecked) {
            // 인천에 대한 라벨 조합
            combinedLabels = combinedLabels.concat(
                updatedCheckboxes.slice(2).filter(cb => cb.isChecked).map(cb => 'Incheon_' + cb.label)
            );
            // 서울에 대한 라벨 조합
            combinedLabels = combinedLabels.concat(
                updatedCheckboxes.slice(2).filter(cb => cb.isChecked).map(cb => 'Seoul_' + cb.label)
            );
        } else if (isIncheonChecked) { // 만약 인천만 체크되었다면
            combinedLabels = updatedCheckboxes.slice(2).filter(cb => cb.isChecked).map(cb => 'Incheon_' + cb.label);
        } else if (isSeoulChecked) { // 만약 서울만 체크되었다면
            combinedLabels = updatedCheckboxes.slice(2).filter(cb => cb.isChecked).map(cb => 'Seoul_' + cb.label);
        }

        console.log(combinedLabels);

        const mappedValues = combinedLabels.map(label => mapping[label]);
        setMappedValues(mappedValues);
        console.log(mappedValues);

        setCheckboxes(updatedCheckboxes);
    };


    const navigate = useNavigate(); //사용자를 다른 경로로 이동시키는 함수

    // 컴포넌트가 처음 렌더링될 때 한 번만 실행되는 초기화 작업을 수행
    useEffect(() => {
        // 드래그 앤 드롭 영역의 ID
        const dragDropAreaId = 'drag-drop-area';
        // 파일 업로드 입력 필드의 ID
        const fileUploadInputId = 'file-upload';
        // 드래그 앤 드롭 기능 초기화 함수 호출
        initializeDragAndDrop(dragDropAreaId, fileUploadInputId);

    }, []);

    // uploadedImage 상태가 변경될 때마다 실행되는 useEffect 훅
    useEffect(() => {
        // 이미지가 업로드되면 버튼을 활성화하는 상태를 업데이트
        if (uploadedImage) {
            setIsImageUploaded(true); // 이미지가 업로드되면 버튼을 활성화함
            console.log("upload");
        }
    }, [uploadedImage]);

    //드롭된 파일을 처리하는 함수
    const handleDroppedFiles = (files) => {
        // 첫 번째 파일을 선택
        const file = files[0];
        // FileReader 객체를 생성
        const reader = new FileReader();

        // 파일을 읽기가 완료되면 실행될 콜백 함수를 설정
        reader.onload = function (e) {
            // 읽은 데이터를 사용하여 이미지 요소를 생성
            const img = document.createElement('img');
            img.src = e.target.result;
            //console.log(e.target.result);
            //setCroppedImage(e.target.result);
            // 업로드된 이미지 상태를 설정
            setUploadedImage(img);
            // 업로드된 파일 상태를 설정
            setImageFile(file);

            setImage(img.src);

        };

        // 선택한 파일이 있을 경우에만 파일을 읽어옴
        if (file) {
            reader.readAsDataURL(file); // 파일을 읽어 base64 인코딩된 문자열로 변환
            //formdata.append('file', imageFile); // FormData에 이미지 파일을 추가
        }

    }


    //파일이 변경되면 해당 파일이 유효한 파일인지 검사 후 handleDroppedFiles 실행 
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleDroppedFiles(files);
        }
    };

    // 드래그 앤 드롭 이벤트를 처리하는 함수
    const handleDrop = (e) => {
        // 기본 동작을 막음
        e.preventDefault();
        // 드롭된 파일 목록을 가져옴 
        const files = e.dataTransfer.files;
        // 드롭된 파일을 처리하는 함수를 호출
        handleDroppedFiles(files);

    }

    //how버튼을 누르면 how 페이지로 이동
    const handleHowButtonClick = () => {
        navigate('/how');
    };

    //Read our story 버튼을 누르면 WhoWeAre 페이지로 이동
    const handleWhoButtonClick = () => {
        navigate('/who');
    };
    //업로드된 이미지 버튼을 클릭시 처리하는 함수 
    const handleButtonClick = () => {

        //setLoading(true);
        setButtonVisible(false);
        setModal(!modal);
        //이미지 존재여부 확인
        //--------- 파이썬 백엔드 코드--------- 
        if (imageFile) {
            const formdata = new FormData();// FormData 객체를 생성
            formdata.append('file', imageFile); // FormData에 이미지 파일을 추가
            const queryParams = new URLSearchParams({ filter_index: mappedValues });

            // HTTP 요청 헤더 설정
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',// 멀티파트 형식으로 데이터를
                    'ngrok-skip-browser-warning': '69420',
                    //'filter_index': mappedValues,
                    //'filter_index:': JSON.stringify(mappedValues)
                    //mappedValues
                },
            };
            const imageUrl = uploadedImage.src;
            //post로 이미지 데이터 전달 
            axios.post(`https://bbc5-183-102-204-80.ngrok-free.app/api/recommend_place/?${queryParams}`, formdata, config)
                .then(
                    (response) => {
                        // 응답 데이터를 가져옴
                        const jsonData = response.data;
                        setModalIsOpen(false);
                        console.log("0");
                        console.log(jsonData);

                        //                 const jsonData2 = response.data;
                        // setLoading(false);
                        //search 페이지로 이동하고, 상태를 전달
                        //navigate('/search', { state: { jsonData } });
                        navigate('/search', { state: { jsonData, uploadedImage: imageUrl, imageFile: imageFile } });


                    }
                )
                .catch(error => {
                    console.error(error);
                    navigate('/fail');
                });
        }

        //        --------- 스프링 백엔드 코드--------- 
        //     if (imageFile) {
        //         const formdata = new FormData();// FormData 객체를 생성
        //         formdata.append('image', imageFile); // FormData에 이미지 파일을 추가
        //         formdata.append('userId', '1');// FormData에 사용자 ID를 추가
        //         //formdata.append('checkbox', mappedValues); // FormData에 추가적인 데이터를 추가

        //         // HTTP 요청 헤더 설정
        //         const config = {
        //             headers: {
        //                 'content-type': 'multipart/form-data',// 멀티파트 형식으로 데이터를
        //                 'checkbox': JSON.stringify(mappedValues)
        //             },
        //         };
        //         console.log(JSON.stringify((mappedValues)));
        //         const imageUrl = uploadedImage.src;

        //         //post로 이미지 데이터 전달 
        //         axios.post('/recommend_place', formdata, config)
        //             .then(
        //                 (response) => {
        //                     // 응답 데이터를 가져옴
        //                     const jsonData = response.data;
        //                     setModalIsOpen(false);
        //                     console.log("0");
        //                     console.log(jsonData);

        //                     //const jsonData2 = response.data;

        //                     //search 페이지로 이동하고, 상태를 전달
        //                     navigate('/search', { state: { jsonData, uploadedImage: imageUrl, imageFile: imageFile } });

        //                 }
        //             )
        //             .catch(error => {
        //                 console.error(error);
        //                 navigate('/fail');
        //             });
        //     }
        //     console.log('Button clicked!');

    }

    //체크박스 선택시 나타나는 이미지 설정
    const backgroundImageStyle = {
        backgroundImage: checkedValues[0] && !checkedValues[1] ? "url('./img/incheon3.jpeg')" :
            !checkedValues[0] && checkedValues[1] ? "url('./img/seoul2.jpeg')" :
                checkedValues[0] && checkedValues[1] ? "url('./img/korea.jpg')" :
                    "url('./img/selectRegion.png')", // 모두 선택하지 않은 경우를 기본 이미지로 설정 

        backgroundSize: checkedValues[0] && !checkedValues[1] ? '100% 100%' : // 첫 번째 이미지 크기
            !checkedValues[0] && checkedValues[1] ? '130% 120%' : // 두 번째 이미지 크기
                checkedValues[0] && checkedValues[1] ? '50% 50%' : // 세 번째 이미지 크기
                    '70% 70%', // 기본 이미지 크기
        backgroundPosition:
            checkedValues[0] && !checkedValues[1] ? 'top calc(100% - 6em) right calc(100% - 2em)' : // 첫 번째 이미지 위치
                //checkedValues[0] && !checkedValues[1] ? 'top calc(100% - 1em) right calc(100%)' : // 첫 번째 이미지 위치
                //!checkedValues[0] && checkedValues[1] ? 'top calc(100% - 7em) right calc(100% - 3em)' : // 두 번째 이미지 위치
                !checkedValues[0] && checkedValues[1] ? 'top calc(100% - 2em) right calc(100% - 2em)' : // 두 번째 이미지 위치
                    checkedValues[0] && checkedValues[1] ? 'top calc(100% - 7.5em) right calc(100% - 6em)' : // 세 번째 이미지 위치
                        'top calc(100% - 5em) right calc(100% - 6em)',
        backgroundRepeat: 'no-repeat',
    };

    if (!checkedValues[0] && !checkedValues[1]) {
        alert('At least one region must be selected!!');
    }
    //id drag-drop-area 부분은 onDrop 속성이 있어서 이미지 드래그 후 드롭한 것까지 처리
    //id file-upload 부분은 onChange 속성이 있어서 파일 업로드를 처리
    //uploadedImage ? 조건문은 이미지 업로드가 true 이면 첫번째 img를 넣고 false이면 두번째 img를 사용
    //id uploaded-image-container 부분은 현재 Drop Box Area Picture 텍스트와 버튼 두 개를 가지고 있음 
    //특히 첫번째 버튼은 이미지 활성시 파란색으로 변경되도록 조정 버튼 클릭시 반응  

    //id recommend-area 부분은 추천 장소 요소
    //id email-newsletter 부분은 이메일을 보내는 요소 




    const [cropData, setCropData] = useState("");
    const cropperRef = createRef(); // 타입 어노테이션 제거



    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
    };



    return (
        <>
            <div className="mt-10">
                <div>
                    <div className='w-full'>
                        {/* <input type="file" onChange={onChange} /> */}
                        <div id="drag-drop-area" className="text-center flex flex-row justify-center ml-24" onDrop={handleDrop}>
                            <label htmlFor="file-upload" className="mt-10 cursor-pointer">
                                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                                {uploadedImage ? <img className="uploadImg w-72 h-60 flex rounded-md border-dashed border-2 border-gray-500 p-2" src={uploadedImage.src} alt="upload" /> : <img className="uploadImg w-72 h-60 flex rounded-md border-dashed border-2 border-gray-500 p-2" src={NOTUPLOAD[0].image} alt="noUpload" />}
                                {/* <CheckBoxGroup onChange={handleCheckboxGroupChange} /> */}
                            </label>

                            <div id="uploaded-image-container" className="min-w-72 min-h-72 flex flex-col p-2 ml-10 justify-center items-left" style={backgroundImageStyle}>
                                <div className="text-left mb-3 text-4xl font-Pretendard">
                                    Drop Box  <br /> Area
                                </div>

                                <CheckBoxGroup onChange={handleCheckboxGroupChange} />

                                {buttonVisible &&
                                    <button
                                        className={`${isImageUploaded ? "bg-blue-700" : "bg-gray-600"} w-28 h-10 text-center mt-2 mb-2 rounded-md inline text-xs text-white font-Pretendard`}
                                        onClick={() => { handleButtonClick(); }}>
                                        Ai Search
                                    </button>
                                }

                                {!buttonVisible && !modalIsOpen &&
                                    <ModalExample />
                                }
                                <button className="w-28 h-10 text-center bg-lime-700 inline-block rounded-md px-2 py-2 text-xs text-white font-Pretendard" onClick={() => handleHowButtonClick()}>How to use</button>
                            </div>
                        </div >

                        <div className='flex flex-row justify-center items-center mt-10 gap-20'>

                            <div className="text-right">
                                <div className="flex flex-col items-center">
                                    <div className="ml-28">
                                        {cropData && <img className="w-72 h-60" src={cropData} alt="" />}
                                    </div>
                                    <p className="text-md font-Pretendard">Cropped Image</p>

                                </div>
                            </div>
                            <div className="flex flex-col ml-10">
                                <Cropper
                                    ref={cropperRef}
                                    className='w-96 h-96'
                                    style={{ height: "20em", width: "20em" }}
                                    zoomTo={0.5}
                                    initialAspectRatio={1}
                                    preview=".img-preview"
                                    src={image}
                                    viewMode={1}
                                    minCropBoxHeight={10}
                                    minCropBoxWidth={10}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    guides={true}
                                />
                                <button className="mt-3 w-28 h-10 bg-blue-700 rounded-md px-2 py-2 text-xs text-white font-Pretendard" onClick={getCropData}>
                                    Crop
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* <div id="WhoWeAreBanners" className="flex justify-center mt-20">
                    <div className="flex flex-row mt-12">
                        <img className='max-w-80 ml-10' src={Banners[1].image} alt='banners'></img>
                        <div className='font-semi text-2xl font-Pretendard m-2 ml-5'>

                            <h2>We present the best place<br />like your picture.</h2>
                            <div className='text-sm mt-4'>
                                Sustainability is at the heart of what we stand for<br />that’s why we present result with Ai that pledge to <br />use searching analyze Ai methods.
                            </div>
                            <button className="mt-14 w-28 h-10 text-center bg-lime-700 inline-block rounded-md px-2 py-2 text-xs text-white font-Pretendard" onClick={() => handleWhoButtonClick()}>Read our story</button>
                        </div>
                    </div>
                </div> */}
                <div id="recommend-area" className="flex justify-center my-40">
                    <div className="flex  bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="size-72 border-gray-800 rounded-md" src="./img/travel.jpg" alt="야경사진" />
                        <div className="p-5 ">
                            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">2024년 추천하는 장소</h5>
                            <p className="mb-3 font-normal text-gray-900 dark:text-gray-400">한국 관광지 100선</p>
                            <a href="https://korean.visitkorea.or.kr/other/otherService.do?otdid=622bcd99-84fa-11e8-8165-020027310001" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                더 알아보기
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                < div id="email-newsletter" className="my-30 flex justify-around p-20" >
                    <div>
                        <p className="ml-20 letter text-2xl font-serif p-3 underline decoration-indigo-500">Ria-2JMU <br />Email Newsletter</p>
                    </div>
                    <div className="mr-20">
                        <input type="text" name="email" id="email" className="block mb-3 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="Enter your email address" />
                        <label htmlFor="email" className="block mb-3 text-sm font-bold leading-6  text-gray-900">Email me about</label>

                        <div className="flex items-center mb-4">
                            <input id="country-option-1" type="radio" name="countries" value="Spain" className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-3" aria-describedby="country-option-3" />
                            <label htmlFor="country-option-1" className="text-sm font-medium text-gray-900 ml-2 block">
                                Recommand best area
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="country-option-2" type="radio" name="countries" value="Spain" className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-3" aria-describedby="country-option-3" />
                            <label htmlFor="country-option-2" className="text-sm font-medium text-gray-900 ml-2 block">
                                Introduce new datas
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="country-option-3" type="radio" name="countries" value="Spain" className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-3" aria-describedby="country-option-3" />
                            <label htmlFor="country-option-3" className="text-sm font-medium text-gray-900 ml-2 block">
                                Suggest a famous place
                            </label>
                        </div>

                        <button className="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true">Send</button>
                    </div>
                </div >

            </div >
        </>
    )
}

export default MainBody;