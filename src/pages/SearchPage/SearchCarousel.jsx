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
import { FaPhoneAlt, FaMapMarkerAlt, FaParking, FaPaw } from "react-icons/fa";

const StyledSlider = styled(Slider)`
  .slick-list {
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-dots {
    position: relative;
    bottom: -9em;  // Dots 위치를 조금 더 위로 이동
    li button:before {
      color: lightgray;
      font-size: 0.9rem; // Dots 크기 확대
    }
    li.slick-active button:before {
      color: #FFAE00;  // 활성화된 Dot의 색상 변경
    }
  }

  @media (max-width: 768px) {
    .slick-dots {
      bottom: -20em;  // 모바일에서 Dots 위치 조정
    }
  }
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 16px;  // 둥근 모서리
  padding: 10px;
  transition: transform 0.3s ease-in-out;


  @media (max-width: 768px) {
    flex-direction: column;  // 모바일에서는 수직 레이아웃
    text-align: start;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  padding: 0;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 240px;  // 모바일에서 이미지 크기 제한
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 12px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: start;
  }
`;

const SlideTitle = styled.h2`
  font-size: 1.75rem;  // 타이틀 크기 키움
  font-weight: bold;
  color: #312E81;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SlideSubtitle = styled.p`

  font-size: 1rem;
  color: #888;
  margin-bottom: 8px;
`;

const SlideLocation = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 8px;
`;

const SlideAddress = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 8px;
`;

const SlideHours = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 8px;
`;

const SlidePhone = styled.p`
  font-size: 1rem;
  color: #888;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  padding: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Icon = styled.span`
  background: white;
  padding: 0.7rem;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  font-size: 1.25rem;
  color: #FFAE00;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  border-top: 1px solid #ddd;

  @media (max-width: 768px) {
    gap: 12px;
    align-items: center;
    flex-direction: column;  // 모바일에서는 수직 레이아웃
  }
`;

const Button = styled.button`
  background-color: white;
  color: #666;
  padding: 15px 25px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 0.5rem;

  }
`;


const FavoriteButton = styled.button`
  background-color: #ffffff; /* 밝고 깨끗한 배경 */
  border: 2px solid ${props => (props.isFavorited ? '#ff6b6b' : '#ddd')}; /* 선택된 경우 경계선 강조 */
  border-radius: 50px; /* 더 부드러운, 캡슐형 모서리 */
  padding: 10px 18px; /* 패딩을 더 넉넉하게 */
  font-size: 1rem;
  color: ${props => (props.isFavorited ? '#ff6b6b' : '#666')}; /* 즐겨찾기 여부에 따른 색상 */
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* 가벼운 그림자 효과 */
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease; /* 부드러운 효과 */

  &:hover {
    background-color: #f9fafb; /* 마우스 오버 시 배경색 */
    color: #ff6b6b; /* 마우스 오버 시 색상 변경 */
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15); /* 마우스 오버 시 그림자 강화 */
  }

  svg {
    margin-right: 10px; /* 아이콘과 텍스트 사이의 간격 */
    font-size: 1.4rem; /* 아이콘 크기 조금 더 크게 */
  }
`;

const SearchCarousel = ({ onCategoryChange, touristPlaces, onSlideChange }) => {
  const [favorites, setFavorites] = useState({});  // 각 항목의 즐겨찾기 상태를 저장하는 객체
  const [currentSlide, setCurrentSlide] = useState(0);  // 현재 슬라이드 인덱스 상태 추가
  const token = useSelector((state) => {
    // 일반 로그인 토큰이 존재하면 반환하고, 그렇지 않으면 카카오 토큰을 반환
    return state.login.generalToken || state.login.kakaoToken || null;
  });

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
          const favoritesObj = {};
          favoritesList.forEach(fav => {
            favoritesObj[fav.name] = true;
          });
          setFavorites(favoritesObj);
        }
      } else {
        // console.error('즐겨찾기 목록 불러오기 실패:', response.data.favorites);
      }
    } catch (error) {
      // console.error('즐겨찾기 목록 불러오는 중 오류 발생:', error);
    }
  };

  // 컴포넌트 로드 시 즐겨찾기 목록 불러오기
  useEffect(() => {
    if (token) {  // token이 있는 경우에만 실행
      getFavorites();
    }
  }, [token]);  // token이 변경될 때마다 실행되도록 추가

  const toggleFavorite = async () => {
    //   try {
    //     const place = touristPlaces[currentSlide];  // index로 해당 place 찾기
    //     // console.log("현재 장소", place);  // 클릭할 때마다 올바른 장소가 출력되는지 확인
    //     const isFavorite = favorites[place.name];  // 해당 장소의 즐겨찾기 여부
    //     // console.log("즐겨찾기 추가 장소", place.name);
    //     if (isFavorite) {
    //       // console.log("삭제");
    //       // 즐겨찾기 해제 (DELETE 요청)
    //       const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/record/favorites`, {
    //         data: {
    //           name: place.name,
    //           address: place.address,
    //           petsAvailable: place.petsAvailable,
    //           tel: place.tel,
    //           parking: place.parking,
    //           x: place.x,
    //           y: place.y,
    //           images: place.images,
    //           blur_image: place.blur_image,
    //         },
    //         withCredentials: true,
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });

    //       if (response.status === 200) {
    //         // 해당 장소의 즐겨찾기 상태를 false로 업데이트
    //         // console.log("삭제완료");
    //         await getFavorites();  // getFavorites가 상태를 최신으로 갱신

    //         setFavorites(prevFavorites => ({
    //           ...prevFavorites,
    //           [place.name]: false,
    //         }));
    //       }
    //     } else {
    //       // 즐겨찾기 추가 (POST 요청)
    //       const response = await axios.post(
    //         `${process.env.REACT_APP_BACKEND_URL}/record/favorites`,
    //         {
    //           name: place.name,
    //           address: place.address,
    //           petsAvailable: place.petsAvailable,
    //           tel: place.tel,
    //           parking: place.parking,
    //           x: place.x,
    //           y: place.y,
    //           images: place.images,
    //           blur_image: place.blur_image,
    //         },
    //         {
    //           withCredentials: true,
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );

    //       if (response.status === 200) {
    //         // 해당 장소의 즐겨찾기 상태를 true로 업데이트
    //         setFavorites(prevFavorites => ({
    //           ...prevFavorites,
    //           [place.name]: true,
    //         }));
    //       }
    //     }
    //   } catch (error) {
    //     if (error.response && error.response.status === 400 && error.response.data.detail === "Already added to favorites.") {
    //       console.error('이미 즐겨찾기에 추가된 항목입니다.');
    //     } else {
    //       console.error('즐겨찾기 처리 중 오류 발생:', error);
    //     }
    //   }
    // };
    try {
      if (!token) {
        console.error("토큰이 없습니다. 요청을 실행할 수 없습니다.");
        return;  // 토큰이 없으면 함수 종료
      }
      const place = touristPlaces[currentSlide];  // index로 해당 place 찾기
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

      if (response.status === 200 && token && token.trim() !== '') {
        await getFavorites();  // 즐겨찾기 목록 갱신
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.error("이미 즐겨찾기에 추가된 항목입니다.");
      } else {
        // console.error("즐겨찾기 처리 중 오류 발생:", error);
      }
    }
  };

  const settings = {
    slide: "div",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    draggable: true,
    fade: true,
    dots: true,
    autoplay: false,
    autoplaySpeed: 20000,
    dotsClass: "slick-dots",
    arrows: false,
    afterChange: (current) => {
      onSlideChange(current);
      setCurrentSlide(current);  // 슬라이드가 변경될 때 현재 슬라이드 인덱스 업데이트
    }
  };

  return (
    <div className="mt-20 mb-10 p-20 mx-auto max-w-2xl text-center border-2 border-gray-700 rounded-full">
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
                <SlideSubtitle>  <FaPhoneAlt /> {place.tel}</SlideSubtitle>
                <SlideLocation> <FaMapMarkerAlt /> {place.address}</SlideLocation>
                <SlideAddress><FaParking /> {place.parking}</SlideAddress>
                <SlideHours> <FaPaw /> {place.petsAvailable}</SlideHours>
                {/* 아이콘과 텍스트를 버튼에 한 줄로 나란히 배치 */}
                {token && (
                  <FavoriteButton
                    onClick={toggleFavorite}  // 이제 index를 따로 전달하지 않아도 됨
                    isFavorited={!!favorites[touristPlaces[currentSlide]?.name]}  // 현재 슬라이드에 맞는 즐겨찾기 여부 확인
                  >
                    {favorites[place.name] ? (
                      <>
                        <FaStar color="gold" style={{ marginRight: '8px' }} />
                        즐겨찾기
                      </>
                    ) : (
                      <>
                        <CiStar color="gray" style={{ marginRight: '8px' }} />
                        즐겨찾기
                      </>
                    )}
                  </FavoriteButton>
                )}
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

