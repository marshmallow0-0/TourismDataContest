import React, { useState, useEffect } from 'react';
// import Spinner from "./Spinner";
import { Oval } from "react-loader-spinner";

const Loading = () => {
    const [seconds, setSeconds] = useState(0);
    const [dots, setDots] = useState(''); // 점을 저장하는 상태

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1); // 초를 증가시킴
            setDots((prevDots) => (prevDots.length >= 5 ? '' : prevDots + '.'));
        }, 1000); // 1초마다 실행

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 타이머 정리
    }, []);

    return (
        <div>
            {/* <Oval /> */}
            <span>검색 중{dots}</span> {/* 점이 바뀌는 부분 */}
            {/* <Rings
                color="green"
                height={80}
                width={80}
                visible={true}
            /> */}
            <Oval
                color="white"
                height={24}   // 스피너의 높이
                width={110}    // 스피너의 너비
                strokeWidth={8}  // 두께 설정 (기본값보다 두껍게 설정 가능)
                visible={true}
            />
        </div>
    )
}

export default Loading;