import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#modal');

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명한 검은색으로 설정하여 모달을 열 때 블러 처리합니다.
        zIndex: "10",
    },
    content: {
        top: '50%', // 모달을 수직 가운데로 위치시킵니다.
        left: '50%', // 모달을 수평 가운데로 위치시킵니다.
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent', // 모달 내용의 배경을 투명하게 설정합니다.
        //backgroundColor: 'white', // 모달 내용의 배경을 투명하게 설정합니다.
        border: 'none', // 모달 테두리 제거
        //borderWidth: '1px', // 테두리 두께 설정
        //borderColor: '#ccc', // 테두리 색상 설정
        //boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)', // 그림자 추가
        borderRadius: '100%',
    },
};

const ModalExample = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [loadingText, setLoadingText] = useState('Loading.');

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText(prevText => {
                switch (prevText) {
                    case 'Loading':
                        return 'Loading.';
                    case 'Loading.':
                        return 'Loading..';
                    case 'Loading..':
                        return 'Loading...';
                    case 'Loading...':
                        return 'Loading....';
                    case 'Loading....':
                        return 'Loading.....';
                    default:
                        return 'Loading';
                }
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        openModal();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={true}
        >
            <img className="rounded-full" src="./img/loading.gif" alt="GIF" />
            <div className="text-center">
                {/* 모달 내용을 중앙에 정렬합니다. */}
                {/* <img className="rounded-full" src="./img/loading.gif" alt="GIF" /> */}
                <br />
                <div className='text-white text-2xl font-mono animate-pulse'>{loadingText}</div>

                {/* <button onClick={closeModal}>닫기</button> */}
            </div>
        </Modal >
    );
};

export default ModalExample;