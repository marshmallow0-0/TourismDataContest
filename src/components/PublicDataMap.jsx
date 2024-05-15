import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const PublicDataMap = ({ mapx, mapy, ml, category }) => {
    const [loading, setLoading] = useState(true);
    const [errorOccur, setErrorOccur] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            setErrorOccur(false);
            try {
                const response = await axios.get('/api/searchPlace', {
                    params: { mapX: mapx, mapY: mapy, radius: 2000, userId: "USER00" }
                });
                const jsonData = response.data;
                console.log(jsonData);
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(mapy, mapx),
                    level: 6
                };
                var circle = new window.kakao.maps.Circle({
                    center: new window.kakao.maps.LatLng(mapy, mapx),  // 원의 중심 좌표입니다 
                    radius: 2000, // 미터 단위의 원의 반지름입니다 
                    strokeWeight: 5, // 선의 두께입니다 
                    strokeColor: '#75B8FA', // 선의 색상입니다
                    strokeOpacity: 1, // 선의 투명도입니다 (0에서 1 사이의 값)
                    strokeStyle: 'dashed', // 선의 스타일입니다
                    fillColor: '#CFE7FF', // 원의 채우기 색깔입니다
                    fillOpacity: 0.1  // 채우기 색의 투명도입니다 (0에서 1 사이의 값)
                });

                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                circle.setMap(map);
                jsonData.forEach(data => {
                    const markerPosition = new window.kakao.maps.LatLng(data.mapy, data.mapx);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                        map: map
                    });

                    let content;
                    var infowindow = new window.kakao.maps.InfoWindow({
                        // map: null,
                        // removable: true,
                        // position: markerPosition
                    });

                    window.kakao.maps.event.addListener(marker, 'click', () => {
                        if (infowindow.getMap()) {
                            const close = document.querySelectorAll(".close");
                            close.forEach((element) => {
                                element.addEventListener("click", function () {
                                    infowindow.setMap(null);
                                });
                            })
                        }
                        else {
                            // 수정된 부분 시작
                            content = `<div class="wrap" style="padding: 0; margin: 0; position: absolute; left: 0; bottom: 1px; width: 288px; height: 132px; margin-left: -144px; text-align: left; overflow: hidden; font-size: 12px; font-family: 'Pretendard', dotum, 'Pretendard', 'Pretendard'; line-height: 1.5;">
                                <div class="info" style="width: 286px; height: 120px; border-radius: 15px; box-shadow: 0px 1px 2px #888; border-bottom: 2px solid #ccc; border-right: 1px solid #ccc; overflow: hidden; background: #fff;">
                                    <div class="title" style="padding: 5px 0 0 10px; height: 30px; background: rgba(81, 181, 254, 0.5); font-size: 18px; border-bottom: 1px solid #ddd; font-weight: bold;">
                                        <div class="titlea" href="${data.place_url}" style="color: blue;">📸 ${data.title}<br></div>
                                        <div class="close" style="position: absolute; top: 4px; right: 10px; color: #888; width: 17px; height: 17;">X</div>
                                    </div>
                                    <div class="body" style="position: relative; overflow: hidden;">
                                        <div class="img" style="position: absolute; top: 13px; left: 5px; width: 73px; height: 60px; border-radius: 15px; border: 1px solid #ddd; color: #888; overflow: hidden;">
                                        <img src="${data.firstimage2 ? data.firstimage2 : './img/not_image.png'}" style="height: 60px; width: 73px;">

                                        </div>
                                        <div class="desc" style="position: relative; margin: 13px 0 0 90px; height: 75px; font-size: 12px; overflow: hidden; text-overflow: ellipsis;">
                                            ${data.addr1 ? `<span title="${data.addr1}" style="">도로명 : ${data.addr1}<br> </span>` : `<span title="${data.address_name}">지번 : ${data.address_name}</span>`}
                                            ${data.tel ? `<span class="tel" style="position: relative;">tel : ${data.tel}</span></br>` : ''}
                                            <span class="dist" style="position: relative;">거리 :  ${parseInt(data.dist)}m</span></br>

                                            </div>
                                    </div>
                                </div>
                            </div>`;
                            var overlay = new window.kakao.maps.CustomOverlay({
                                clickable: true,
                                content: content,
                                map: map,
                                position: marker.getPosition(),
                                yAnchor: 1,
                                zAnchor: 3
                            });

                            overlay.setMap(map);

                            //infowindow.setContent(content); // content 변수를 HTML 문자열로 설정
                            //infowindow.open(map, marker);
                            const close = document.querySelectorAll(".close");
                            close.forEach((element) => {
                                element.addEventListener("click", function () {
                                    overlay.setMap(null);
                                });
                            })
                        }
                    });
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                const imageContainer = document.getElementById('map');
                imageContainer.innerHTML = '<img src=./img/NotFound.png alt="Error occurred">';
                setErrorOccur(true);
                setLoading(false);
            }
        };


        fetchData();
    }, [mapx, mapy, ml, category]);  // 의존성 배열 업데이트

    // return (
    //     <div id='map' style={{ width: '50rem', height: '24rem' }}>
    //         <div style={{ width: '50rem', height: '24rem', position: 'relative' }}>
    //             <div style={{ position: 'absolute', top: '40%', left: '45%', transform: 'translate(-50%, -50%)' }}>
    //                 <Loading />
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div id='map'>
            {loading ? (
                <div style={{ width: '50rem', height: '24rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '40%', left: '45%', transform: 'translate(-50%, -50%)' }}>
                        <Loading />
                    </div>
                </div>
            ) : (
                <div style={{ width: '50rem', height: '24rem' }}></div>
            )}
        </div>
        // <div id="map" style={{ width: '50rem', height: '24rem' }}></div>
    );
};

export default PublicDataMap;
