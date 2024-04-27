import React, { useEffect } from 'react';

const KakaoMap = ({ mapx, mapy, category }) => {
    useEffect(() => {
        var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new window.kakao.maps.LatLng(mapy, mapx),
            level: 6
        };

        var MARKER_WITDH = 31,
            MARKER_HEIGHT = 35,
            OVER_MARKER_WIDTH = 40,
            OVER_MARKER_HEIGHT = 50

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
        //오버 마커 만들기
        var over_icon = new window.kakao.maps.MarkerImage(
            //'https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png',
            'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
            new window.kakao.maps.Size(OVER_MARKER_WIDTH, OVER_MARKER_HEIGHT),
            {
                shape: 'poly',
                coords: '16,0,20,2,24,6,26,10,26,16,23,22,17,25,14,35,13,35,9,25,6,24,2,20,0,16,0,10,2,6,6,2,10,0'
            });
        //마커이미지
        var icon = new window.kakao.maps.MarkerImage(
            //'https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png',
            'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',

            new window.kakao.maps.Size(31, 35),
            {
                shape: 'poly',
                coords: '16,0,20,2,24,6,26,10,26,16,23,22,17,25,14,35,13,35,9,25,6,24,2,20,0,16,0,10,2,6,6,2,10,0'
            });

        var map = new window.kakao.maps.Map(mapContainer, mapOption);


        circle.setMap(map);
        // 카테고리가 비어 있는 경우 기본 위치로 마커 생성
        if (category === '') {
            var position = new window.kakao.maps.LatLng(mapy, mapx);
            var selectedMarker = null;
            var marker = new window.kakao.maps.Marker({
                position: position,
                image: icon,
                clickable: true
            });
            marker.setMap(map);
            // 지도에 원을 추가합니다
            circle.setMap(map);
        } else {
            var ps = new window.kakao.maps.services.Places(map);
            ps.categorySearch(category, placesSearchCB, { useMapBounds: true });

        }

        function placesSearchCB(data, status, pagination) {
            if (status === window.kakao.maps.services.Status.OK) {
                for (var i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                }
            }
        }

        // function displayMarker(place) {


        //     var marker = new window.kakao.maps.Marker({
        //         map: map,
        //         image: icon,
        //         position: new window.kakao.maps.LatLng(place.y, place.x)
        //     });

        //     marker.normalImage = icon;

        //     window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        //         var content = `
        //         <div class="placeinfo" style="padding: 10px; padding-bottom: 30px; ">
        //             <a class="title" href="${place.place_url}" style="background: green; color: blue;  text-decoration: underline;">
        //                 ${place.place_name}<br>
        //             </a>
        //             ${place.road_address_name ?
        //                 `<span title="${place.road_address_name}" style="white-space: nowrap "> ${place.road_address_name}<br> </span>`
        //                 // `<span class="jibun" title="${place.address_name}">(지번 : ${place.address_name}) <br> </span>`
        //                 :
        //                 `<span title="${place.address_name}">${place.address_name}</span>`
        //             }
        //             <span class="tel">${place.phone}</span>
        //         </div>
        //         <div class="after"></div>`;

        //         infowindow.setContent(content);
        //         infowindow.open(map, marker);


        //         // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
        //         // 마커의 이미지를 클릭 이미지로 변경합니다
        //         if (!selectedMarker || selectedMarker !== marker) {

        //             // 클릭된 마커 객체가 null이 아니면
        //             // 클릭된 마커의 이미지를 기본 이미지로 변경하고
        //             !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

        //             // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
        //             marker.setImage(over_icon);
        //         }

        //         // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
        //         selectedMarker = marker;
        //         console.log("mouse click on");
        //     });
        // }
        function displayMarker(place) {
            var marker = new window.kakao.maps.Marker({
                map: map,
                image: icon,
                position: new window.kakao.maps.LatLng(place.y, place.x)
            });
            marker.normalImage = icon;


            let content;

            // window.kakao.maps.event.addListener(marker, 'click', function () {

            //     var content =
            //         `
            //         <div class="wrap" style="position: absolute; left = 0; bottom:1px; width: 288px; height: 132px; margin-left:-144px; text-align:left; overflow:hidden; fint-size:12px; font-family: "Pretendard", dotum, 'Pretendard", "Pretendard";line-height: 1.5;>`+
            //         `<div class="info" style="width: 286px;height: 120px; border-radius:15px;box-shadow:0px 1px 2px #888 border-bottom:2px solid #ccc; border-right:1px solid #ccc;overflow: hidden; background: #fff;">` +
            //         `<div class="title" style="padding: 5px 0 0 10px; height:30px; background: #eee; font-size:18px border-bottom:1px solid #ddd; font-weight: bold;">` +
            //         `<a class="titlea" href="${place.place_url}" style="color: blue;">` +
            //         `${place.place_name}<br>` +
            //         `</a>` +
            //         `<div class="close" style="position: absolute; top:10px; right:10px; color: #888; width:17px; height:17;">X</div>` +
            //         `</div>
            //                 <div class="body" style="position: relative; overflow:hidden">
            //                     <div class="img" style="position:absolute; top:13px; left:5px; width: 73; height:71px; border: 1px solid #ddd; color:#888; overflow:hidden"> 
            //                         <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">
            //                     </div>

            //                     <div class="desc" style="position: relative; margin: 13px 0 0 90px; height: 75px;font-size: 14px;overflow:hidden; text-overflow: ellipsis; ">
            //                     ${place.road_address_name ?
            //             `<span title="${place.road_address_name}" style="">도로명 : ${place.road_address_name}<br> </span>`
            //             // `<span class="jibun" title="${place.address_name}">(지번 : ${place.address_name}) <br> </span>`
            //             :
            //             `<span title="${place.address_name}">지번 : ${place.address_name}<br></span>`
            //         }
            //                     <span class="tel"style="position: relative;">tel :${place.phone}</span>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         `;

            //     var overlay = new window.kakao.maps.CustomOverlay({
            //         content: content,
            //         map: map,
            //         position: marker.getPosition(),
            //         yAnchor: 1,
            //         zAnchor: 3
            //     });

            //     overlay.setMap(map);

            //     const close = document.querySelectorAll(".close");

            //     close.forEach((element) => {
            //         element.addEventListener("click", function () {
            //             overlay.setMap(null);
            //         });
            //     });
            //     //infowindow.setContent(content);
            //     //infowindow.open(map, marker);

            //     // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
            //     // 마커의 이미지를 클릭 이미지로 변경합니다
            //     if (!selectedMarker || selectedMarker !== marker) {


            //         // 클릭된 마커 객체가 null이 아니면
            //         // 클릭된 마커의 이미지를 기본 이미지로 변경하고
            //         !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

            //         // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
            //         marker.setImage(over_icon);

            //     }

            //     // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
            //     selectedMarker = marker;

            //     console.log("mouse click on");
            // });
            window.kakao.maps.event.addListener(marker, 'click', function () {
                if (category === 'CE7') { //카페 overlay
                    content = `
                    <div class="wrap" style="paddinf:0; margin:0; position: absolute; left = 0; bottom:1px; width: 288px; height: 132px; margin-left:-144px; text-align:left; overflow:hidden; fint-size:12px; font-family: "Pretendard", dotum, 'Pretendard", "Pretendard";line-height: 1.5;>`+
                        `<div class="info" style="width: 286px;height: 120px; border-radius:15px; box-shadow:0px 1px 2px #888 border-bottom:2px solid #ccc; border-right:1px solid #ccc;overflow: hidden; background: #fff;">` +
                        `<div class="title" style="padding: 5px 0 0 10px; height:30px; background: rgba(254, 243, 199, 0.5); font-size:18px border-bottom:1px solid #ddd; font-weight: bold;">` +
                        `<a class="titlea" href="${place.place_url}" style="color: blue; ">` +
                        `☕ ${place.place_name}<br>` +
                        `</a>` +
                        `<div class="close" style="position: absolute; top:4px; right:10px; color: #888; width:17px; height:17;">X</div>` +
                        `</div>
                            <div class="body" style="position: relative; overflow:hidden">
                                <div class="img" style="position:absolute; top:13px; left:5px; width: 73; height:60px; border-radius-15px; border: 1px solid #ddd; color:#888; overflow:hidden"> 
                                    <div style="background-image : url("info.png"); height:60; width:73;"></div>
                                </div>

                                <div class="desc" style="position: relative; margin: 13px 0 0 90px; height: 75px;font-size: 12px; overflow:hidden; text-overflow: ellipsis; ">
                                    ${place.road_address_name ?
                            `<span title="${place.road_address_name}" style="">도로명 : ${place.road_address_name}<br> </span>`
                            // `<span class="jibun" title="${place.address_name}">(지번 : ${place.address_name}) <br> </span>`
                            :
                            `<span title="${place.address_name}">지번 : ${place.address_name}</span>`
                        }
                                    <span class="tel"style="position: relative;">tel : ${place.phone}</span>
                                    </br>
                                    <a class="url" href="${place.place_url}" style="color:blue; bottom:7px;">
                                        ${place.place_name} 상세페이지
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>
                    `;
                }
                else if (category === 'FD6') { // 음식점 overlay
                    content =
                        `
                        <div class="wrap" style="paddinf:0; margin:0; position: absolute; left = 0; bottom:1px; width: 288px; height: 132px; margin-left:-144px; text-align:left; overflow:hidden; fint-size:12px; font-family: "Pretendard", dotum, 'Pretendard", "Pretendard";line-height: 1.5;>`+
                        `<div class="info" style="width: 286px;height: 120px; border-radius:15px; box-shadow:0px 1px 2px #888 border-bottom:2px solid #ccc; border-right:1px solid #ccc;overflow: hidden; background: #fff;">` +
                        `<div class="title" style="padding: 5px 0 0 10px; height:30px; background: rgba(254, 81, 106, 0.5); font-size:18px border-bottom:1px solid #ddd; font-weight: bold;">` +
                        `<a class="titlea" href="${place.place_url}" style="color: blue; ">` +
                        `🍚 ${place.place_name}<br>` +
                        `</a>` +
                        `<div class="close" style="position: absolute; top:4px; right:10px; color: #888; width:17px; height:17;">X</div>` +
                        `</div>
                            <div class="body" style="position: relative; overflow:hidden">
                                <div class="img" style="position:absolute; top:13px; left:5px; width: 73; height:60px; border-radius-15px; border: 1px solid #ddd; color:#888; overflow:hidden"> 
                                    <div style="background-image : url("restaurant_overlay.png"); height:60; width:73;"></div>
                                </div>

                                <div class="desc" style="position: relative; margin: 13px 0 0 90px; height: 75px;font-size: 12px; overflow:hidden; text-overflow: ellipsis; ">
                                    ${place.road_address_name ?
                            `<span title="${place.road_address_name}" style="">도로명 : ${place.road_address_name}<br> </span>`
                            // `<span class="jibun" title="${place.address_name}">(지번 : ${place.address_name}) <br> </span>`
                            :
                            `<span title="${place.address_name}">지번 : ${place.address_name}</span>`
                        }
                                    <span class="tel"style="position: relative;">tel : ${place.phone}</span>
                                    </br>
                                    <a class="url" href="${place.place_url}" style="color:blue; bottom:7px;">
                                        ${place.place_name} 상세페이지
                                    </a>
                                </div>
                            </div>
                        </div>
                     </div>
                    `;
                }

                var overlay = new window.kakao.maps.CustomOverlay({
                    clickable: true,
                    content: content,
                    map: map,
                    position: marker.getPosition(),
                    yAnchor: 1,
                    zAnchor: 3
                });

                overlay.setMap(map);

                const close = document.querySelectorAll(".close");

                close.forEach((element) => {
                    element.addEventListener("click", function () {
                        overlay.setMap(null);
                    });
                });
                //infowindow.setContent(content);
                //infowindow.open(map, marker);

                // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 클릭 이미지로 변경합니다
                if (!selectedMarker || selectedMarker !== marker) {


                    // 클릭된 마커 객체가 null이 아니면
                    // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                    !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

                    // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                    marker.setImage(over_icon);

                }

                // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
                selectedMarker = marker;

                console.log("mouse click on");
            });

        }
    }, [mapx, mapy, category]);

    return <div id="map" style={{ width: '50rem', height: '24rem' }}></div>;
};

export default KakaoMap;


