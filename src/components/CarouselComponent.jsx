//캐러셀 슬라이드를 react-slick 라이브러리에서 가져옴  
//NOTE
//현재 이미지 파일은 웹사이트에서 주소로 가져오고 있음 
//TODO
//캐러셀 슬라이드를 사용하는 방법은 styled 로 설정하거나 settings 로 설정하는 2가지 방법이 있다.
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const StyledSlider = styled(Slider)`
width: 100%;
height: 100% .slick-list {
    margin: 0 auto;
    overflow-x: hidden;
}
  // .slick-prev {
  //   z-index: 1;
  //   left: 1rem;
  //   top: 6rem;
  // }
  // .slick-next {
  //   right: 1rem;
  //   top: 6rem;
  // }

  // .slick-prev:before,
  // .slick-next:before {
  //   font-size: 30px;
  //   opacity: 0.5;
  //   color: white;
  
  // }
  
  .slick-dots {
    li button:before {
      color: gray;
    }
    li.slick-active button:before {
      color: black;
    }
  }
`;

export default function CarouselComponent() {

  const settings = {
    slide: 'div', // 슬라이드 요소로 사용될 HTML 요소의 태그명
    infinite: true, // 무한 루프로 슬라이드를 순환할지 여부
    slidesToShow: 1, // 화면에 보여질 슬라이드의 개수
    slidesToScroll: 1, // 한 번에 넘길 슬라이드의 개수
    speed: 1000, // 슬라이드 전환에 소요되는 시간 (밀리초)
    draggable: true, // 사용자의 드래그로 슬라이드를 넘길 수 있는지 여부
    //arrows: true, // 화살표를 통한 슬라이드 이동 기능 활성화 여부
    fade: true, // 슬라이드 전환 시 사라졌다가 나타나는 효과 활성화 여부
    dots: true, // 슬라이드 페이지 번호를 나타내는 점 (도트) 표시 활성화 여부
    autoplay: true, // 자동 재생 기능 활성화 여부
    autoplaySpeed: 10000, // 자동 재생 시간 간격 (밀리초)
    dotsClass: "slick-dots", // 슬라이드 페이지 번호를 나타내는 도트 요소의 클래스명

  };

  return (
    <div className="mt-20 p-10 mx-auto max-w-2xl text-center">
      <StyledSlider {...settings}>
        <div className="w-full h-40 drop-shadow-lg ">
          <img className="w-full h-full hover:shadow-lg rounded-md" src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg" alt="Top10" />
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Road</span>
        </div>
        <div className="w-full h-40 drop-shadow-lg">
          <img className="w-full h-full hover:shadow-lg rounded-md" src="https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_640.jpg" alt="Top10" />
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Travel</span>
        </div>
        <div className="w-full h-40 drop-shadow-lg ">
          <img className="w-full h-full hover:shadow-lg rounded-md" src="https://cdn.pixabay.com/photo/2023/10/23/17/10/landscape-8336497_640.jpg" alt="Top10" />
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Star</span>
        </div>
      </StyledSlider>
    </div>
  );
}