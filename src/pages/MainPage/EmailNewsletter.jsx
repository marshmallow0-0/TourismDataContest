import React, { useState } from 'react';

const EmailNewsletter = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = () => {
        // email 전송 기능을 추가할 수 있습니다.
        console.log('이메일 전송', selectedOption);
    };

    return (
        <div id="email-newsletter" className="my-30 flex justify-around p-20 font-Pretendard">
            <div>
                <p className="ml-20 letter text-2xl p-3 underline decoration-indigo-500">Ria-2JMU <br />Email Newsletter</p>
            </div>
            <div className="mr-20">
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    className="block mb-3 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your email address"
                />
                <label htmlFor="email" className="block mb-3 text-sm font-bold leading-6 text-gray-900">Email me about</label>

                <div className="flex items-center mb-4">
                    <input 
                        id="country-option-1" 
                        type="radio" 
                        name="newsletter-options" 
                        value="best-area" 
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="country-option-1" className="text-sm font-medium text-gray-900 ml-2 block">
                        Recommend best area
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="country-option-2" 
                        type="radio" 
                        name="newsletter-options" 
                        value="new-data" 
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="country-option-2" className="text-sm font-medium text-gray-900 ml-2 block">
                        Introduce new data
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="country-option-3" 
                        type="radio" 
                        name="newsletter-options" 
                        value="famous-place" 
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="country-option-3" className="text-sm font-medium text-gray-900 ml-2 block">
                        Suggest a famous place
                    </label>
                </div>

                <button 
                    className="middle none center rounded-lg bg-indigo-700 py-3 px-6 font-sans text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handleSubmit}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default EmailNewsletter;