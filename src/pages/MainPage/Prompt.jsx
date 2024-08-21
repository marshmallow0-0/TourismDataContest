import React, { useState } from "react";

// 전체 컴포넌트
export default function ChatPrompt() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== "") {
            setMessages([...messages, inputValue]);
            setInputValue(''); // 입력 후 초기화
        }
    };

    return (
        <div className="flex flex-col justify-between items-center max-w-sm mx-auto mt-10 shadow-lg rounded-lg h-52">
            <div className="flex flex-col w-full p-4 overflow-y-auto bg-slate-300 rounded-t-lg flex-grow">
                <div className="flex flex-col space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className="self-end bg-indigo-600 text-white py-2 px-4 rounded-lg max-w-xs">
                            {message}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full p-4 bg-slate-700 shadow-lg flex items-center rounded-b-lg">
                <textarea
                    className="w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-none resize-none overflow-y-auto"
                    placeholder="Enter message"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit(); e.preventDefault(); } }}
                />
                <button
                    className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                    onClick={handleSubmit}
                >
                    send
                </button>
            </div>
        </div>
    );
}
