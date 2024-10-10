import React, { useState } from "react";

// 전체 컴포넌트
export default function ChatPrompt({ setUserText }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== "") {
            const updateMessages = [...messages, inputValue];  // inputValue를 포함한 새로운 배열 생성

            setMessages(updateMessages);
            // 부모 컴포넌트에 입력된 텍스트 전달
            setUserText(updateMessages);
            console.log("updateMessages", updateMessages);
            setInputValue(''); // 입력 후 초기화
        }
    };

    const handleDelete = (indexToDelete) => {
        const updatedMessages = messages.filter((_, index) => index !== indexToDelete);
        setMessages(updatedMessages); // 상태 업데이트
        setUserText(updatedMessages); // 상태 업데이트
        console.log("updatedMessages", updatedMessages);

    };

    return (
        <div className=" mb-4 md:-translate-x-7 sm:-translate-x-4 flex flex-col justify-between items-center w-full max-w-md mx-auto mt-4 shadow-lg rounded-lg min-h-[10rem] max-h-[20rem]">
            {/* 스크롤이 가능한 메시지 영역 */}
            <div className="w-full p-3 text-white text-sm overflow-y-auto min-h-[8rem] max-h-[20rem] border border-black rounded-lg">
                {messages.map((message, index) => (
                    <div key={index} className="bg-gray-500 text-white py-2 px-3 mb-2 rounded-lg max-w-xs relative">
                        {/* 메시지 내용 */}
                        {message}

                        {/* 삭제 버튼 */}
                        <button
                            onClick={() => handleDelete(index)} // 삭제 핸들러 호출
                            className="absolute top-1 right-1 text-white px-2 py-1.5 rounded text-xs"
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>

            {/* 입력창과 버튼 */}
            <div className=" w-full p-2 bg-gray-800 shadow-lg flex items-center rounded-b-lg min-h-[4rem]">
                <textarea
                    className="w-full h-12 min-h-[3rem] max-h-[6rem] p-2 bg-gray-700 text-white rounded-lg focus:outline-none resize-none overflow-y-auto"
                    placeholder="키워드 입력..."
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit(); e.preventDefault(); } }}
                />
                <button
                    className="ml-2 bg-gray-500 text-white py-2 px-3 rounded-lg hover:bg-gray-600 min-w-[3rem] max-w-[4rem]"
                    onClick={handleSubmit}
                >
                    ➤
                </button>
            </div>
        </div>
    );
}
