import React, { useEffect } from 'react';

const RouteMap = ({ mapx, mapy, category }) => {
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
                level: 5,
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            // 시작점 마커 커스텀 오버레이로 원형 표시
            const startMarkerContent = document.createElement('div');
            startMarkerContent.style.width = '30px';  // 크기를 키움
            startMarkerContent.style.height = '30px';  // 크기를 키움
            startMarkerContent.style.backgroundColor = '#FFAE00';  // 색상 설정
            startMarkerContent.style.borderRadius = '50%';  // 원형으로 만들기
            startMarkerContent.style.border = '2px solid white';  // 테두리 추가
            startMarkerContent.style.boxShadow = '0px 0px 8px rgba(0, 0, 0, 0.3)';
            startMarkerContent.style.display = 'flex';
            startMarkerContent.style.justifyContent = 'center';
            startMarkerContent.style.alignItems = 'center';
            startMarkerContent.style.fontWeight = 'bold';
            startMarkerContent.style.color = 'white';
            startMarkerContent.textContent = '시작';  // 시작점 텍스트 추가

            const startOverlay = new window.kakao.maps.CustomOverlay({
                position: new window.kakao.maps.LatLng(mapy, mapx),
                content: startMarkerContent,
                yAnchor: 0.5,
                zIndex: 2,
            });

            startOverlay.setMap(map);
            const markerIcon = new window.kakao.maps.MarkerImage(
                'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
                new window.kakao.maps.Size(31, 35),
            );

            // 장소들의 마커 좌표를 저장할 배열
            const markerPositions = [new window.kakao.maps.LatLng(mapy, mapx)]; // 시작점 좌표 추가

            // 마커를 클릭하면 오버레이를 닫기 전에 열려 있는 오버레이가 있으면 닫음
            let activeOverlay = null;

            // 마커 및 숫자 레이블 생성 함수
            const displayMarker = (place, categoryColor, index) => {
                const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
                const marker = new window.kakao.maps.Marker({
                    map,
                    position: markerPosition,
                    image: markerIcon,
                });

                // 마커 위치를 markerPositions 배열에 추가
                markerPositions.push(markerPosition);

                // 오버레이는 클릭할 때마다 나타나도록 설정
                const content = createOverlayContent(place, categoryColor);
                const overlay = new window.kakao.maps.CustomOverlay({
                    clickable: true,
                    content,
                    map,
                    position: marker.getPosition(),
                    yAnchor: 1,
                    zIndex: 3,
                });

                overlay.setMap(null); // 처음에는 오버레이를 감춤

                // 마커 클릭 이벤트로 오버레이 표시 및 숨김 처리
                window.kakao.maps.event.addListener(marker, 'click', () => {
                    if (activeOverlay) {
                        activeOverlay.setMap(null); // 이전에 열린 오버레이 닫기
                    }
                    overlay.setMap(map); // 현재 클릭된 마커의 오버레이 표시
                    activeOverlay = overlay; // 현재 오버레이를 activeOverlay로 설정
                });
            };

            // 선 그리기 함수 및 거리 계산 함수
            const drawLineBetweenMarkers = () => {
                if (markerPositions.length < 4) return; // 최소 4개의 마커가 있어야 선을 그림

                const polyline = new window.kakao.maps.Polyline({
                    path: markerPositions,
                    strokeWeight: 5,
                    strokeColor: '#FFAE00',
                    strokeOpacity: 0.7,
                    strokeStyle: 'solid',
                });

                polyline.setMap(map);
            };

            const createOverlayContent = (place, category) => {
                const content = document.createElement('div');
                content.className = 'overlay-wrap';
                content.style.width = '300px';
                content.style.height = '120px';
                content.style.marginLeft = '-150px';
                content.style.fontSize = '14px';
                content.style.lineHeight = '1.5';
                content.style.borderRadius = '12px';
                content.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                content.style.backgroundColor = '#fff';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'overlay-info';
                infoDiv.style.padding = '10px';
                infoDiv.style.borderRadius = '12px';
                infoDiv.style.borderBottom = '1px solid #ddd';
                infoDiv.style.position = 'relative';

                const titleDiv = document.createElement('div');
                titleDiv.className = 'overlay-title';
                titleDiv.style.padding = '5px 10px';
                titleDiv.style.fontWeight = 'bold';
                titleDiv.style.fontSize = '16px';
                titleDiv.style.color = '#333';
                titleDiv.style.display = 'flex';
                titleDiv.style.alignItems = 'center';
                titleDiv.style.justifyContent = 'space-between';
                titleDiv.style.borderRadius = '8px';
                titleDiv.style.background = 'rgba(200, 200, 200, 0.2)';

                const icon = document.createElement('span');
                if (category === 'CE7') {
                    titleDiv.style.background = 'rgba(254, 243, 199, 1)';
                    icon.textContent = '☕ ';
                } else if (category === 'FD6') {
                    titleDiv.style.background = 'rgba(254, 81, 106, 1)';
                    icon.textContent = '🍚 ';
                } else if (category === 'AT4') {
                    titleDiv.style.background = 'rgba(81, 106, 254, 1)';
                    icon.textContent = '⛱️ ';
                }

                const link = document.createElement('a');
                link.href = place.place_url;
                link.textContent = place.place_name;
                link.style.color = '#312E81';
                link.style.textDecoration = 'none';
                link.style.fontWeight = 'bold';
                link.target = '_blank';

                // 닫기 버튼 생성
                const closeButton = document.createElement('button');
                closeButton.textContent = '✕';
                closeButton.style.border = 'none';
                closeButton.style.background = 'transparent';
                closeButton.style.fontSize = '16px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.color = '#888';

                // 닫기 버튼 클릭 시 오버레이를 숨김
                closeButton.addEventListener('click', () => {
                    content.style.display = 'none';
                });

                titleDiv.appendChild(icon);
                titleDiv.appendChild(link);
                titleDiv.appendChild(closeButton); // 닫기 버튼 추가
                infoDiv.appendChild(titleDiv);

                const descDiv = document.createElement('div');
                descDiv.className = 'overlay-desc';
                descDiv.style.marginTop = '10px';
                descDiv.style.textAlign = 'center';
                descDiv.style.fontSize = '13px';
                descDiv.style.color = '#555';

                const roadAddressSpan = document.createElement('p');
                roadAddressSpan.title = place.road_address_name || place.address_name;
                roadAddressSpan.textContent = place.road_address_name
                    ? `도로명 주소: ${place.road_address_name}`
                    : `지번 주소: ${place.address_name}`;
                roadAddressSpan.style.margin = '5px 0';

                const linkA = document.createElement('a');
                linkA.href = place.place_url;
                linkA.textContent = `상세 페이지 보기`;
                linkA.style.color = '#007BFF';
                linkA.style.display = 'block';
                linkA.style.marginTop = '5px';
                linkA.style.fontWeight = 'bold';
                linkA.style.textDecoration = 'none';
                linkA.target = '_blank';
                linkA.rel = 'noopener noreferrer';

                descDiv.appendChild(roadAddressSpan);
                descDiv.appendChild(linkA);

                infoDiv.appendChild(descDiv);
                content.appendChild(infoDiv);

                return content;
            };

            // 각 카테고리별로 가장 가까운 장소 검색
            const searchNearestPlace = (categoryCode, color, index) => {
                const placesService = new window.kakao.maps.services.Places(map);
                placesService.categorySearch(categoryCode, (data, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        let nearestPlace = data[0]; // 가장 가까운 장소

                        // 시작점과 동일한 좌표인지 확인하여 중복 방지
                        if (nearestPlace.y === mapy && nearestPlace.x === mapx) {
                            nearestPlace = data[1]; // 두 번째로 가까운 장소로 대체
                        }

                        displayMarker(nearestPlace, color, index);

                        if (markerPositions.length === 4) {
                            drawLineBetweenMarkers(); // 4개의 마커가 있으면 선 그리기
                        }
                    }
                }, { location: new window.kakao.maps.LatLng(mapy, mapx), sort: window.kakao.maps.services.SortBy.DISTANCE });
            };

            // 카페, 음식점, 관광지 카테고리별로 가장 가까운 장소 검색 및 마커 표시
            searchNearestPlace('CE7', 'rgba(254, 243, 199, 1)', 3); // 카페, 마커 순서 3
            searchNearestPlace('FD6', 'rgba(254, 81, 106, 1)', 2); // 음식점, 마커 순서 2
            searchNearestPlace('AT4', 'rgba(81, 106, 254, 1)', 1); // 관광지, 마커 순서 1
            searchNearestPlace('AT4', 'rgba(81, 200, 106, 1)', 4); // 추가 관광지, 마커 순서 4
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [mapx, mapy, category]);

    return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default RouteMap;
