import React, { useState } from "react";
import Map from "./MapCity";

const CheckBoxArea = ({ mapData, onCityClick, selectedCities }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    const tags = ["건축물", "휴양지", "자연", "문화", "랜드마크"];
    const icons = [
        { id: 1, label: "건축물", icon: "🏛️" },
        { id: 2, label: "휴양지", icon: "🏖️" },
        { id: 3, label: "자연", icon: "🌳" },
        { id: 4, label: "문화", icon: "🏯" },
        { id: 5, label: "랜드마크", icon: "🗽" },
    ];

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const removeTag = (tag) => {
        setSelectedTags(prev => prev.filter(t => t !== tag));
    }

    const handleRemoveCity = (cityName) => {
        const city = mapData.find(c => c.name === cityName);
        if (city) {
            onCityClick(city.cityId); // cityId를 이용하여 선택된 도시 목록에서 제거
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Check Box Setting Area</h2>
            <div className="flex flex-wrap my-4">
                {icons.map(icon => (
                    <div key={icon.id} className="text-center mr-4 mb-2">
                        <div className="text-2xl">{icon.icon}</div>
                        <input
                            type="checkbox"
                            checked={selectedTags.includes(icon.label)}
                            onChange={() => toggleTag(icon.label)}
                        />
                    </div>
                ))}
            </div>
            <div className="border-dashed border-2 border-gray-400 p-4">
                <div className="flex flex-wrap">
                    {selectedTags.map(tag => (
                        <div key={tag} className="bg-indigo-500 text-white px-2 py-1 m-1 rounded flex items-center">
                            <button onClick={() => removeTag(tag)} className="mr-2">x</button>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-dashed border-2 border-gray-400 p-4 mt-4">
                <h2 className="text-2xl font-bold">Selected Cities</h2>
                <div className="flex flex-wrap">
                    {selectedCities.map(city => (
                        <div key={city} className="bg-indigo-500 text-white px-2 py-1 m-1 rounded flex items-center">
                            <button onClick={() => handleRemoveCity(city)} className="mr-2">x</button>
                            {city}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckBoxArea;