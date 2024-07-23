import React from "react";
// import CarouselComponent from "./CarouselComponent";
import Carousel from "./Carousel";

export default function Random() {

    return (
        <section >
            <nav className="flex items-center text-center text-lg bg-indigo-800 h-10 mt-10">
                <a href="#search" className="text-white">Random</a>
            </nav>
            <section className="flex justify-center mx-auto">

                <Carousel />

                <div className="flex">
                </div>
            </section>
        </section>
    );
}