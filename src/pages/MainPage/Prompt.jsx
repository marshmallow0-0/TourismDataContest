import React, { useState } from "react";

export default function Prompt() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-start bg-white shadow-lg rounded-lg p-4 m-4 w-80">
                <label htmlFor="Prompt" className="mb-2 text-lg font-semibold text-gray-700">Prompt:</label>
                <div className="relative w-full">
                    <textarea
                        className="w-full h-64 p-4 border border-indigo-500 rounded-lg focus:border-2 focus:border-indigo-700 focus:outline-none"
                        placeholder="Enter your text here..."
                        id="Prompt"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}