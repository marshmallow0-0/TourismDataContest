import React from 'react';
import ImageGallery from '../SearchPage/ImageGallery';
// import MainBody from './Body';
//import MainpageBody from './MainPageBody'; ??
//import Section from './Section';

function Top() {
    return (
        <div className="bg-white max-w-full" style={{ scrollBehavior: 'smooth' }}>
            <header className="flex flex-col">
                <div className="w-full h-[50vh] px-4 flex justify-center items-center relative">
                    <ImageGallery />
                </div>

                <nav className="flex items-center border-b-4 border-gray-950 justify-evenly text-lg p-4 rounded-none sticky top-0 z-10">
                    {/* <a href="#search" className="text-white">Go guides</a> */}
                    <a href="#category" className="text-black font-bold">Category</a>
                    <a href="#dropbox" className="text-black font-bold">DropBox</a>
                    <a href="#random" className="text-black font-bold">Random</a>
                    {/* <a href="#" className="text-white">Popular</a> */}
                    {/* <a href="#" className="text-white">News Letter</a> */}
                </nav>
            </header>
        </div>
    );
}

export default Top;
