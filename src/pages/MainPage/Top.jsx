import React from 'react';
// import MainBody from './Body';
//import MainpageBody from './MainPageBody'; ??
import Section from './Section';
function Top() {
    return (
        <div className="bg-white " style={{ scrollBehavior: 'smooth' }}>
            <header className="flex flex-col">
                <div
                    className="relative w-3/5 h-[50vh] bg-cover bg-no-repeat mx-auto px-4 py-6 flex justify-between"
                    style={{ backgroundImage: 'url(./img/mainpageTop.png)' }}
                >
                    <img className='absolute  inset-0 flex m-auto  top-1/2 bottom-3 items-center justify-center w-32 h-32' src="./img/mainpageLogo.png" alt="logo" />
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center mb-3">
                        <h1 className="text-4xl font-bold text-white">Recommend Image Area</h1>
                    </div>

                </div>
                <nav className="flex justify-center items-center space-x-20 text-center bg-indigo-800 h-10">
                    <a href="#search" className="text-white">Go guides</a>
                    <a href="#search" className="text-white">Search</a>
                    <a href="#random" className="text-white">Random</a>
                    <a href="#" className="text-white">Popular</a>
                    <a href="#" className="text-white">News Letter</a>
                </nav>
            </header>
            <main>
                <Section />
            </main>
        </div>
    );
}

export default Top;
