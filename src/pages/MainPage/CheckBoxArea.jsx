import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkboxActions } from "../../store/checkboxSlice";

const CheckBoxArea = () => {
    const dispatch = useDispatch();

    // undefined일 경우 대비하여 빈 배열을 기본값으로 설정
    const checkboxes = useSelector(state => state.checkbox.checkboxes || []);
    const selectedCities = useSelector(state => state.checkbox.selectedCities || []);
    const checkedValues = useSelector(state => state.checkbox.checkedValues || []);
    const mappedValues = useSelector(state => state.checkbox.mappedValues || []);

    const icons = [
        { id: 1, label: "건축물", icon: "🏛️" },
        { id: 2, label: "휴양지", icon: "🏖️" },
        { id: 3, label: "자연", icon: "🌳" },
        { id: 4, label: "문화", icon: "🏯" },
        { id: 5, label: "역사", icon: "📜" },
        { id: 6, label: "체험", icon: "🎢" },
    ];

    // 체크박스 토글 처리
    const handleToggleCheckbox = (label, value) => {
        dispatch(checkboxActions.toggleCheckbox({ label, value }));
    };

    // 체크박스 해제(삭제) 처리
    const handleRemoveCheckbox = (label) => {
        dispatch(checkboxActions.removeCheckbox(label));  // label만 전달
    };

    // 도시 해제(삭제) 처리
    const handleRemoveCity = (cityName) => {
        dispatch(checkboxActions.removeCity(cityName));  // cityName만 전달
    };

    // 상태 변화 후 체크박스 상태 확인 (useEffect 사용)
    useEffect(() => {
        console.log("체크박스 상태 확인1", checkboxes);
    }, [checkboxes]);

    useEffect(() => {
        console.log("도시 상태 확인", selectedCities);
    }, [selectedCities]);

    return (
        <div className="p-2">
            {/* 체크박스 영역 */}
            <div className="flex flex-wrap my-4">
                {icons.map(icon => (
                    <div key={icon.id} className="text-center mr-4 mb-2">
                        <div className="text-2xl">{icon.icon}</div>
                        <input
                            type="checkbox"
                            checked={checkboxes.includes(icon.label)}  // checkboxes는 라벨을 저장하므로, icon.label을 사용해야 함
                            onChange={() => handleToggleCheckbox(icon.label, icon.id)}
                        />
                    </div>
                ))}
            </div>

            {/* 선택된 체크박스 및 도시 */}
            <div className="max-w-sm border-y-4 border-indigo-600 p-4">
                {/* 선택된 체크박스 */}
                <div className="flex flex-wrap">
                    {checkboxes.map(tag => (
                        <div key={tag} className="bg-lime-500 text-white px-2 py-1 m-1 rounded flex items-center">
                            <button onClick={() => handleRemoveCheckbox(tag)} className="mr-2">x</button>
                            {tag}
                        </div>
                    ))}
                </div>

                {/* 선택된 도시 */}
                <div className="flex flex-wrap">
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
