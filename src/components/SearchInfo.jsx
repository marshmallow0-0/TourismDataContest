import React from 'react';

// InfoBlock 컴포넌트 정의
const SearchInfo = ({ buttonSelect, locationAddress }) => {
    const images = {
        0: './img/info_sub.png',
        1: './img/cafe_sub.png',
        2: './img/restaurant_sub.png',
        3: './img/tour_sub.png'
    };

    const texts = {
        0: `"${locationAddress}"의 정보입니다.`,
        1: `"${locationAddress}"의 주변 카페 정보입니다.`,
        2: `"${locationAddress}"의 주변 음식점 정보입니다.`,
        3: `"${locationAddress}"의 주변 관광지 정보입니다.`
    };

    const backgroundImage = `url('${images[buttonSelect]}')`;

    return (
        <div className="flex flex-row mt-10 mb-3 text-indigo-900 text-xl">
            <div className="ml-2 mb-1" style={{ backgroundImage, backgroundSize: 'auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '40px', height: '40px' }}></div>
            <span className="ml-2 mt-2 font-semibold">{texts[buttonSelect]}</span>
        </div>
    );
};

export default SearchInfo;