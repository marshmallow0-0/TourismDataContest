import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";

const StyledSlider = styled(Slider)`
  .slick-list {
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-dots {
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
  background-opacity: 0.75;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  font-weight: bold;
  color: black;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const slides = [
  {
    img: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg",
    title: "여행지 추천",
    subtitle: "가족과 함께 즐거운 시간을 보내세요",
    location: "서울특별시 강남구",
    zoom: 1,
    like: 2,
    bookmark: 3
  },
  {
    img: "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_640.jpg",
    title: "조용한 휴식의 도시 강릉",
    subtitle: "네디슨 칼릴로 함께 즐길 수 있는 강릉",
    location: "강원 강릉시 강릉대로 33",
    zoom: 4,
    like: 5,
    bookmark: 6
  },
  {
    img: "https://cdn.pixabay.com/photo/2023/10/23/17/10/landscape-8336497_640.jpg",
    title: "별이 빛나는 밤에",
    subtitle: "아름다운 별빛을 감상하세요",
    location: "경기도 양평군",
    zoom: 7,
    like: 8,
    bookmark: 9
  }
];


export default function CarouselComponent() {
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
    dotsClass: "slick-dots"
  };

  return (
    <div className="mt-20 p-10 mx-auto max-w-2xl text-center border-4 border-dashed border-gray-400 rounded-lg">
      <StyledSlider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full drop-shadow-lg relative">
            <SlideContent>
              <SlideTitle>{slide.title}</SlideTitle>
              <SlideSubtitle>{slide.subtitle}</SlideSubtitle>
              <IconContainer>
                <Icon>🔍 {slide.zoom}</Icon>
                <Icon>❤️ {slide.like}</Icon>
                <Icon>🔖 {slide.bookmark}</Icon>
              </IconContainer>
              <Image src={slide.img} alt="slide" />
              <SlideLocation>{slide.location}</SlideLocation>
            </SlideContent>
          </div>
        ))}
      </StyledSlider>
    </div>
  );
}