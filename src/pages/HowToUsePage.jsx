import { motion } from "framer-motion";
import useObserver from "../hooks/useObserver";
import BasicLayout from "../layouts/BasicLayout";
import { opacityVariants } from "../styles/animation";

import { createRef } from "react";
import Cropper from "react-cropper"; // ReactCropperElement import 제거
import "cropperjs/dist/cropper.css";

import React, { useEffect, useState } from 'react';
import initializeDragAndDrop from '../functions/initializeDragAndDrop'
import { useNavigate } from 'react-router-dom';
import { Banners, NOTUPLOAD } from "../pages/data";
import CheckBoxGroup from '../components/MainCheckBoxGroup';
import './modal.css';

const HowToUsePage = () => {
    const { ref, animation } = useObserver();
    const defaultSrc = Banners[1].image;
    const [image, setImage] = useState(defaultSrc);

    //const [croppedImage, setCroppedImage] = useState(null); //이미지가 업로드되면 그 이미지를 저장하는 상태 
    // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    // const imgInput = useRef();

    // const [imageSrc, setImageSrc] = useState(null); // 업로드된 이미지의 Base64 인코딩 문자열
    // const [crop, setCrop] = useState({ x: 0, y: 0 });
    // const [zoom, setZoom] = useState(1);

    // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //     console.log(croppedArea, croppedAreaPixels);
    //     // 여기에서 필요한 경우 크롭 처리를 할 수 있습니다.
    // }, []);



    const [uploadedImage, setUploadedImage] = useState(null); //이미지가 업로드되면 그 이미지를 저장하는 상태 
    const [isImageUploaded, setIsImageUploaded] = useState(false); //이미지가 업로드되어 있는지를 확인하는 상태
    const [imageFile, setImageFile] = useState(null); //파일이 업로드되면 해당 파일을 저장하는 상태 
    //const [loading, setLoading] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    //const [modal, setModal] = useState(false);

    //const [modalIsOpen, setModalIsOpen] = useState(false);

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


    //const navigate = useNavigate(); //사용자를 다른 경로로 이동시키는 함수

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


    const backgroundImageStyle = {

        backgroundImage: checkedValues[0] && !checkedValues[1] ? "url('./img/incheon3.jpeg')" :
            !checkedValues[0] && checkedValues[1] ? "url('./img/seoul2.jpeg')" :
                checkedValues[0] && checkedValues[1] ? "url('./img/korea.png')" :
                    "url('./img/selectRegion.png')", // 모두 선택하지 않은 경우를 기본 이미지로 설정 

        backgroundSize: checkedValues[0] && !checkedValues[1] ? '100% 100%' : // 첫 번째 이미지 크기
            !checkedValues[0] && checkedValues[1] ? '130% 120%' : // 두 번째 이미지 크기
                checkedValues[0] && checkedValues[1] ? '80% 80%' : // 세 번째 이미지 크기
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

    const [cropData, setCropData] = useState("");
    const cropperRef = createRef(); // 타입 어노테이션 제거



    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
    };

    const [isHovering, setIsHovering] = useState(false);

    const [Key, setKey] = useState(null);

    const [howmodal, setHowmodal] = useState(false);
    const [howmodalIsOpen, setHowmodalIsOpen] = useState(false);
    const [aimodalIsOpen, setAimodalIsOpen] = useState(false);
    const [dropmodalIsOpen, setDropmodalIsOpen] = useState(false);
    const [checkmodalIsOpen, setCheckmodalIsOpen] = useState(false);
    const [cropmodalIsOpen, setCropmodalIsOpen] = useState(false);



    const howtoggleModal = () => {
        setHowmodalIsOpen(!howmodalIsOpen);
    };

    const aitoggleModal = () => {
        setAimodalIsOpen(!aimodalIsOpen);
    };

    const droptoggleModal = () => {
        setDropmodalIsOpen(!dropmodalIsOpen);
    };

    const checktoggleModal = () => {
        setCheckmodalIsOpen(!checkmodalIsOpen);
    };

    const croptoggleModal = () => {
        setCropmodalIsOpen(!cropmodalIsOpen);
    };



    const handleMouseOver = (key) => {

        setKey(key);

        if (key === 'how') {
            howtoggleModal();
        }
        else if (key === 'ai') {
            aitoggleModal();
        }
        else if (key === 'drop') {
            droptoggleModal();
        }
        else if (key === 'check') {
            checktoggleModal();
        }
        else if (key === 'crop') {
            croptoggleModal();
        }
    };


    return (
        <BasicLayout>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={animation}
                variants={opacityVariants}
            >

                {/* <div className="flex justify-center items-center">
                    {howmodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={howtoggleModal}>&times;</span>
                                <p>how to use</p>
                                <img src="../img/how_to_use.png" alt="howToUse"></img>
                            </div>
                        </div>
                    )}
                    {aimodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={aitoggleModal}>&times;</span>
                                <p>ai search</p>
                                <img src="../img/Ai_search.png" alt="aisearch"></img>
                            </div>
                        </div>
                    )}
                    {dropmodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={droptoggleModal}>&times;</span>
                                <p>drop</p>
                                <img src="../img/drop_box.png" alt="dropbox"></img>
                            </div>
                        </div>
                    )}
                    {checkmodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={checktoggleModal}>&times;</span>
                                <p>check</p>
                                <img src="../img/check_box.png" alt="howToUseCheckBox"></img>
                            </div>
                        </div>
                    )}
                    {cropmodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={croptoggleModal}>&times;</span>
                                <p>crop</p>
                                <img src="../img/crop_image.png"></img>
                            </div>
                        </div>
                    )}
                </div> */}

                <div>
                    {howmodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content w-1/2">
                                <span className="close" onClick={howtoggleModal}>&times;</span>
                                <div className="flex flex-row justify-items-center justify-center">
                                    <img className="" src="./img/how_to_use.png"></img>

                                    <div className="ml-5 mt-10 mb-7 mr-5 font-Pretendard border-2 rounded-3xl border-indigo-700 w-1/3 text-indigo-900">
                                        <h1 className="mt-5 text-xl text-center font-bold">How to use button</h1>
                                        <br />
                                        <div className="flex justify-center items-center">
                                            <img className="w-1/3" src="./img/how_to_use_info.png" />
                                        </div>
                                        <br />
                                        <div className="ml-3 mr-3">
                                            <span className="mt-2 text-lg font-semibold">[How to use]버튼은 RIA프로그램의 설명창으로 이동합니다.</span>

                                            <div className="mt-4 ml-2 text-sm">
                                                <p> - 사용법은 이 페이지에 나와있습니다. </p>
                                                <p className="mt-2"> - 더 궁금한 내용이나 이해가 되지 않는다면 Ria2024@gmail.com으로 메일을 보내주세요.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                    {aimodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={aitoggleModal}>&times;</span>
                                <div className="flex flex-row justify-items-center justify-center">
                                    <img className="w-3/5" src="./img/Ai_search.png"></img>

                                    <div className="ml-5 mt-10 mb-7 mr-5 font-Pretendard border-2 rounded-3xl border-indigo-700 w-2/5 text-indigo-900">
                                        <h1 className="mt-5 text-xl text-center font-bold">Ai search button</h1>
                                        <br />
                                        <div className="flex justify-center items-center">
                                            <img className="w-1/7" src="./img/Ai_search_info.png" />
                                        </div>
                                        <br />
                                        <div className="ml-3 mr-3">
                                            <span className="mt-2 text-base font-semibold">[Ai search]버튼은 최종적인 작업입니다.</span>

                                            <div className="mt-4 ml-2 text-sm">
                                                <p> - Drop Box에 이미지를 넣었다면 버튼이 파란색으로 활성화 됩니다. </p>
                                                <p className="mt-2"> - 작동하기 위해선 아래의 조건을 모두 충족하여야 합니다.</p>
                                            </div>
                                            <p className="mt-4 text-base font-semibold"> &lt;Condition&gt; </p>
                                            <div className="mt-4 ml-2 text-sm">
                                                <p> 1. Drop box에 이미지를 올립니다. </p>
                                                <p className="mt-2"> 2. Check box들을 기호에 맞게 설정합니다.</p>
                                                <p className="mt-2"> 3. 이미지 자르기를 통해 가고싶은 장소를 구체화 합니다.</p>
                                                <p className="ml-2 mt-2"> - 구체화 하고싶지 않다면 사용하지 않아도 됩니다.</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {dropmodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content w-1/2">
                                <span className="close" onClick={droptoggleModal}>&times;</span>

                                <div className="flex flex-row justify-items-center justify-center">
                                    <img className="w-3/5" src="./img/drop_box.jpg"></img>

                                    <div className="ml-5 mt-10 mb-7 mr-5 font-Pretendard border-2 rounded-3xl border-indigo-700 w-2/5 text-indigo-900">
                                        <h1 className="mt-5 text-xl text-center font-bold">Drop Box Area</h1>
                                        <br />
                                        <div className="flex justify-center items-center">
                                            <img className="w-1/3 rounded-md border-dashed border border-gray-500" src="./img/in_drop_box.png" />
                                        </div>
                                        <br />
                                        <div className="ml-3 mr-3">
                                            <span className="mt-2 text-base font-semibold">[Drop box Area]영역은 이미지를 검색하기위한 기반 영역입니다.</span>

                                            <div className="mt-4 ml-2 text-sm">
                                                <p> - 이미지를 Drag & Drop으로 영역에 업로드 할 수 있습니다. </p>
                                                <p className="mt-2"> - Drop box를 클릭하면 파일 업로드 창이 생성됩니다.</p>
                                                <p className="mt-2"> - 자른 이미지를 올리고 싶을 경우 결과물을 Drag & Drop하여 올리실 수 있습니다.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {checkmodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content w-3/5">
                                <span className="close" onClick={checktoggleModal}>&times;</span>
                                <div className="flex flex-row justify-items-center justify-center">
                                    <img className="w-3/5" src="./img/check_box.png"></img>

                                    <div className="ml-5 mt-10 mb-7 mr-5 font-Pretendard border-2 rounded-3xl border-indigo-700 w-2/5 text-indigo-900">
                                        <h1 className="mt-5 text-xl text-center font-bold">Check box Area</h1>
                                        <br />
                                        <div className="flex justify-center items-center">
                                            <img className="w-2/3" src="./img/check_box_info.png" />
                                        </div>
                                        <br />
                                        <div className="ml-3 mr-3">
                                            <span className="mt-2 text-base font-semibold">[Check box Area]영역은 결과물을 구체화 하는 작업입니다.</span>

                                            <div>
                                                <p className="mt-4 text-base font-semibold"> &lt;Essential&gt; </p>
                                                <div className="ml-2 text-sm">
                                                    <p> - Region의 한 영역을 선택하여야 합니다. </p>
                                                    <p> - Facility의 한 영역을 선택하여야 합니다.</p>

                                                    <div className="mt-5 grid grid-cols-2 font-sm">
                                                        <p>역사(history)</p>
                                                        <p>건물(building)</p>
                                                        <p>휴양지(recration)</p>
                                                        <p>자연(nature)</p>
                                                        <p>문화(culture)</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                    {cropmodalIsOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={croptoggleModal}>&times;</span>

                                <div className="flex flex-row justify-items-center justify-center">
                                    <img src="./img/crop_image.png"></img>

                                    <div className="ml-5 mt-10 mb-7 font-Pretendard border-2 rounded-3xl border-indigo-700 w-1/4 text-indigo-900">
                                        <h1 className="mt-5 text-xl text-center font-bold">Image Crop Area</h1>
                                        <br />
                                        <div className="flex justify-center items-center">
                                            <img className="w-1/3" src="./img/crop_info.png" />
                                        </div>
                                        <br />
                                        <div className="ml-3 mr-3">
                                            <span className="mt-2 text-base font-semibold">[Image Crop Area]영역은 이미지 자르기 도구를 제공하여 줍니다.</span>

                                            <div className="mt-4 ml-2 text-sm">
                                                <p> - 이미지를 잘라 내가 원하는 장소의 특징을 뽑을 수 있습니다. </p>
                                                <p className="ml-5"> a.이 절차가 결과물을 더 상세하게 정의할 수 있습니다.</p>
                                                <p className="mt-2"> - 이미지 자르기를 안할 경우 다른 요소들로 인해 원하는 결과가 나오지 않을 수 있습니다.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                <main className="mx-auto">
                    {/* {GUIDE_STEPS.map((guide) => <Guide {...guide} />)} */}
                    <section className="flex justify-center  py-10 font-Pretendard">
                        <article className="mt-2 ml-12">
                            <header className=" font-semibold text-3xl text-indigo-700">
                                How to Use Ria Service !
                            </header>

                            <div className="flex justify-center pr-80 py-4">
                                <p className="ml-1 text-lg">
                                    Ria Web Service를 사용하는 방법을 가르쳐 드리겠습니다!
                                    <br /><br />
                                    밑줄이 있는 영역을 클릭해보세요!
                                </p>
                            </div>
                        </article>
                    </section>

                    <section>

                        <div>
                            <div className='w-full'>
                                {/* <input type="file" onChange={onChange} /> */}
                                <div id="drag-drop-area" className="text-center flex flex-row justify-center ml-24">
                                    <label htmlFor="file-upload" className="mt-10 cursor-pointer" onClick={() => handleMouseOver('drop')}>
                                        {/* <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} /> */}
                                        {uploadedImage ? <img className="uploadImg max-w-lg h-60 flex rounded-md border-dashed border-2 border-gray-500 p-2" src={uploadedImage.src} alt="upload" /> : <img className="uploadImg w-72 h-60 flex rounded-md border-dashed border-2 border-gray-500 p-2" src={NOTUPLOAD[1].image} alt="noUpload" />}
                                        {/* <CheckBoxGroup onChange={handleCheckboxGroupChange} /> */}
                                    </label>

                                    <div id="uploaded-image-container" className="min-w-72 min-h-72 flex flex-col p-2 ml-10 justify-center items-left" style={backgroundImageStyle}  >
                                        <div className="text-left mb-3 text-4xl font-Pretendard underline underline-offset-4" onClick={() => handleMouseOver('check')}>
                                            Check Box  <br /> Tip Area
                                        </div>

                                        <CheckBoxGroup onChange={handleCheckboxGroupChange} />

                                        {buttonVisible &&
                                            <button
                                                className={`${isImageUploaded ? "bg-indigo-700" : "bg-gray-600"} w-28 h-10 text-center mt-2 mb-2 rounded-md inline text-xs text-white font-Pretendard underline underline-offset-4`} onClick={() => handleMouseOver('ai')}>
                                                Ai Search
                                            </button>
                                        }
                                        <button id='how' className="w-28 h-10 text-center bg-indigo-700 inline-block rounded-md px-2 py-2 text-xs text-white font-Pretendard underline underline-offset-4" onClick={() => handleMouseOver('how')}>How to use</button>
                                    </div>
                                </div >

                                <div className='flex flex-row justify-center items-center gap-10 ml-12 mt-10' >

                                    <div className="text-right border-dashed border-2 border-gray-500 rounded-md">
                                        <div className="flex flex-col items-center">
                                            <div className="border">
                                                {cropData ? (cropData && <img className=" mr-2 ml-2 mt-2 mb-2 w-72 h-60" src={cropData} alt=" " />) : (<img className="mr-2 ml-2 mt-2 mb-2 w-72 h-60" src="./img/no_image.png" />)}
                                            </div>
                                            <br />
                                            <p className="text-md font-Pretendard text-semibold underline underline-offset-4" onClick={() => handleMouseOver('crop')}>Cropped Image</p>
                                            <br />
                                        </div>
                                    </div>
                                    <div className="flex flex-col ml-10">
                                        <Cropper
                                            ref={cropperRef}
                                            className='w-96 h-96'
                                            //style={{ height: "50%", width: "70%" }}
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
                                        <button className="mt-3 w-28 h-10 bg-indigo-700 rounded-md px-2 py-2 text-xs text-white font-Pretendard" onClick={getCropData}>
                                            Crop
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>

                </main>
            </motion.div>
        </BasicLayout>

    );
}

export default HowToUsePage;