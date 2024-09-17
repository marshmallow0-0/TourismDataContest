import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkboxActions } from "../../store/checkboxSlice";

const CheckBoxArea = () => {
    const dispatch = useDispatch();
    // undefined일 경우 대비하여 빈 배열을 기본값으로 설정
    const checkboxes = useSelector(state => state.checkbox.checkboxes || []);
    const selectedCities = useSelector(state => state.checkbox.selectedCities || []);

    const icons = [
        { id: 1, label: "건축물", icon: "🏛️" },
        { id: 2, label: "휴양지", icon: "🏖️" },
        { id: 3, label: "자연", icon: "🌳" },
        { id: 4, label: "문화", icon: "🏯" },
        { id: 5, label: "역사", icon: "📜" },
        { id: 6, label: "체험", icon: "🎢" },
    ];

    const handleToggleCheckbox = (label) => {
        dispatch(checkboxActions.toggleCheckbox(label));
        console.log(checkboxes);
    };

    const handleRemoveCheckbox = (label) => {
        dispatch(checkboxActions.removeCheckbox(label));
        console.log(checkboxes);

    };

    const handleRemoveCity = (cityName) => {
        dispatch(checkboxActions.removeCity(cityName));
    };

    return (
        <div className="p-2">

            <div className="flex flex-wrap my-4">
                {icons.map(icon => (
                    <div key={icon.id} className="text-center mr-4 mb-2">
                        <div className="text-2xl">{icon.icon}</div>
                        <input
                            type="checkbox"
                            checked={checkboxes.includes(icon.label)}
                            onChange={() => handleToggleCheckbox(icon.label)}
                        />
                    </div>
                ))}
            </div>
            <div className="max-w-sm border-y-4 border-indigo-600 p-4">
                {/* <h2 className="text-2xl font-bold">Check Box Area</h2> */}
                <div className="flex flex-wrap">
                    {checkboxes.map(tag => (
                        <div key={tag} className="bg-lime-500 text-white px-2 py-1 m-1 rounded flex items-center">
                            <button onClick={() => handleRemoveCheckbox(tag)} className="mr-2">x</button>
                            {tag}
                        </div>
                    ))}
                    {selectedCities.map(tag => (
                        <div key={tag} className="bg-indigo-500 text-white px-2 py-1 m-1 rounded flex items-center">
                            <button onClick={() => handleRemoveCity(tag)} className="mr-2">x</button>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckBoxArea;