# 프로젝트 제목 
## 시작 방법 
- 이 프로젝트는 현재 백엔드가 파이썬인 경우에만 돌아가고 가변적으로 주소가 변경되므로 관련 부분 수정이 필요하다.
- layouts/MainBody.jsx axios.post(`https://bbc5-183-102-204-80.ngrok-free.app/api/recommend_place/?${queryParams}`, formdata, config) 여기서 https 부분을 가변적인 주소로 수정해야한다.  
- npm install 로 의존성을 다운받고, public/index.html 에서       
  <script type="text/javascript"          
    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_KAKAO_API_KEY%&libraries=services,clusterer,drawing">                 
</script>              
appkey 부분을 카카오 자바스크립트 키를 주입하여야한다.              
추가적으로 이미지 파일은 저작권 문제가 있으므로 직접 제작된 이미지와 무료 이미지만 업로드 되어있다. - LicensePage 참조      


## 캡스톤 프론트

## 프로젝트 개요 

## 디렉토리 구조

### components 
개별적인 컴포넌트

### functions 
프로젝트 초기화 함수

### layouts
필수적으로 pages에 포함되는 레이아웃들(header, footer)

### menus 
sideBar, navBar 로 구성할 예정 

### pages 
각각의 컴포넌트들과 함수들을 합쳐 보여줄 페이지 

### router
페이지 간의 이동 관리

## 주요 기능 

## 사용 기술 
React, Tailwind.css
=======
# RIA-PJT
Capstone Project RIA 

