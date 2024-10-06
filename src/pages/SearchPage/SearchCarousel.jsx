import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

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

const FavoriteButton = styled.button`
  background-color: #f8f9fa; /* 약간 밝은 배경 */
  border: 1px solid #ddd; /* 얇은 경계선 */
  border-radius: 8px; /* 부드러운 모서리 */
  padding: 8px 12px; /* 적당한 패딩 */
  font-size: 1rem; /* 글씨 크기 조정 */
  color: ${props => (props.isFavorited ? '#ff6b6b' : '#666')}; /* 색상 조정 */
  display: inline-flex; /* 아이콘과 텍스트를 수평으로 정렬 */
  align-items: center; /* 아이콘과 텍스트를 세로 중앙 정렬 */
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease; /* 부드러운 효과 */

  &:hover {
    background-color: #f1f3f5; /* 마우스 오버 시 배경색 변경 */
    color: #ff6b6b; /* 마우스 오버 시 색상 변경 */
  }

  svg {
    margin-right: 8px; /* 아이콘과 텍스트 사이의 간격 */
    font-size: 1.2rem; /* 아이콘 크기 조정 */
  }
`;

const SearchCarousel = ({ onCategoryChange, touristPlaces, onSlideChange }) => {
  const [favorites, setFavorites] = useState({});  // 각 항목의 즐겨찾기 상태를 저장하는 객체
  const token = useSelector((state) => state.login?.token || null);

  // 초기 즐겨찾기 목록 가져오기
  const getFavorites = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/record/favorites`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const favoritesList = response.data.favorites;
        if (Array.isArray(favoritesList)) {
          // 응답받은 즐겨찾기 목록을 객체 형식으로 변환하여 상태 설정
          const favoritesObj = {};
          favoritesList.forEach(fav => {
            favoritesObj[fav.name] = true;
          });
          setFavorites(favoritesObj);
        }
      } else {
        console.error('즐겨찾기 목록 불러오기 실패:', response.data.favorites);
      }
    } catch (error) {
      console.error('즐겨찾기 목록 불러오는 중 오류 발생:', error);
    }
  };

  // 컴포넌트 로드 시 즐겨찾기 목록 불러오기
  useEffect(() => {
    getFavorites();
  }, []);

  const toggleFavorite = async () => {
    try {
      const place = touristPlaces[currentSlide];  // index로 해당 place 찾기
      // console.log("현재 장소", place);  // 클릭할 때마다 올바른 장소가 출력되는지 확인
      const isFavorite = favorites[place.name];  // 해당 장소의 즐겨찾기 여부
      console.log("즐겨찾기 추가 장소", place.name);
      if (isFavorite) {
        // 즐겨찾기 해제 (DELETE 요청)
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/record/favorites`, {
          data: {
            name: place.name,
            address: place.address,
            petsAvailable: place.petsAvailable,
            tel: place.tel,
            parking: place.parking,
            x: place.x,
            y: place.y,
            images: place.images,
            blur_image: place.blur_image,
          },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // 해당 장소의 즐겨찾기 상태를 false로 업데이트
          setFavorites(prevFavorites => ({
            ...prevFavorites,
            [place.name]: false,
          }));
        }
      } else {
        // 즐겨찾기 추가 (POST 요청)
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/record/favorites`,
          {
            name: place.name,
            address: place.address,
            petsAvailable: place.petsAvailable,
            tel: place.tel,
            parking: place.parking,
            x: place.x,
            y: place.y,
            images: place.images,
            blur_image: place.blur_image,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // 해당 장소의 즐겨찾기 상태를 true로 업데이트
          setFavorites(prevFavorites => ({
            ...prevFavorites,
            [place.name]: true,
          }));
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.detail === "Already added to favorites.") {
        console.error('이미 즐겨찾기에 추가된 항목입니다.');
      } else {
        console.error('즐겨찾기 처리 중 오류 발생:', error);
      }
    }
  };
  const [currentSlide, setCurrentSlide] = useState(0);  // 현재 슬라이드 인덱스 상태 추가

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
    arrows: false,
    // afterChange: onSlideChange,
    afterChange: (current) => {
      setCurrentSlide(current);  // 슬라이드가 변경될 때 현재 슬라이드 인덱스 업데이트
    }
  };

  return (
    <div className="mt-20 mb-20 p-5 mx-auto max-w-2xl text-center border-4 border-gray-400">
      <StyledSlider {...settings}>
        {touristPlaces.map((place, index) => (
          <div key={index} className="w-full h-full relative">
            <SlideTitle>{place.name}</SlideTitle>
            <SlideContent>
              <ImageContainer>
                <Image
                  src={place.blur_image || "https://via.placeholder.com/150"}
                  alt={place.name}
                />
              </ImageContainer>
              <InfoContainer>
                <SlideSubtitle>전화번호: {place.tel}</SlideSubtitle>
                <SlideLocation>위치: {place.address}</SlideLocation>
                <SlideAddress>주차: {place.parking}</SlideAddress>
                <SlideHours>반려동물: {place.petsAvailable}</SlideHours>
                {/* 아이콘과 텍스트를 버튼에 한 줄로 나란히 배치 */}
                <FavoriteButton
                  onClick={toggleFavorite}  // 이제 index를 따로 전달하지 않아도 됨
                  isFavorited={!!favorites[touristPlaces[currentSlide]?.name]}  // 현재 슬라이드에 맞는 즐겨찾기 여부 확인
                >
                  {favorites[place.name] ? (
                    <>
                      <FaStar color="gold" style={{ marginRight: '8px' }} />
                      즐겨찾기 삭제
                    </>
                  ) : (
                    <>
                      <CiStar color="gray" style={{ marginRight: '8px' }} />
                      즐겨찾기 추가
                    </>
                  )}
                </FavoriteButton>
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
};

export default SearchCarousel;
