import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyTravelRecordsForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = (e) => {
        e.preventDefault(); // 기본 동작을 막음
        e.stopPropagation(); // 이벤트 전파를 막음
        navigate('/myprofile'); // '/myprofile' 경로로 이동
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = {
            title,
            description,
            date,
            image
        };
        console.log('새로운 여행 기록:', newRecord);



        // 폼 초기화
        setTitle('');
        setDescription('');
        setDate(new Date().toISOString().slice(0, 16));
        setImage(null);
    };

    return (
        <div className="mt-20 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">여행 기록 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">사진 업로드:</label>
                    <div className="flex items-center">
                        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                            <img src="./img/travel_upload.png" alt="Upload Icon" className="w-12 h-12" />
                            {/* <a href="https://www.flaticon.com/kr/free-icons/-" title="이미지 업로드 아이콘">이미지 업로드 아이콘 제작자: JessHG - Flaticon</a> */}

                            <span className="mt-2 text-base leading-normal">이미지를 선택해주세요</span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
                {image && (
                    <div className="mb-6">
                        <img
                            src={image}
                            alt="Uploaded"
                            className="w-full max-h-80 object-cover rounded-lg shadow-sm"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">내용:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">날짜:</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button" // 이 버튼은 폼을 제출하지 않도록 설정합니다.
                        onClick={handleButtonClick}
                        className="px-4 py-2 mr-2 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        저장
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyTravelRecordsForm;
