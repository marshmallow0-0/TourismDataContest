import { useLocation, useNavigate } from "react-router-dom";

export default function SearchFailPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { uploadedImage, imageFile } = location.state;

    const handleResearchButtonClick = () => {
        navigate('/');
    };

    return (
        <div id="drag-drop-area" className="text-center flex flex-row justify-center gap-10" >
            <label htmlFor="file-upload" className="mt-10 cursor-pointer">
                <img className="uploadImg max-w-2xl w-80 h-60 flex rounded-md border-solid border-2 border-gray-400 p-2" src={uploadedImage} alt="upload" />
            </label>

            <div id="uploaded-image-container" className="min-w-64 min-h-64 flex flex-col ml-20 justify-center items-left">
                <div className="text-left mb-8 text-4xl font-Pretendard">
                    Search <strong className="text-red-500">Fail</strong>  <br /> Area Picture
                </div>
                <button
                    className={`bg-lime-700 w-28 h-10 text-center mb-2 rounded-md inline-block text-xs text-white font-Pretendard`}
                    onClick={() => handleResearchButtonClick()}>
                    Main
                </button>

            </div>
        </div >
    );
}