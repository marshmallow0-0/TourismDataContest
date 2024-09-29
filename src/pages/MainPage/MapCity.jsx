import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkboxActions } from '../../store/checkboxSlice';

const MapCity = ({ cityId, name, rank, d, textPosition = { x: 380, y: 370 } }) => {
    const dispatch = useDispatch();

    // 도시 클릭 시 toggleCity 호출
    const handleClick = () => {
        dispatch(checkboxActions.toggleCity({ cityName: name, value: cityId }));
    };

    return (
        <g className="group" onClick={handleClick}>
            <path
                id={cityId}
                d={d}
                className="fill-blue-500 transition duration-300 ease-in-out group-hover:fill-blue-400 cursor-pointer"
                data-name={name}
                data-rank={rank}
            />
            <text
                x={textPosition.x}
                y={textPosition.y}
                className="text-sm fill-black transition duration-300 ease-in-out group-hover:fill-white-400"
                textAnchor="middle"
            >
                {name}
            </text>
        </g>
    );
};

const Map = ({ heatmapData }) => {
    const dispatch = useDispatch();
    const selectedCities = useSelector(state => state.checkbox.selectedCities || []);

    // 도시 선택 해제 핸들러
    const handleRemoveCity = (cityName) => {
        dispatch(checkboxActions.removeCity(cityName));
    };

    return (
        <div>
            <svg className="heatmap-map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 524 631">
                {heatmapData.map((city) => (
                    <MapCity
                        key={city.cityId}
                        cityId={city.cityId}
                        name={city.name}
                        rank={city.rank}
                        d={city.d}
                        textPosition={city.textPosition}
                    />
                ))}
            </svg>

            {/* 선택된 도시 목록 */}
            {/* <div className="selected-cities-list">
                {selectedCities.map(city => (
                    <div key={city}>
                        <span>{city}</span>
                        <button onClick={() => handleRemoveCity(city)}>Remove</button>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Map;