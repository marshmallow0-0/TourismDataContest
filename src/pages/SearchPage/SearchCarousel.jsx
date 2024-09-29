import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledSlider = styled(Slider)`
  .slick-list {
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-dots {
    position: relative;
    bottom: -9em;
    
    li button:before {
      color: gray;
    }
    li.slick-active button:before {
      color: black;
    }
  }

  @media (max-width: 768px) { /* 화면 크기가 768px 이하일 때 적용 */
    .slick-dots {
      bottom: -17em; /* 모바일에서 bottom 값 조정 */
    }
  }
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: left;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  overflow: hidden;

`;
const ImageContainer = styled.div`
  flex: 1;
  padding: 10px;
  
  @media (max-width: 768px) { /* 모바일에서 이미지 크기 조정 */
    padding: 0;
    max-width: 200px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
  max-height: 200px;
  border-radius: 8px;

  @media (max-width: 768px) { /* 모바일 화면에서는 이미지 크기 줄이기 */
    max-width: 200px;
    max-height: 200px;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 10px;

  @media (max-width: 768px) { /* 모바일 화면에서 텍스트 중간 정렬 */
    text-align: center;
    padding: 0;
  }
`;

const SlideTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #312E81;
  margin: 0;
`;

const SlideSubtitle = styled.p`
  margin: 5px 0;
  color: #666;
`;

const SlideLocation = styled.p`
  margin: 5px 0;
  color: #333;
`;

const SlideAddress = styled.p`
  margin: 5px 0;
  color: #666;
`;

const SlideHours = styled.p`
  margin: 5px 0;
  color: #333;
`;

const SlidePhone = styled.p`
  margin: 5px 0;
  color: #333;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  font-weight: bold;
  color: #1d72b8;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  border-top: 3px solid gray;
  width: 100%;

  @media (max-width: 768px) { /* 모바일 화면에서는 버튼 크기 줄이기 */
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const Button = styled.button`
  background-color: white;
  color: gray;
  padding: 20px 20px;
  border-right: 3px solid gray;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #dcdcdc;
  }

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) { /* 모바일에서 버튼의 패딩과 폰트 크기 조정 */
    padding: 10px;
    font-size: 0.9rem;
    border-right: none;
    width: 100%;
  }
`;
// Slide data
const slides = [
  {
    img: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg",
    title: "울산 대공원",
    subtitle: "울산광역시의 테마파크",
    location: "울산광역시 남구",
    address: "울산광역시 남구 대공원 146-1",
    hours: "영업 시간: 영업 종료",
    phone: "052-256-5306",
    zoom: 1,
    like: 2,
    bookmark: 3
  },
  {
    img: "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_640.jpg",
    title: "조용한 휴식의 도시 강릉",
    subtitle: "강릉의 아름다움을 경험하세요",
    location: "강원 강릉시 강릉대로 33",
    address: "강원도 강릉시 강릉대로 33",
    hours: "10:00 - 20:00",
    phone: "033-123-4567",
    zoom: 4,
    like: 5,
    bookmark: 6
  },
  {
    img: "https://cdn.pixabay.com/photo/2023/10/23/17/10/landscape-8336497_640.jpg",
    title: "별이 빛나는 밤에",
    subtitle: "경기도 양평군의 아름다운 별빛을 감상하세요",
    location: "경기도 양평군",
    address: "경기도 양평군 양평대로 123",
    hours: "08:00 - 22:00",
    phone: "031-123-4567",
    zoom: 7,
    like: 8,
    bookmark: 9
  }
];


export default function SearchCarousel({ onCategoryChange, touristPlaces, onSlideChange }) {
  const settings = {
    slide: "div",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    draggable: true,
    fade: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 10000,
    dotsClass: "slick-dots",
    arrows: false, // 화살표를 비활성화
    afterChange: onSlideChange, // 슬라이드 변경 이벤트
  };

  console.log("tourist", touristPlaces);
  return (
    <div className="mt-20 mb-20 p-5 mx-auto max-w-2xl text-center border-4 border-gray-400">
      <StyledSlider {...settings}>
        {touristPlaces.map((place, index) => (
          <div key={index} className="w-full h-full relative">
            <SlideTitle>{place.name}</SlideTitle>
            <SlideContent>
              <ImageContainer>
                <Image
                  // src={place.images[0].img_url || "https://via.placeholder.com/150"}
                  src={place.blur_image || "https://via.placeholder.com/150"}
                  alt={place.name}
                />
              </ImageContainer>
              <InfoContainer>
                <SlideSubtitle>전화번호: {place.tel}</SlideSubtitle>
                <SlideLocation>위치: {place.address}</SlideLocation>
                <SlideAddress>주차: {place.parking}</SlideAddress>
                <SlideHours>반려동물: {place.petsAvailable}</SlideHours>
                {/* <SlidePhone>유아: {place.baby === '가능' ? '가능' : '불가능'}</SlidePhone> */}
              </InfoContainer>
            </SlideContent>
          </div>
        ))}
      </StyledSlider>
      <ButtonContainer>
        <Button onClick={() => onCategoryChange("CE7")}>카페</Button>
        <Button onClick={() => onCategoryChange("FD6")}>음식점</Button>
        <Button onClick={() => onCategoryChange("AT4")}>관광지</Button>
        <Button onClick={() => onCategoryChange("")}>추천 여행코스</Button>
      </ButtonContainer>
    </div>
  );
}
