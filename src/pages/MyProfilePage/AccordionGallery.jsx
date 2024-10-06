import React, { useState } from 'react';

const AccordionGallery = ({ images, favorites, toggleFavorite }) => {
    // 각 아코디언 항목의 열림 상태를 관리하는 배열
    const [activeIndices, setActiveIndices] = useState([]);

    // 아코디언 항목을 클릭했을 때, 해당 항목의 열림/닫힘 상태를 토글
    const handleAccordionClick = (index) => {
        if (activeIndices.includes(index)) {
            // 이미 열려있으면 닫기
            setActiveIndices(activeIndices.filter((i) => i !== index));
        } else {
            // 열려있지 않으면 열기
            setActiveIndices([...activeIndices, index]);
        }
    };

    return (
        <div className="flex space-x-4 overflow-x-auto">
            {favorites.map((image, index) => {
                // 즐겨찾기 상태 확인
                const isFavorited = favorites.some(fav => fav.name === image.name);

                return (
                    <div
                        key={image.id}
                        className="relative flex-shrink-0 w-64 rounded-lg overflow-hidden"
                    >
                        {/* 아코디언 헤더 (이미지와 타이틀) */}
                        <div
                            className="relative flex items-center justify-between p-4 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
                            onClick={() => handleAccordionClick(index)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={image.blur_image}
                                    alt={image.name}
                                    className={`w-20 h-20 object-cover rounded-full transition-transform duration-300`}
                                />
                                <span className="ml-4 text-lg font-semibold">{image.name}</span>
                            </div>
                            {/* 즐겨찾기 토글 버튼 */}
                            <button
                                className="ml-4 text-lg"
                                onClick={(e) => {
                                    e.stopPropagation(); // 버튼 클릭 시 아코디언 확장 방지
                                    toggleFavorite(image.id); // 즐겨찾기 추가/제거
                                }}
                            >
                                {/* {isFavorited ? '★' : '☆'} */}
                            </button>
                        </div>

                        {/* 아코디언 본문 (이미지 세부 정보) */}
                        {activeIndices.includes(index) && (
                            <div className="p-3 bg-white rounded-lg">
                                <p className="text-sm font-semibold text-gray-700 mb-4">주소
                                    <span className="text-xs text-gray-900 font-medium block mt-1">{image.address}</span>
                                </p>
                                <p className="text-sm font-semibold text-gray-700 mb-4">전화번호
                                    <span className="text-xs text-gray-900 font-medium block mt-1">{image.tel}</span>
                                </p>
                                <p className="text-sm font-semibold text-gray-700 mb-4">주차 가능 여부
                                    <span className="text-xs text-gray-900 font-medium block mt-1">{image.parking}</span>
                                </p>
                                <p className="text-sm font-semibold text-gray-700 mb-4">반려동물 가능 여부
                                    <span className="text-xs text-gray-900 font-medium block mt-1">{image.petsAvailable}</span>
                                </p>

                            </div>
                        )}

                    </div>
                );
            })}
        </div>
    );
};

export default AccordionGallery;
