import axios from 'axios';
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = "http://localhost:8000";

// Main Page 배너의 무작위 사진 배치 API
export const getTouristImages = async (num) => {
    try {
        // POST 요청 시, 데이터는 요청 본문에 포함시킵니다.
        const response = await axios.post(`${API_BASE_URL}/api/api/tourist-images`);
        return response.data;
    } catch (error) {
        console.error('무작위 사진 가져오기 오류', error);
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
        console.log(response.data);  // 현재 로그인한 사용자 정보 출력
        return response.data;  // 서버에서 받은 사용자 정보 반환
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('User is not authenticated');
            // 로그인 페이지로 리다이렉트하는 로직 추가
        }
    }
};

// 랜덤 장소 추천 API
export const getRandomPlaces = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/get_random_places`);
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
        const response = await axios.post(`${API_BASE_URL}/api/find-similar-image/`, formData, {
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
