import React from "react";
import CarouselComponent from "./CarouselComponent";

export default function RandomComponent() {

    return (
        <section >
            <nav className="flex items-center text-center text-lg bg-indigo-800 h-10 mt-10">
                <a href="#search" className="text-white">Random</a>
            </nav>
            <section className="flex justify-center mx-auto">

                <CarouselComponent />

                <div className="flex">
                </div>
            </section>
        </section>
    );
}