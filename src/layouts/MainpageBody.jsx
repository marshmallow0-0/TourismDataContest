import React from 'react';

function MainpageBody() {
    return (

        <main className="container max-w-4xl flex flex-row mx-auto px-4 py-8 ">
            {/* 첫 번째 div: 이미지 3개, 소개글, 버튼 */}
            <div className="flex flex-col items-center w-1/2 h-1/4">
                <div className="flex justify-around">
                    <img className="w-1/4 rounded-xl" src="./img/Namsan.jpg" alt="Image 1" />
                    <img className="w-1/4 rounded-xl" src="./img/Namsan.jpg" alt="Image 2" />
                    <img className="w-1/4 rounded-xl" src="./img/Namsan.jpg" alt="Image 3" />
                </div>
                <div className="text-center mt-4">
                    <h2 className="text-xl font-semibold">We present the best places like your picture.</h2>
                    <p className="mt-2">Sustainability is at the heart of what we stand for—that’s why we present such with AI that pledge to use searching analyzed AI methods.</p>
                    <button className="mt-4 px-4 py-2 bg-indigo-800 text-white rounded">Read our story</button>
                </div>
            </div>

            {/* 두 번째 div: MyProfile 화면 */}
            <div className="flex flex-col items-center w-full lg:w-1/2 h-auto lg:h-1/4 p-4">
                <div className="w-96 max-w-xl mx-auto">
                    <div className="relative w-full h-64">
                        <img className="w-full h-full object-cover rounded-2xl" src="./img/Namsan.jpg" alt="Background Image" />
                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                            <div className="flex justify-end space-x-2">
                                <span className="bg-white bg-opacity-75 px-2 py-1 rounded-full text-sm font-semibold">🔍 1</span>
                                <span className="bg-white bg-opacity-75 px-2 py-1 rounded-full text-sm font-semibold">❤️ 2</span>
                                <span className="bg-white bg-opacity-75 px-2 py-1 rounded-full text-sm font-semibold">🔖 3</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img className="w-16 h-16 rounded-full border-4 border-white" src="./img/travel.jpg" alt="Profile Image" />
                                <div>
                                    <h3 className="text-lg font-semibold mt-2 text-white">Admin</h3>
                                    <p className="text-white">Last Login: 25/06/2024 Tue</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex w-96 max-w-xl justify-between">
                    <button className="px-4 py-2 bg-indigo-800 text-white rounded hover:bg-indigo-700">My Profile</button>
                    <button className="px-4 py-2 bg-indigo-800 text-white rounded hover:bg-indigo-700">My Travel</button>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">Log out</button>
                </div>
            </div>
        </main>


    );
}

export default MainpageBody;
