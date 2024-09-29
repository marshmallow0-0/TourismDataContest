import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import { getRandomPlaces } from "../../api/api";

export default function Random() {
    // 초기 정적 데이터를 설정
    const [places, setPlaces] = useState([
        {
            name: "희와래 커피로스터스",
            address: "인천광역시 강화군 불은면 덕진로178번길 25-29",
            description: "공유양조벤처센터 술지움은 농식품부 농촌신활력플러스사업 일환으로 맥주, 증류주, 과실수, 탁약주를 사전 시뮬레이션 해볼 수 있는 양조 시설이 구비된 제조장을 통하여 양조 분야 예비 창업인을 육성하는 곳이다. 주류 관련 다양한 체험과 교육을 통하여 술 산업의 저변 확대와 관광객을 유치하여 지역 경제를 활성화하기 위해 설립되었다.",
            images: [
                { img_url: "http://tong.visitkorea.or.kr/cms/resource/47/3375847_image2_1.jpg" }
            ]
        }
    ]); // 장소 데이터를 위한 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // 컴포넌트가 마운트될 때 API 호출
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const data = await getRandomPlaces();
                console.log("random image", data);
                setPlaces(data); // API로 받은 데이터로 places 업데이트
                setLoading(false); // 로딩 완료
            } catch (err) {
                setError('장소 데이터를 불러오는 중 오류가 발생했습니다.');
                setLoading(false); // 에러 시에도 로딩 완료 처리
            }
        };

        fetchPlaces(); // 함수 호출
    }, []); // 빈 배열이므로 처음에 한 번만 실행

    return (
        <section>
            {/* 상단 네비게이션 */}
            <nav className="flex items-center justify-between text-lg bg-indigo-800 p-4 shadow-lg rounded-md w-full">
                <a href="#random" className="text-white font-semibold">Random</a>
            </nav>

            {/* Carousel과 컨텐츠를 감싸는 영역 */}
            <section className="flex flex-col items-center justify-center mx-auto w-full max-w-4xl px-4 py-8">
                {/* Carousel 컴포넌트 */}
                <div className="w-full">
                    {loading ? (
                        <Carousel places={places} />  // 로딩 중일 때 정적 데이터 표시
                    ) : error ? (
                        <p>{error}</p>  // 에러 발생 시 메시지 표시
                    ) : (
                        <Carousel places={places} />  // API 데이터를 Carousel에 전달
                    )}
                </div>

                {/* 추가적인 다른 컴포넌트나 정보가 들어갈 수 있는 공간 */}
                <div className="flex flex-col items-center w-full mt-4">
                    {/* 여기에 추가적인 내용이 들어갈 수 있음 */}
                </div>
            </section>
        </section>
    );
}