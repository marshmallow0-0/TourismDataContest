import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SliderComponent.css'; // CSS 파일을 따로 만들어서 스타일을 적용

const images = [
    'https://cdn.pixabay.com/photo/2023/02/01/10/37/sunset-7760143_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/07/22/13/23/coast-7338147_1280.jpg',
    'https://cdn.pixabay.com/photo/2024/01/04/16/48/landscape-8487906_1280.jpg',
];

const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px'
    };

    return (
        <div className="relative">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slider-image-wrapper">
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="slider-image w-72 h-72"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
