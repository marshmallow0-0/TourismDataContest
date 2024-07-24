import React, { useState } from "react";

export default function Prompt() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <div>
            <label htmlFor="Prompt">Prompt:</label>
            <input
                className="border border-indigo-500 m-2 p-2 rounded-lg focus:border-3 focus:border-indigo-700 focus:outline-none "
                type="text"
                id="Prompt"
                value={inputValue}
                onChange={handleChange}
            />

        </div>

    );
}