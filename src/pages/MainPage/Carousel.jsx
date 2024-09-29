import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";

// React Icons 불러오기
import { FcRating } from "react-icons/fc";
import { CiStar } from "react-icons/ci";
import { FaSearch, FaHeart, FaStar } from "react-icons/fa";
const StyledSlider = styled(Slider)`
  .slick-list {
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-dots {
    position: relative;
    bottom: -70px;
    
    li button:before {
      color: gray;
    }
    li.slick-active button:before {
      color: black;
    }
  }
`;

const SlideContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
  text-align: left;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const SlideTextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const SlideTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: black;
`;

const SlideSubtitle = styled.p`
  margin: 5px 0 0;
  color: black;
`;

const SlideLocation = styled.p`
  margin: 5px 0 0;
  color: black;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
  display: flex;
  color: black;
  gap: 10px;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 0.5rem;
  border-radius: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

// const slides = [
//   {
//     img: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg",
//     title: "여행지 추천",
//     subtitle: "가족과 함께 즐거운 시간을 보내세요",
//     location: "서울특별시 강남구",
//     zoom: 1,
//     like: 2,
//     bookmark: 3
//   },
//   {
//     img: "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_640.jpg",
//     title: "조용한 휴식의 도시 강릉",
//     subtitle: "네디슨 칼릴로 함께 즐길 수 있는 강릉",
//     location: "강원 강릉시 강릉대로 33",
//     zoom: 4,
//     like: 5,
//     bookmark: 6
//   },
//   {
//     img: "https://cdn.pixabay.com/photo/2023/10/23/17/10/landscape-8336497_640.jpg",
//     title: "별이 빛나는 밤에",
//     subtitle: "아름다운 별빛을 감상하세요",
//     location: "경기도 양평군",
//     zoom: 7,
//     like: 8,
//     bookmark: 9
//   }
// ];

export default function CarouselComponent({ places }) {
  const settings = {
    slidesToShow: 1,  // 한 번에 몇 개의 슬라이드를 보여줄지 설정
    slidesToScroll: 1,  // 한 번에 몇 개의 슬라이드를 넘길지 설정
    infinite: true,
    speed: 1000,
    draggable: true,
    fade: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 10000,
    dotsClass: "slick-dots",
    arrows: false,
    
  };

  return (
    <div className="relative mt-10 mb-5 p-4 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl text-center bg-white border-2 shadow-md border-gray-300 rounded-lg">
      <StyledSlider {...settings}>
        {places.map((place, index) => (
          <div key={index} className="w-full h-full relative">
            <div className="p-4 sm:p-6 bg-white rounded-lg transition-shadow duration-300">
              {/* 상단 이름과 아이콘 영역 */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{place.name}</h2>
                </div>
              </div>

              {/* 이미지 영역 */}
              <img
                src={place.images[0].img_url}
                alt={place.name}
                className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4"
              />

              {/* 주소 및 설명 부분 */}
              <div className="text-left">
                <p className="text-gray-700 text-sm sm:text-base mb-2">
                  <span className="font-bold text-gray-800">주소: </span>{place.address}
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-indigo-700 mb-2">{place.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{place.description}</p>
              </div>
            </div>
          </div>
        ))}
      </StyledSlider>
    </div>

  );
}