// // 필요한 React 및 외부 라이브러리 import
// import React, { useEffect, useState, useRef } from 'react';
// import ModalExample from '../../components/Modal'; // 모달 컴포넌트 가져오기
// import initializeDragAndDrop from '../../functions/initializeDragAndDrop'; // 드래그 앤 드롭 초기화 함수 가져오기
// import { Cropper } from 'react-cropper'; // 이미지 자르기 기능을 위한 라이브러리
// import 'cropperjs/dist/cropper.css'; // Cropper.js의 기본 CSS 파일 가져오기
// import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
// import { useDispatch, useSelector } from 'react-redux'; // 리덕스 훅 사용
// import { imageActions } from '../../store/imageSlice'; // 이미지 관련 리덕스 슬라이스 가져오기
// import { getRecommendPlaces, getTouristImages, getRandomPlaces } from '../../api/api'; // API 요청 함수 가져오기

// // DragAndDropArea 컴포넌트 정의
// const DragAndDropArea = ({
//     imageFile, // 파일 업로드 시 전달된 이미지 파일
//     uploadedImage, // 업로드된 이미지를 표시하기 위한 객체
//     handleDrop, // 드래그 앤 드롭 처리 함수
//     handleFileChange, // 파일 변경 시 호출되는 함수
//     buttonVisible, // 버튼이 표시되어야 하는지 여부
//     isImageUploaded, // 이미지가 업로드되었는지 여부
//     handleHowButtonClick, // "How to use" 버튼 클릭 시 호출되는 함수
//     modalIsOpen, // 모달이 열려있는지 여부
// }) => {
//     // 상태 관리: 자르기 모달이 열려 있는지 여부, 자른 이미지 정보
//     const [cropModalIsOpen, setCropModalIsOpen] = useState(false);
//     const cropperRef = useRef(null); // Cropper 인스턴스 참조를 위한 useRef 사용
//     const [croppedImage, setCroppedImage] = useState(null); // 자른 이미지 저장 상태
//     const navigate = useNavigate(); // 페이지 이동을 위한 훅

//     // 이미지를 자를 때 자르기 모달을 열기 위한 함수
//     const handleCropButtonClick = () => {
//         setCropModalIsOpen(true);
//     };

//     // 이미지 자르기 함수: Cropper.js에서 자른 이미지를 데이터 URL로 변환
//     const handleCrop = () => {
//         if (cropperRef.current) {
//             setCroppedImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL()); // 자른 이미지 저장
//             setCropModalIsOpen(false); // 자르기 모달 닫기
//         }
//     };

//     const dataURLtoFile = (dataUrl, fileName) => {
//         const arr = dataUrl.split(',');
//         const mime = arr[0].match(/:(.*?);/)[1];
//         const bstr = atob(arr[1]);
//         let n = bstr.length;
//         const u8arr = new Uint8Array(n);
//         while (n--) {
//             u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new File([u8arr], fileName, { type: mime });
//     }

//     // AI 검색 버튼 클릭 시 호출되는 함수: 이미지를 서버로 전송하여 추천 장소를 검색
//     const handleAiSearchClick = () => {

//         let imageToSend;

//         // croppedImage가 있으면 자른 이미지를 사용, 없으면 원본 이미지 사용
//         if (croppedImage) {
//             imageToSend = dataURLtoFile(croppedImage, 'cropped_image.png');
//         } else if (imageFile) {
//             imageToSend = imageFile;
//         } else {
//             console.error("Image file is missing");
//             return;
//         }

//         console.log("Button Clicked");
//         console.log("ImageFile:2 ", imageToSend); // 업로드된 이미지 파일 로그 출력

//         // 이미지 파일이 존재할 경우 처리
//         if (imageToSend) {
//             const formData = new FormData();
//             formData.append('user_image', imageToSend); // 이미지 파일을 FormData에 추가
//             formData.append('user_text', "바람"); // 추가 텍스트 정보(예: "바람")

//             console.log([...formData.entries()]); // FormData 내 모든 항목 출력

//             // API 요청: getRecommendPlaces 함수를 통해 이미지 기반 추천 장소 가져오기
//             getRecommendPlaces(formData)
//                 .then((jsonData) => {
//                     console.log("0");
//                     console.log(jsonData);
//                     // navigate('/search', { state: { jsonData, uploadedImage: imageFile } }); // 검색 결과 페이지로 이동
//                     navigate('/search', { state: { jsonData, uploadedImage: URL.createObjectURL(imageToSend) } });

//                 })
//                 .catch(error => {
//                     console.error(error);
//                     navigate('/fail', { state: { uploadedImage: URL.createObjectURL(imageToSend) } }); // 실패 시 실패 페이지로 이동
//                 });
//         } else {
//             console.error("이미지 파일이 없음"); // 이미지 파일이 없을 경우 오류 로그 출력
//         }
//     };

