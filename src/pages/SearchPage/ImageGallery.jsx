import { getTouristImages } from '../../api/api';
import React, { useEffect, useState } from 'react';

// 기본 이미지 배열
const defaultImages = [
    'https://cdn.pixabay.com/photo/2024/08/29/10/01/nature-9006428_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/29/14/58/road-8284023_640.jpg',
    'https://cdn.pixabay.com/photo/2024/08/18/14/34/folkstone-8978132_1280.jpg',
    'https://cdn.pixabay.com/photo/2024/08/28/12/52/mountain-9004008_640.jpg'
];

const ImageGallery = () => {
    const [images, setImages] = useState(defaultImages);  // 기본 이미지를 초기 상태로 설정
    const [activeIndex, setActiveIndex] = useState(0);  // 활성화된 이미지 인덱스 상태
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가

    // API를 사용하여 이미지를 불러오는 로직
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imageData = await getTouristImages(4);  // 백엔드에서 이미지를 요청
                setImages(imageData.map(image => image.img_url));  // 로드된 이미지 URL만 추출하여 상태에 저장
                setLoading(false);  // 로딩이 끝나면 false로 설정
            } catch (error) {
                console.error('이미지를 불러오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchImages();
    }, []);  // 컴포넌트가 마운트될 때 실행

    return (
        <div className="flex mx-auto justify-center items-center w-3/5 h-screen space-x-2">
            {images.map((image, index) => (
                <div
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(-1)}
                    className={`relative flex-shrink-0 h-1/2 overflow-hidden transition-all duration-500 
                        ${index === activeIndex ? 'w-4/5 z-0' : 'w-1/5'} 
                        ${activeIndex === -1 && index === 0 ? 'w-4/5 z-0' : ''}`}
                >
                    <img
                        src={image}
                        alt={`Image ${index}`}
                        className="w-full h-full object-cover transition-transform duration-300"
                    />
                </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 text-white text-5xl font-bold text-center p-10">
                {loading ? "LOADING..." : "RECOMMEND IMAGE AREA"}
            </div>
        </div>
    );
};

export default ImageGallery;
