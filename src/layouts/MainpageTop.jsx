import React from 'react';

function MainpageTop() {
    return (
        <div className="">
            <header className="bg-white flex flex-col">
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
                    <a href="#random" className="text-white">Search</a>
                    <a href="#" className="text-white">Random</a>
                    <a href="#" className="text-white">Popular</a>
                    <a href="#" className="text-white">News Letter</a>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div id="search" className="h-10 bg-gray-200">
                    <h2 className="text-3xl">Go guides</h2>
                </div>
                <div id="random" className="h-10 bg-gray-200">
                    <h2 className="text-3xl">random</h2>
                </div>


            </main>

            <footer className="bg-white shadow mt-8">

            </footer>
        </div>
    );
}

export default MainpageTop;