//     // JSX 렌더링
//     return (
//         <div>
//             <div id="drag-drop-area" className="text-center flex flex-col sm:flex-row justify-center mt-10 ml-10" onDrop={handleDrop}>
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                     {/* 파일 업로드 input */}
//                     <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
//                     {uploadedImage && uploadedImage.src ? (
//                         // 업로드된 이미지가 있으면 자른 이미지가 우선적으로 표시되고, 자른 이미지가 없으면 업로드된 이미지가 표시됨
//                         <div>
//                             <img
//                                 className="uploadImg w-72 h-64 sm:w-96 sm:h-80 min-w-[16rem] sm:min-w-[20rem] min-h-[14rem] sm:min-h-[18rem] flex rounded-md border-4 border-dashed border-gray-300 p-2"
//                                 src={croppedImage ? croppedImage : uploadedImage.src}
//                                 alt="upload"
//                             />
//                             <div className="flex flex-row gap-4 mt-4 justify-center"> {/* 버튼을 가로로 정렬 및 간격 설정 */}
//                                 {/* Ai Search 버튼 */}
//                                 <button
//                                     className="bg-indigo-700 w-24 sm:w-28 h-10 text-center rounded-md text-xs text-white font-Pretendard"
//                                     onClick={handleAiSearchClick}>
//                                     검색하기
//                                 </button>

//                                 {/* Crop Image 버튼 */}
//                                 <button
//                                     className="w-24 sm:w-28 h-10 text-center bg-indigo-700 rounded-md px-2 py-2 text-xs text-white font-Pretendard"
//                                     onClick={handleCropButtonClick}>
//                                     이미지 자르기
//                                 </button>
//                             </div>
//                         </div>
//                     ) : (
//                         // 업로드된 이미지가 없으면 기본 이미지 표시
//                         <div>
//                             <img
//                                 className="uploadImg w-72 h-64 sm:w-96 sm:h-80 min-w-[16rem] sm:min-w-[20rem] min-h-[14rem] sm:min-h-[18rem] flex rounded-md border-4 border-dashed border-gray-300 p-2"
//                                 src="./img/in_drop_box.png"
//                                 alt="noUpload"
//                             />
//                             <div className="flex flex-row gap-4 mt-4 justify-center"> {/* 버튼을 가로로 정렬 및 간격 설정 */}
//                                 {/* Ai Search 버튼 */}
//                                 <button
//                                     className="bg-gray-600 w-24 sm:w-28 h-10 text-center rounded-md text-xs text-white font-Pretendard"
//                                     >
//                                     검색하기
//                                 </button>

//                                 {/* Crop Image 버튼 */}
//                                 <button
//                                     className="bg-gray-600 w-24 sm:w-28 h-10 text-center rounded-md text-xs text-white font-Pretendard"
//                                     >
//                                     이미지 자르기
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </label>
//                 {!buttonVisible && !modalIsOpen && <ModalExample />} {/* 모달 예시 표시 */}
//             </div>

//             {/* 자르기 모달 */}
//             {cropModalIsOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//                     <div className="bg-white p-4 max-w-lg rounded-lg">
//                         <h2 className="text-xl mb-4">Crop Image</h2>
//                         <Cropper
//                             className='w-full'
//                             ref={cropperRef}
//                             src={uploadedImage?.src} // 자를 이미지 소스
//                             style={{ height: '100%', width: '100%' }}
//                             initialAspectRatio={1} // 초기 자르기 비율
//                             background={false} // 배경 없음
//                             guides={false} // 가이드 라인 숨김
//                             responsive={true} // 반응형
//                             autoCropArea={1} // 자동 자르기 영역
//                         />
//                         <div className='flex justify-end'>
//                             {/* 자르기 완료 버튼 */}
//                             <button onClick={handleCrop} className="bg-indigo-700 text-white p-2 mr-2 mt-4 rounded-md">Crop</button>
//                             {/* 자르기 취소 버튼 */}
//                             <button onClick={() => setCropModalIsOpen(false)} className="bg-gray-500 text-white p-2 mt-4 rounded-md">Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DragAndDropArea;
import React, { useState, useRef, useEffect } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { useDispatch, useSelector } from 'react-redux';
import { checkboxActions } from '../../store/checkboxSlice';
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;


// const city = [
//     "busan", "daegu", "daejeon", "gangwon", "gwangju", "gyeonggi",
//     "incheon", "sejong", "seoul", "jeju",
//     "north_chungcheong", "north_gyeongsang", "north_jeolla",
//     "south_chungcheong", "south_gyeongsang", "south_jeolla", "ulsan"
// ];

