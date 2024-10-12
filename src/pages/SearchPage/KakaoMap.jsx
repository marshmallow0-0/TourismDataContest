import React, { useEffect } from 'react';

const KakaoMap = ({ mapx, mapy, category }) => {
    useEffect(() => {
        const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;

        if (!kakaoApiKey) {
            console.error('API 키가 설정되지 않았습니다.');
            return;
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services,clusterer,drawing`;
        script.async = false;
        script.defer = true;

        document.head.appendChild(script);

        script.onload = () => {
            if (!window.kakao || !window.kakao.maps) {
                console.error("카카오 맵 API 로드 실패");
                return;
            }

            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new window.kakao.maps.LatLng(mapy, mapx),
                level: 6,
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            // 지도에 원을 추가
            const circle = new window.kakao.maps.Circle({
                center: new window.kakao.maps.LatLng(mapy, mapx),
                radius: 2000,
                strokeWeight: 5,
                strokeColor: '#75B8FA',
                strokeOpacity: 1,
                strokeStyle: 'dashed',
                fillColor: '#CFE7FF',
                fillOpacity: 0.1,
            });
            circle.setMap(map);

            let selectedMarker = null;

            const markerIcon = new window.kakao.maps.MarkerImage(
                'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
                new window.kakao.maps.Size(31, 35),
            );

            const overMarkerIcon = new window.kakao.maps.MarkerImage(
                'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
                new window.kakao.maps.Size(40, 50),
            );

            const createDefaultMarker = () => {
                const position = new window.kakao.maps.LatLng(mapy, mapx);
                const marker = new window.kakao.maps.Marker({
                    position,
                    image: markerIcon,
                    clickable: true,
                });

                marker.setMap(map);
                return marker;
            };

            const createOverlayContent = (place, category) => {
                // 최상위 컨테이너인 content를 생성
                const content = document.createElement('div');
                content.className = 'overlay-wrap'; // 클래스 이름 설정
                content.style.width = '300px'; // 너비 설정
                content.style.height = '120px'; // 높이 설정
                content.style.marginLeft = '-150px'; // 중앙 정렬을 위해 너비의 절반만큼 왼쪽으로 이동
                content.style.fontSize = '14px'; // 기본 폰트 크기 설정
                content.style.lineHeight = '1.5'; // 줄 간격 설정
                content.style.borderRadius = '12px'; // 모서리를 둥글게 설정
                content.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'; // 그림자 설정으로 약간의 깊이감을 추가
                content.style.backgroundColor = '#fff'; // 배경색을 흰색으로 설정

                // 내부 정보가 들어갈 infoDiv 생성
                const infoDiv = document.createElement('div');
                infoDiv.className = 'overlay-info'; // 클래스 이름 설정
                infoDiv.style.padding = '10px'; // 내부 패딩 설정
                infoDiv.style.borderRadius = '12px'; // 모서리를 둥글게 설정
                infoDiv.style.borderBottom = '1px solid #ddd'; // 하단에 테두리 추가
                infoDiv.style.position = 'relative'; // 닫기 버튼 등 위치 설정을 위해 상대적 위치 지정

                // 카테고리별 배경 색상과 아이콘 설정을 위한 타이틀 컨테이너 titleDiv 생성
                const titleDiv = document.createElement('div');
                titleDiv.className = 'overlay-title'; // 클래스 이름 설정
                titleDiv.style.padding = '5px 10px'; // 내부 패딩 설정
                titleDiv.style.fontWeight = 'bold'; // 글자를 굵게 설정
                titleDiv.style.fontSize = '16px'; // 폰트 크기 설정
                titleDiv.style.color = '#333'; // 글자 색상 설정
                titleDiv.style.display = 'flex'; // 플렉스박스 사용으로 아이템 정렬
                titleDiv.style.alignItems = 'center'; // 세로 중앙 정렬
                titleDiv.style.justifyContent = 'space-between'; // 좌우로 아이템 분배
                titleDiv.style.borderRadius = '8px'; // 타이틀 영역의 모서리 둥글게 설정
                titleDiv.style.background = 'rgba(200, 200, 200, 0.2)'; // 기본 배경색 설정

                // 카테고리별 색상과 아이콘 적용 (카페, 음식점, 관광지에 맞는 스타일 적용)
                const icon = document.createElement('span');
                if (category === 'CE7') { // 카페인 경우
                    console.log(category);
                    titleDiv.style.background = 'rgba(254, 243, 199, 1)'; // 카페 배경색
                    icon.textContent = '☕ '; // 카페 아이콘
                } else if (category === 'FD6') { // 음식점인 경우
                    console.log(category);
                    titleDiv.style.background = 'rgba(254, 81, 106, 1)'; // 음식점 배경색
                    icon.textContent = '🍚 '; // 음식점 아이콘
                } else if (category === 'AT4') { // 관광지인 경우
                    titleDiv.style.background = 'rgba(81, 106, 254, 1)'; // 관광지 배경색
                    icon.textContent = '⛱️ '; // 관광지 아이콘
                }

                // 장소 이름을 클릭하면 해당 장소의 카카오맵 페이지로 이동하도록 설정된 링크 생성
                const link = document.createElement('a');
                link.href = place.place_url; // 장소의 상세 페이지 URL
                link.textContent = place.place_name; // 장소 이름 텍스트 설정
                link.style.color = '#312E81'; // 링크 색상을 파란색으로 설정
                link.style.textDecoration = 'none'; // 밑줄 제거
                link.style.fontWeight = 'bold'; // 링크 글씨 굵게 설정
                // 링크를 새 창에서 열도록 설정 (보안 설정 포함)
                link.target = '_blank';

                // 닫기 버튼 생성 (X 버튼)
                const closeButton = document.createElement('button');
                closeButton.textContent = '✕'; // X 아이콘
                closeButton.style.border = 'none'; // 테두리 제거
                closeButton.style.background = 'transparent'; // 배경색 투명하게 설정
                closeButton.style.fontSize = '16px'; // 폰트 크기 설정
                closeButton.style.cursor = 'pointer'; // 커서를 클릭 가능한 형태로 변경
                closeButton.style.color = '#888'; // 닫기 버튼의 색상 설정

                // 닫기 버튼 클릭 시 오버레이를 닫도록 이벤트 추가
                closeButton.addEventListener('click', () => {
                    content.style.display = 'none'; // 오버레이를 숨김
                });

                // 타이틀 구성: 아이콘, 링크, 닫기 버튼을 타이틀에 추가
                titleDiv.appendChild(icon); // 카테고리 아이콘 추가
                titleDiv.appendChild(link); // 장소 이름 링크 추가
                titleDiv.appendChild(closeButton); // 닫기 버튼 추가
                infoDiv.appendChild(titleDiv); // 타이틀을 정보 디브에 추가

                // 설명을 위한 descDiv 생성
                const descDiv = document.createElement('div');
                descDiv.className = 'overlay-desc'; // 클래스 이름 설정
                descDiv.style.marginTop = '10px'; // 상단 여백 설정
                descDiv.style.textAlign = 'center'; // 가운데 정렬
                descDiv.style.fontSize = '13px'; // 폰트 크기 설정
                descDiv.style.color = '#555'; // 글자 색상 설정

                // 주소 정보 표시 (도로명 주소가 있으면 우선 표시, 없으면 지번 주소 표시)
                const roadAddressSpan = document.createElement('p');
                roadAddressSpan.title = place.road_address_name || place.address_name; // 도로명 주소 또는 지번 주소 설정
                roadAddressSpan.textContent = place.road_address_name
                    ? `도로명 주소: ${place.road_address_name}` // 도로명 주소 표시
                    : `지번 주소: ${place.address_name}`; // 지번 주소 표시
                roadAddressSpan.style.margin = '5px 0'; // 상하 여백 설정

                // 장소 상세 페이지로 이동할 수 있는 링크 추가
                const linkA = document.createElement('a');
                linkA.href = place.place_url; // 장소 상세 페이지 링크
                linkA.textContent = `상세 페이지 보기`; // 링크 텍스트 설정
                linkA.style.color = '#007BFF'; // 링크 색상을 파란색으로 설정
                linkA.style.display = 'block'; // 블록 요소로 설정하여 한 줄 차지
                linkA.style.marginTop = '5px'; // 상단 여백 설정
                linkA.style.fontWeight = 'bold'; // 링크 글씨 굵게 설정
                linkA.style.textDecoration = 'none'; // 밑줄 제거

                // 링크를 새 창에서 열도록 설정 (보안 설정 포함)
                linkA.target = '_blank';
                linkA.rel = 'noopener noreferrer'; // 보안 및 성능을 위해 추가

                // 설명 구성: 주소 정보 및 상세 페이지 링크를 descDiv에 추가
                descDiv.appendChild(roadAddressSpan); // 주소 정보 추가
                descDiv.appendChild(linkA); // 상세 페이지 링크 추가

                // 모든 요소들을 infoDiv와 content에 추가
                infoDiv.appendChild(descDiv); // 설명을 정보 디브에 추가
                content.appendChild(infoDiv); // 최종적으로 정보 디브를 오버레이에 추가

                return content; // 최종 오버레이 컨텐츠 반환
            };


            const displayMarker = (place) => {
                const marker = new window.kakao.maps.Marker({
                    map,
                    image: markerIcon,
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                });

                window.kakao.maps.event.addListener(marker, 'click', () => {
                    const content = createOverlayContent(place);

                    const overlay = new window.kakao.maps.CustomOverlay({
                        clickable: true,
                        content,
                        map,
                        position: marker.getPosition(),
                        yAnchor: 1,
                        zIndex: 3,
                    });

                    overlay.setMap(map);

                    const closeButton = content.querySelector('.close');
                    if (closeButton) {
                        closeButton.onclick = () => overlay.setMap(null);
                    }
                });
            };

            // 카테고리 기반 마커 표시
            if (!category) {
                createDefaultMarker();
            } else {
                const placesService = new window.kakao.maps.services.Places(map);
                placesService.categorySearch(category, (data, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        data.forEach((place) => displayMarker(place));
                    }
                }, { useMapBounds: true });
            }
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [mapx, mapy, category]);

    return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default KakaoMap;
