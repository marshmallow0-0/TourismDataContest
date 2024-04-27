import React from 'react';

const SearchListButtons = ({ handleButtonClick, placeName, index }) => {
    const buttons = [
        { category: '', id: 0, img: './img/info.png', label: '정보' },
        { category: 'CE7', id: 1, img: './img/cafe.png', label: '카페' },
        { category: 'FD6', id: 2, img: './img/restaurant.png', label: '음식' },
        { category: 'AT4', id: 3, img: './img/tour.png', label: '관광' }
    ];


    return (
        <div className="absolute bottom-0 left-0 text-xs text-center flex space-x-5">
            {buttons.map((button) => (
                <button key={button.id} className="ml-3 mb-2 w-10 px-2  rounded-md text-white hover:bg-slate-400 hover:ease-out duration-500 flex flex-col items-center" onClick={() => handleButtonClick(button.category, button.id, placeName, index)}>
                    <div className={`mb-1 bg-auto bg-no-repeat bg-center w-8 h-6`} style={{ backgroundImage: `url(${button.img})` }}></div>
                    <span>{button.label}</span>
                </button>
            ))}
        </div>
    );
};

export default SearchListButtons;