// const mapping = {};

// city.forEach((cityName, index) => {
//     mapping[cityName] = index;
// });

// const category = ["architecture", "resort", "nature", "culture", "landmark"];

// console.log(mapping);


// const categoryMapping = {};

// category.forEach((categoryName, index) => {
//     categoryMapping[categoryName] = index;
// });

// console.log(categoryMapping);


const DragAndDropArea = ({
    imageFile,
    uploadedImage,
    handleDrop,
    handleFileChange,
    buttonVisible,
    isImageUploaded,
    modalIsOpen,
    token
}) => {
    const dispatch = useDispatch();

    const regions2 = {
        "seoul": 1,
        "gangwon": 2,
        "incheon": 3,
        "north_chungcheong": 4,
        "daejeon": 5,
        "south_chungcheong": 6,
        "daegu": 7,
        "north_gyeongsang": 8,
        "south_gyeongsang": 8,
        "gwangju": 9,
        "busan": 11,
        "north_jeolla": 12,
        "ulsan": 13,
        "south_jeolla": 14,
        "sejong": 15,
        "jeju": 16,
        "gyeonggi": 17
    };

    const regions = {
        "서울": 1,
        "강원": 2,
        "인천": 3,
        "충북": 4,
        "대전": 5,
        "충남": 6,
        "대구": 7,
        "경북": 8,
        "광주": 9,
        "경남": 10,
        "부산": 11,
        "전북": 12,
        "울산": 13,
        "전남": 14,
        "세종": 15,
        "제주": 16,
        "경기": 17
    };

    // Redux에서 checkedValues와 mappedValues 가져오기
    const checkboxes = useSelector(state => state.checkbox.checkboxes || []);
    const selectedCities = useSelector(state => state.checkbox.selectedCities || []);
    console.log("selected도시", selectedCities)
    const checkedValues = useSelector(state => state.checkbox.checkedValues || []);
    const mappedValues = useSelector(state => state.checkbox.mappedValues || []);

    // 지역 ID와 카테고리 ID를 상태로 관리
    const [regionIdsString, setRegionIdsString] = useState('');
    const [categoryIdsString, setCategoryIdsString] = useState('');

    useEffect(() => {
        // 중복을 제거하여 고유한 지역명만 가져옴 (selectedCities 사용)
        const uniqueSelectedCities = [...new Set(selectedCities)];

        console.log("Selected Cities Before Filtering:", uniqueSelectedCities);  // 추가한 로그

        // 지역명을 숫자로 변환
        const numericMappedValues = uniqueSelectedCities
            .filter(cityName => {
                const isInRegions = regions[cityName] !== undefined;
                if (!isInRegions) {
                    console.warn(`Region not found for: ${cityName}`);  // 매핑되지 않는 값 로그 출력
                }
                return isInRegions;  // 존재하는 지역만 필터링
            })
            .map(cityName => regions[cityName]);  // 숫자로 변환

        console.log("Numeric Mapped Values After Mapping:", numericMappedValues);  // 추가한 로그

        // checkedValues에서도 중복 제거
        const uniqueCheckedValues = [...new Set(checkedValues)];

        // 변환된 숫자 값과 카테고리 값으로 문자열 설정
        setRegionIdsString(numericMappedValues.join(','));
        setCategoryIdsString(uniqueCheckedValues.join(','));

        console.log("Region IDs String:", numericMappedValues.join(','));
        console.log("Category IDs String:", uniqueCheckedValues.join(','));

    }, [checkboxes, selectedCities, checkedValues]); // mappedValues 제거, selectedCities 사용




    const [cropModalIsOpen, setCropModalIsOpen] = useState(false);
    const cropperRef = useRef(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [loading, setLoading] = useState(false); // loading 상태 추가
    const navigate = useNavigate();

    const handleCropButtonClick = () => {
        setCropModalIsOpen(true);
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            setCroppedImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
            setCropModalIsOpen(false);
        }
    };

    const dataURLtoFile = (dataUrl, fileName) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);  // Base64 데이터가 여기 저장됨
            reader.onerror = error => reject(error);
        });
    };

    // Ai 검색 버튼 클릭 시 이미지 전송 및 검색 수행
    const handleAiSearchClick = async () => {
        let imageToSend;

        // 이미지를 변환해서 전송할 준비
        if (croppedImage) {
            imageToSend = dataURLtoFile(croppedImage, 'cropped_image.png');
        } else if (imageFile) {
            imageToSend = imageFile;
        } else {
            console.error("Image file is missing");
            return;
        }

        console.log("Image file selected: ", imageToSend);

        if (imageToSend) {
            const formData = new FormData();
            formData.append('user_image', imageToSend);  // 업로드할 이미지

            try {
                setLoading(true);  // 로딩 상태 활성화

                // 쿼리 파라미터로 전송될 값 설정
                const params = {
                    user_text: "seoul",  // 텍스트 필드
                    region_ids: regionIdsString,  // 쉼표로 구분된 지역 ID들
                    category_ids: categoryIdsString,  // 쉼표로 구분된 카테고리 ID들
                    top_N: 5  // 상위 N개의 결과 (기본값 5)
                };

                const response = await axios.post(
                    `${API_BASE_URL}/ai/find-similar-image/`,  // 서버의 엔드포인트
                    formData,  // FormData로 이미지 전송
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',  // 파일 전송을 위한 헤더
                            'Authorization': `Bearer ${token}`,  // Bearer 토큰 추가
                        },
                        params,  // 쿼리 스트링 파라미터로 추가
                    }
                );

                console.log("Response from server: ", response.data);
                // File 객체를 Base64로 변환
                const base64Image = await convertToBase64(imageToSend);

                localStorage.setItem('jsonData', JSON.stringify(response.data));
                localStorage.setItem('uploadedImage', base64Image);
                // 검색 결과 페이지로 이동하며 결과 데이터 전달
                navigate('/search', { state: { jsonData: response.data, uploadedImage: URL.createObjectURL(imageToSend) } });
            } catch (error) {
                console.error("Error during AI search: ", error);
                // 실패 시 실패 페이지로 이동
                navigate('/fail', { state: { uploadedImage: URL.createObjectURL(imageToSend) } });
            } finally {
                setLoading(false);  // 로딩 상태 종료
            }
        }
    };

    return (
        <div>
            <div id="drag-drop-area" className="text-center flex flex-col sm:flex-row justify-center mt-10 ml-10" onDrop={handleDrop}>
                <label htmlFor="file-upload" className="cursor-pointer">
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                    {uploadedImage && uploadedImage.src ? (
                        <div>
                            <img
                                className="uploadImg w-72 h-64 sm:w-96 sm:h-80 min-w-[16rem] sm:min-w-[20rem] min-h-[14rem] sm:min-h-[18rem] flex rounded-md border-4 border-dashed border-gray-300 p-2"
                                src={croppedImage ? croppedImage : uploadedImage.src}
                                alt="upload"
                            />
                            <div className="flex flex-row gap-4 mt-4 justify-center">
                                <button
                                    className="bg-indigo-700 w-24 sm:w-28 h-10 text-center rounded-md text-xs text-white font-Pretendard"
                                    onClick={handleAiSearchClick}
                                    disabled={loading} // 로딩 중일 때 버튼 비활성화
                                >
                                    {loading ? 'Searching...' : '검색하기'}
                                </button>

                                <button
                                    className="w-24 sm:w-28 h-10 text-center bg-indigo-700 rounded-md px-2 py-2 text-xs text-white font-Pretendard"
                                    onClick={handleCropButtonClick}
                                >
                                    이미지 자르기
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <img
                                className="uploadImg w-72 h-64 sm:w-96 sm:h-80 min-w-[16rem] sm:min-w-[20rem] min-h-[14rem] sm:min-h-[18rem] flex rounded-md border-4 border-dashed border-gray-300 p-2"
                                src="./img/in_drop_box.png"
                                alt="noUpload"
                            />
                            <div className="flex flex-row gap-4 mt-4 justify-center">
                                <button className="bg-gray-600 w-24 sm:w-28 h-10 text-center rounded-md text-xs text-white font-Pretendard">
                                    검색하기
                                </button>

                                <button className="bg-gray-600 w-24 sm:w-28 h-10 text-center rounded-md text-xs text-white font-Pretendard">
                                    이미지 자르기
                                </button>
                            </div>
                        </div>
                    )}
                </label>
            </div>

            {cropModalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-4 max-w-lg rounded-lg">
                        <h2 className="text-xl mb-4">Crop Image</h2>
                        <Cropper
                            className='w-full'
                            ref={cropperRef}
                            src={uploadedImage?.src}
                            style={{ height: '100%', width: '100%' }}
                            initialAspectRatio={1}
                            background={false}
                            guides={false}
                            responsive={true}
                            autoCropArea={1}
                        />
                        <div className='flex justify-end'>
                            <button onClick={handleCrop} className="bg-indigo-700 text-white p-2 mr-2 mt-4 rounded-md">
                                Crop
                            </button>
                            <button onClick={() => setCropModalIsOpen(false)} className="bg-gray-500 text-white p-2 mt-4 rounded-md">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DragAndDropArea;
