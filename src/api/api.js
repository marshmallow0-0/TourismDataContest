import axios from 'axios';
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const API_BASE_URL = "http://localhost:8000";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;


// Main Page 배너의 무작위 사진 배치 API
export const getTouristImages = async (num) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/tourist-images`, 
        {
            params: { num }  // 가져오고자 하는 사진의 갯수 전달
        });
        console.log(response.data);  // 응답 데이터 확인
        return response.data;  // 성공 시 응답 데이터를 반환
    } catch (error) {
        console.error('무작위 사진 가져오기 오류:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 사용자 로그인 API
export const getUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user-profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`사용자 아이디${userId}:`, error);
        throw error;
    }
};


// 사용자 로그아웃 API
export const getLogOut = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/OkLogOut`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getLogOut2 = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/logout`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async ({ id, nickname, password, email }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            id,
            nickname,
            password,
            email
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });


        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        console.log('사용자 등록 성공:', data);
        return data;
    } catch (error) {
        console.error('등록 실패', error);
    }
};

// 현재 사용자
export const currentUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/me`, { withCredentials: true });
        console.log("currentUser",response.data);  // 현재 로그인한 사용자 정보 출력
        return response.data;  // 서버에서 받은 사용자 정보 반환
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('허가받지 않은 사용자');
            // 로그인 페이지로 리다이렉트하는 로직 추가
            window.location.href = '/auth'; 
        }
    }
};

// 랜덤 장소 추천 API
export const getRandomPlaces = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/get_random-place`);
        return response.data;
    } catch (error) {
        console.error('랜덤 장소', error);
        throw error;
    }
};

// 인기 장소 추천 API
export const getPopularPlaces = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/get_popular_places`);
        return response.data;
    } catch (error) {
        console.error('인기장소', error);
        throw error;
    }
};

// AI 이미지 기반 장소 검색 API (주요 기능)
export const getRecommendPlaces = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ai/find-similar-image/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('추천장소:', error);
        throw error;
    }
};
// 장소명 기반 상세한 장소 가져오기 API
export const getDetailPlace = async (place_name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/get_detail_place`, {
            params: { place_name }
        });
        return response.data;
    } catch (error) {
        console.error(`세부사항 ${place_name}:`, error);
        throw error;
    }
};

// 좌표 기반 근처 식당 및 관광지 정보 가져오기 API
export const getNearbyTouristInfo = async (coordinates) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/get_nearby_tourlist/`, {
            params: coordinates
        });
        return response.data;
    } catch (error) {
        console.error('근처관광지', error);
        throw error;
    }
};


export const handleSearch = async (query, setResult) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/search/`, { query });
      setResult(response.data); // 검색 결과 업데이트
    } catch (error) {
      console.error('Error searching:', error);
    }
};

export const handleAddFavorite = async (filename) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/favorites/`, { filename });
      alert(response.data.message); // 성공 메시지 알림
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
};

export const fetchFavorites = async (setFavorites) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/favorites/`);
      setFavorites(response.data); // 즐겨찾기 목록 업데이트
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
};

export const fetchSearchHistory = async (setHistory) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search/history/`);
      setHistory(response.data); // 검색 기록 업데이트
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
};

// import React, { useState, useEffect } from 'react';
// import { handleSearch, handleAddFavorite, fetchFavorites, fetchSearchHistory } from './apiFunctions';

// const MyComponent = () => {
//   const [query, setQuery] = useState('');
//   const [filename, setFilename] = useState('');
//   const [result, setResult] = useState(null);
//   const [favorites, setFavorites] = useState([]);
//   const [history, setHistory] = useState([]);

//   const onSearch = () => handleSearch(query, setResult);
//   const onAddFavorite = () => handleAddFavorite(filename);
//   const loadFavorites = () => fetchFavorites(setFavorites);
//   const loadHistory = () => fetchSearchHistory(setHistory);

//   useEffect(() => {
//     loadFavorites();
//     loadHistory();
//   }, []);

//   return (
//     <div>
//       {/* UI for Search, Favorites, and History */}
//     </div>
//   );
// };