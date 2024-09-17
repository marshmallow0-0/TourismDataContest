import React from "react";
import Carousel from "./Carousel";

export default function Random() {
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
                    <Carousel />
                </div>

                {/* 추가적인 다른 컴포넌트나 정보가 들어갈 수 있는 공간 */}
                <div className="flex flex-col items-center w-full mt-4">
                    {/* 여기에 추가적인 내용이 들어갈 수 있음 */}
                </div>
            </section>
        </section>
    );
}
