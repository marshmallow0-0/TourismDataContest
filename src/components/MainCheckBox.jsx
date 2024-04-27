import React from 'react';

function MainCheckBox({ id, color, label, isChecked, onChange }) {
    return (
        <div className="flex items-center me-4">
            <input
                checked={isChecked}
                id={id}
                type="checkbox"
                value=""
                onChange={(e) => onChange(id, e.target.checked)}
                className={`w-4 h-4 text-${color}-600 bg-gray-100 border-gray-300 rounded focus:ring-${color}-500 dark:focus:ring-${color}-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
            />
            <label
                htmlFor={id}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
        </div>
    );
}

export default MainCheckBox;