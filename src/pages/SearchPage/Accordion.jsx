import { useState } from 'react';

export default function Accordion({ selectedTags, selectedCities }) {
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [isCityOpen, setCityOpen] = useState(false);

    // 상태 변경을 위한 함수
    const toggleCategory = () => {
        setCategoryOpen(!isCategoryOpen);
    };

    const toggleCity = () => {
        setCityOpen(!isCityOpen);
    };
    // 상태 변화 확인을 위해 로그 추가
    console.log("isCategoryOpen:", isCategoryOpen);
    console.log("isCityOpen:", isCityOpen);

    return (
        <div>
            <div className="my-6 text-center">
                {/* 카테고리 */}
                <button
                    className="w-40 h-12 text-center font-semibold text-lg mb-4 cursor-pointer hover:bg-lime-600 bg-lime-500 text-white px-3 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105" // 버튼 스타일 개선
                    onClick={toggleCategory}
                >
                    카테고리 {isCategoryOpen ? '▲' : '▼'}
                </button>

                {isCategoryOpen && (
                    <div className="grid grid-cols-3 gap-1 w-1/2 mx-auto">
                        {selectedTags.map((tag) => (
                            <div key={tag} className="bg-lime-500 sm:text-xs text-white px-3 py-3 mb-4 rounded-full flex  justify-center  items-center text-sm">
                                {tag}
                            </div>
                        ))}
                    </div>
                )}

                {/* 지역 */}
                <button
                    className="w-40 h-12 font-semibold  text-lg mb-4 cursor-pointer hover:bg-indigo-600 bg-indigo-500 text-center text-white px-3 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105" // 버튼 스타일 개선
                    onClick={toggleCity}
                >
                    지역{isCityOpen ? '▲' : '▼'}
                </button>
                {isCityOpen && (
                    <div className="grid grid-cols-4 gap-3 w-1/2 mx-auto">
                        {selectedCities.map((city) => (
                            <div key={city} className="bg-indigo-500 sm:text-xs text-white px-3 py-2 rounded-full justify-center flex items-center text-sm ">
                                {city}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
