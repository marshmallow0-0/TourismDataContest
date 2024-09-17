import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkboxActions } from '../../store/checkboxSlice';

const MapCity = ({ cityId, name, rank, d, textPosition = { x: 380, y: 370 } }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(checkboxActions.addCity(name)); 
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
    const selectedCities = useSelector(state => state.checkbox.selectedCities);

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
        </div>
    );
};

export default Map;