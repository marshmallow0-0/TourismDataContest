//MainBody은 파일을 업로드하고 백엔드와 통신하여 성공하면 SearchPage로 이동하는 부분이다 
//이 파일은 메인화면의 Drop Box Area Pickture 요소와 crop 요소, 2024년 추천 장소 요소 Email Newsletter 요소 4개를 가지고 있다. 

//TODO
//현재 function을 const 변수에 저장하는 형식과 function으로 설정하는 방식이 혼재하고 있으므로 형식을 통일할 필요가 있다
//id recommend-area 부분은 추천 장소 요소는 더 알아보기 클릭 후 처리하는 부분이 존재하지 않는다.
//이메일을 입력하고 send 버튼을 눌러도 처리되는 로직이 존재하지 않는다.
//proxy 관련 설정을 localhost:8080 으로 설정하여 기존 이미지 업로드 방법이 유효하지 않아서 온라인으로 이미지 파일을 가져오거나 src 아래 폴더를 새로 만들어야 한다
//이미지가 업로드되지 않으면 버튼 클릭 자체를 막아야한다  

import "cropperjs/dist/cropper.css";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banners } from "../data";

// import ModalExample from '../../components/Modal';
// import CheckBoxGroup from '../../components/MainCheckBoxGroup';
import Top from "./Top";
import initializeDragAndDrop from "../../functions/initializeDragAndDrop";

import Section from "./Section"
import { useSelector } from "react-redux";

import { useLocation } from 'react-router-dom';
import { currentUser, getCurrentUser } from "../../api/api";

import { useDispatch } from 'react-redux';
import { loginActions } from '../../store/loginSlice';
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MainBody = () => {

    const [kakaotoken, setToken] = useState(null); // token 상태 정의

    useEffect(() => {
        // URL 분석하기
        const url = new URL(window.location.href);

        // URLSearchParams 객체로 쿼리 파라미터 분석하기
        const params = new URLSearchParams(url.search);

        // 'token' 파라미터 추출하기
        const tokenFromUrl = params.get('token');
        console.log(params);
        if (tokenFromUrl) {
            // 추출한 token을 상태에 저장하기
            setToken(tokenFromUrl);

            dispatch(loginActions.login({ token: kakaotoken }));  // 사용자 정보를 Redux에 저장
            // 필요 시 로컬 스토리지에 저장
            localStorage.setItem('token', tokenFromUrl);
            console.log(tokenFromUrl, "카카오 토큰")
        }
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    const token = useSelector((state) => state.login?.token || null);  // 토큰이 없을 때 null을 기본값으로 설정
    console.log("토큰확인", token);
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    console.log("로그인 여부 확인", isAuthenticated)
    const [user, setUser] = useState(location.state?.user || null);  // navigate로 받은 user 정보를 먼저 확인
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    // const checkLoginStatus = async () => {
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}/user/me`, {
    //             withCredentials: true, // 쿠키 포함
    //         });
    //         if (response.data.user) {
    //             dispatch(loginActions.login(response.data.user)); // 사용자가 로그인 상태일 경우
    //         } else {
    //             dispatch(loginActions.logout());
    //         }
    //     } catch (error) {
    //         console.error('세션 확인 중 오류 발생', error);
    //         dispatch(loginActions.logout());
    //     }
    // };

    // useEffect(() => {
    //     checkLoginStatus(); // 컴포넌트가 마운트될 때 로그인 상태 확인
    // }, []);

    // 컴포넌트가 마운트될 때 사용자 정보를 가져옴
    useEffect(() => {
        // 만약 navigate로 전달된 사용자 정보가 없다면, 서버에서 정보를 가져옵니다.
        if (token) {
            const fetchCurrentUser = async () => {
                try {
                    const userData = await getCurrentUser(token);  // 서버에서 사용자 정보 가져오기
                    setUser(userData);  // 사용자 정보 설정
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        console.log('User is not authenticated');
                        setError('로그인이 필요합니다.');
                        //navigate('/auth');  // 인증되지 않은 경우 로그인 페이지로 이동
                    } else {
                        console.error('Error fetching user data:', error);
                        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
                    }
                }
            };

            fetchCurrentUser();
        }
    }, []);  // user가 없을 때만 실행되도록 설정


    const selectedCities = useSelector(state => state.checkbox.selectedCities);
    const checkboxes = useSelector(state => state.checkbox.checkboxes);

    const defaultSrc = Banners[1].image;
    const [image, setImage] = useState(defaultSrc);
    const [uploadedImage, setUploadedImage] = useState(null); //이미지가 업로드되면 그 이미지를 저장하는 상태 
    const [isImageUploaded, setIsImageUploaded] = useState(false); //이미지가 업로드되어 있는지를 확인하는 상태
    const [imageFile, setImageFile] = useState(null); //파일이 업로드되면 해당 파일을 저장하는 상태 
    //const [loading, setLoading] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [modal, setModal] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);



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


    return (
        <>
            <div className="mt-10">

                <div>
                    <div className='mx-auto '>
                        <Top />
                    </div>
                    {/* <ImageSearch /> */}
                    <Section user={user} />
                </div>

            </div >
        </>
    )
}

export default MainBody;

