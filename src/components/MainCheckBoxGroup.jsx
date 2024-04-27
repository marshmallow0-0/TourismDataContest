import React, { useState } from 'react';

import MainCheckBox from './MainCheckBox';
function MainCheckBoxGroup({ onChange }) {
    const [checkboxes, setCheckboxes] = useState([
        { id: 'incheon-checkbox', color: 'teal', label: 'Incheon', isChecked: true },
        { id: 'seoul-checkbox', color: 'teal', label: 'Seoul', isChecked: true },
        { id: 'history-checkbox', color: 'teal', label: 'history', isChecked: true },
        { id: 'building-checkbox', color: 'teal', label: 'building', isChecked: true },
        { id: 'recreation-checkbox', color: 'teal', label: 'recreation', isChecked: true },
        { id: 'nature-checkbox', color: 'teal', label: 'nature', isChecked: true },
        { id: 'culture-checkbox', color: 'teal', label: 'culture', isChecked: true },
    ]);

    const handleCheckboxChange = (id, checked) => {
        const updatedCheckboxes = checkboxes.map(cb =>
            cb.id === id ? { ...cb, isChecked: checked } : cb
        );
        setCheckboxes(updatedCheckboxes);
        onChange(updatedCheckboxes);
    };

    return (
        <div className='flex flex-col mb-1'> {/* flex-direction이 column이면 요소들을 세로로 배열합니다. */}
            <div className='flex mb-3 flex-col'> {/* 첫 번째 체크박스 그룹 */}
                <h2 className='flex justify-start mb-1'>Region</h2>
                {checkboxes.slice(0, 2).map(cb => (
                    < MainCheckBox
                        key={cb.id}
                        id={cb.id}
                        color={cb.color}
                        label={cb.label}
                        isChecked={cb.isChecked}
                        onChange={handleCheckboxChange}
                    />
                ))}
            </div>
            <h2 className='flex justify-start mb-1'>Facility</h2>
            <div className='flex'> {/* 두 번째 체크박스 그룹 */}

                {checkboxes.slice(2).map(cb => (
                    < MainCheckBox
                        key={cb.id}
                        id={cb.id}
                        color={cb.color}
                        label={cb.label}
                        isChecked={cb.isChecked}
                        onChange={handleCheckboxChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default MainCheckBoxGroup;