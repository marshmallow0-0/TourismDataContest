import React, { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.css"; // CSS 모듈로 불러오기
//출처 https://ji-u.tistory.com/22
const Sidebar = ({ width = 320, children }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(width);
    const side = useRef();


    // 버튼 클릭 시 토글
    const toggleMenu = () => {
        setOpen(!isOpen);
        setX(isOpen ? width : 0);
    };

    return (

        <div className={styles.container} >
            <div ref={side} className={`${styles.sidebar} border-r-2 border-gray-300 fixed top-0 bottom-0 left-0 transition duration-400 ease-in-out text-black w-1/6 h-full z-50`} style={{ transform: `translateX(${-xPosition}px)` }}>
                {isOpen && (
                    <button onClick={() => toggleMenu()} className="button relative left-20 top-10 w-40 h-40 z-50 transition duration-800 ease border-2 border-gray-600 rounded-full overflow-hidden">
                        <svg className="h-7 w-9 transform transition-transform duration-300"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                )}
                <div className="content p-20 relative w-1/6">
                    {!isOpen && (
                        <button onClick={() => toggleMenu()} className="button relative left-20 top-5 w-24 h-24 z-50 transition duration-800 ease border-2 border-gray-600 rounded-full overflow-hidden">
                            <img src="./img/rightArrow2.png" alt="contact open button" className="openBtn ml-3 w-4 h-5" />
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
