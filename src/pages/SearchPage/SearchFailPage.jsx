import { useLocation, useNavigate } from "react-router-dom";

export default function SearchFailPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { uploadedImage } = location.state;

    const handleResearchButtonClick = () => {
        navigate('/');
    };

    return (
        <div id="drag-drop-area" className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="flex flex-col sm:flex-row items-center bg-white p-8 shadow-lg rounded-xl max-w-3xl w-full border-gray-300 border-2 boxshadow-2xl">
                {/* 업로드된 이미지 */}
                <div className="mb-6 sm:mb-0 sm:mr-10">
                    <img
                        className="uploadImg w-96 h-72 rounded-lg border-solid border-2 border-gray-300 shadow-sm"
                        src={uploadedImage}
                        alt="uploaded"
                    />
                </div>

                {/* 실패 메시지와 버튼 */}
                <div className="text-center sm:text-left">
                    <div className="mb-6 text-3xl font-semibold text-indigo-800">
                        검색에 실패했습니다!
                    </div>
                    <p className="mb-6 text-sm sm:text-base leading-relaxed">
                        AI가 실시간으로 이미지를 분석하기 때문에 가끔 결과가 나오지 않을 수 있습니다. <br /> <br />
                        <span className="text-black font-bold">다음 방법으로 문제를 해결해 보세요!</span>
                    </p>
                    <ul className="list-disc list-inside mb-6  text-sm sm:text-base leading-relaxed">
                        <li className="mb-3"><strong>장소가 아닌 사람이나 사물이 포함된 경우</strong>, <strong>이미지를 크롭하여 제거</strong>한 후 다시 시도해 주세요.</li>
                        <li><strong>선택한 모든 카테고리와 지역 필터를 해제</strong>하고, <strong>키워드는 입력하지 않은 상태</strong>로 검색해 주세요.</li>
                    </ul>
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg transition-colors duration-300 ease-in-out"
                        onClick={handleResearchButtonClick}
                    >
                        다시 검색하러 가기
                    </button>
                </div>
            </div>
        </div>

    );
}
