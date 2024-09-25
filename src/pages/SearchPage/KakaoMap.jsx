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
                const content = document.createElement('div');
                content.className = 'wrap';
                // content.style.position = 'absolute';
                content.style.width = '288px';
                content.style.height = '132px';
                content.style.marginLeft = '-144px';
                content.style.textAlign = 'left';
                content.style.fontSize = '12px';
                content.style.lineHeight = '1.5';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'info';
                infoDiv.style.width = '286px';
                infoDiv.style.height = '100px';
                infoDiv.style.borderRadius = '15px';
                infoDiv.style.boxShadow = '0px 1px 2px #888';
                infoDiv.style.borderBottom = '2px solid #ccc';
                infoDiv.style.borderRight = '1px solid #ccc';
                infoDiv.style.background = '#fff';
                infoDiv.style.position = 'relative';

                // 카테고리별 타이틀 색상
                const titleDiv = document.createElement('div');
                titleDiv.className = 'title';
                titleDiv.style.padding = '5px 0 0 10px';
                titleDiv.style.fontWeight = 'bold';
                titleDiv.style.zIndex = '10';
                titleDiv.style.height = '20px';
                titleDiv.style.background = 'rgba(200, 200, 200, 1)'; // 검정색 배경


                if (category === 'CE7') { // 카페
                    titleDiv.style.background = 'rgba(254, 243, 199, 1)'; // 카페 배경색
                    const icon = document.createElement('span');
                    icon.textContent = '☕ ';
                    const link = document.createElement('a');
                    link.href = place.place_url;
                    link.textContent = place.place_name;
                    link.style.color = 'blue';
                    titleDiv.appendChild(icon);
                    titleDiv.appendChild(link);
                } else if (category === 'FD6') { // 음식점
                    titleDiv.style.background = 'rgba(254, 81, 106, 1)'; // 음식점 배경색
                    const icon = document.createElement('span');
                    icon.textContent = '🍚 ';
                    const link = document.createElement('a');
                    link.href = place.place_url;
                    link.textContent = place.place_name;
                    link.style.color = 'blue';
                    titleDiv.appendChild(icon);
                    titleDiv.appendChild(link);
                } else if (category === 'AT4') { // 관광지
                    titleDiv.style.background = 'rgba(81, 106, 254, 1)'; // 관광지 배경색
                    const icon = document.createElement('span');
                    icon.textContent = '⛱️ ';
                    const link = document.createElement('a');
                    link.href = place.place_url;
                    link.textContent = place.place_name;
                    link.style.color = 'blue';
                    titleDiv.appendChild(icon);
                    titleDiv.appendChild(link);
                }

                // 닫기 버튼
                const closeButton = document.createElement('div');
                closeButton.className = 'close';
                closeButton.textContent = 'X';
                closeButton.style.position = 'absolute';
                closeButton.style.top = '4px';
                closeButton.style.right = '10px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.color = '#888';

                // 닫기 버튼 클릭 시 오버레이 숨기기 또는 제거
                closeButton.addEventListener('click', () => {
                    content.style.display = 'none';
                });

                titleDiv.appendChild(closeButton);
                infoDiv.appendChild(titleDiv);

                // 이미지 추가
                // const imgDiv = document.createElement('div');
                // imgDiv.className = 'img';
                // imgDiv.style.position = 'absolute';
                // imgDiv.style.top = '20px';
                // imgDiv.style.left = '5px';
                // imgDiv.style.width = '73px';
                // imgDiv.style.height = '60px';
                // imgDiv.style.borderRadius = '15px';
                // imgDiv.style.border = '1px solid #ddd';
                // imgDiv.style.overflow = 'hidden';

                // const img = document.createElement('img');
                // img.style.width = '73px';
                // img.style.height = '60px';

                // // 이미지 소스 설정
                // if (category === 'CE7') {
                //     img.src = './img/cafe_icon.png';
                // } else if (category === 'FD6') {
                //     img.src = './img/food_icon.png';
                // } else if (category === 'AT4') {
                //     img.src = './img/tour_icon.png';
                // }

                // 이미지 로드 오류 시 대체 이미지 사용
                // img.onerror = function () {
                //     img.src = './img/tour_icon.png'; // 대체 이미지 경로
                // };

                // imgDiv.appendChild(img);

                // 설명 추가
                const descDiv = document.createElement('div');
                descDiv.className = 'desc';
                descDiv.style.position = 'relative';
                descDiv.style.margin = ' 0 0 90px';
                descDiv.style.height = '75px';
                descDiv.style.fontSize = '17px';
                descDiv.style.overflow = 'hidden';
                descDiv.style.textOverflow = 'ellipsis';

                // 텍스트를 가로 및 세로 가운데 정렬
                descDiv.style.display = 'flex flex-col';             // 플렉스 박스 사용
                descDiv.style.alignItems = 'center';        // 세로 가운데 정렬
                descDiv.style.justifyContent = 'center';    // 가로 가운데 정렬
                descDiv.style.textAlign = 'center';         // 텍스트의 가로 정렬

                const roadAddressSpan = document.createElement('span');
                roadAddressSpan.title = place.road_address_name || place.address_name;
                roadAddressSpan.textContent = place.road_address_name
                    ? `도로명: ${place.road_address_name}`
                    : `지번: ${place.address_name}`;

                // const telSpan = document.createElement('span');
                // telSpan.className = 'tel';
                // telSpan.textContent = `전화: ${place.phone}`;
                // telSpan.style.display = 'block';

                const linkA = document.createElement('a');
                linkA.href = place.place_url;
                linkA.textContent = `${place.place_name} 상세페이지`;
                linkA.style.color = 'blue';
                linkA.style.display = 'block';
                linkA.style.marginTop = '5px';

                linkA.target = '_blank';
                linkA.rel = 'noopener noreferrer'; // 보안과 성능을 위해 추가

                descDiv.appendChild(roadAddressSpan);
                // descDiv.appendChild(telSpan);
                descDiv.appendChild(linkA);

                infoDiv.appendChild(descDiv);
                content.appendChild(infoDiv);
                // content.appendChild(img);
                // infoDiv.appendChild(imgDiv);

                return content;
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
