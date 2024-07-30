import React, { useEffect, useState, useRef } from 'react';
import ModalExample from '../../components/Modal';
import initializeDragAndDrop from '../../functions/initializeDragAndDrop';
import { Cropper } from 'react-cropper';
//import 'cropperjs/dist/cropper.css';

import { useDispatch, useSelector } from 'react-redux';
import { imageActions } from '../../store/imageSlice';
const DragAndDropArea = ({
    uploadedImage,
    handleDrop,
    handleFileChange,
    buttonVisible,
    isImageUploaded,
    handleButtonClick,
    handleHowButtonClick,
    backgroundImageStyle,
    modalIsOpen,
}) => {
    const [cropModalIsOpen, setCropModalIsOpen] = useState(false);
    const cropperRef = useRef(null);
    const [croppedImage, setCroppedImage] = useState(null);

    useEffect(() => {
        initializeDragAndDrop('drag-drop-area');
    }, []);

    const handleCropButtonClick = () => {
        setCropModalIsOpen(true);
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            setCroppedImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
            setCropModalIsOpen(false);
        }
    };

    return (
        <div>
            <div id="drag-drop-area" className="text-center flex flex-row justify-center ml-24 mt-20" onDrop={handleDrop}>
                <label htmlFor="file-upload" className="mt-10 cursor-pointer">
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                    {uploadedImage ? (
                        <img className="uploadImg w-72 h-60 flex rounded-md border-dashed border-2 border-gray-500 p-2" src={croppedImage || uploadedImage.src} alt="upload" />
                    ) : (
                        <img className="uploadImg w-72 h-60 flex rounded-md border-dashed border-2 border-gray-500 p-2" src="./img/travel.jpg" alt="noUpload" />
                    )}
                </label>

                <div id="uploaded-image-container" className="min-w-72 min-h-72 flex flex-col p-2 ml-10 justify-center items-left" style={backgroundImageStyle}>
                    <div className="text-left mb-3 text-4xl font-Pretendard">
                        Drop Box  <br /> Area
                    </div>

                    {buttonVisible && (
                        <>
                            <button
                                className={`${isImageUploaded ? "bg-indigo-700" : "bg-gray-600"} w-28 h-10 text-center mt-2 mb-2 rounded-md inline text-xs text-white font-Pretendard`}
                                onClick={isImageUploaded ? handleButtonClick : null}>
                                Ai Search
                            </button>
                            <button
                                className="w-28 h-10 text-center bg-indigo-700  mt-2 mb-2 inline-block rounded-md px-2 py-2 text-xs text-white font-Pretendard"
                                onClick={handleCropButtonClick}>
                                Crop Image
                            </button>
                        </>
                    )}

                    {!buttonVisible && !modalIsOpen && <ModalExample />}

                    <button className="w-28 h-10 text-center bg-indigo-700 inline-block rounded-md px-2 py-2 text-xs text-white font-Pretendard" onClick={handleHowButtonClick}>How to use</button>
                </div>
            </div>

            {cropModalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-xl mb-4">Crop Image</h2>
                        <Cropper
                            className='w-full h-full'
                            ref={cropperRef}
                            src={uploadedImage?.src}
                            style={{ height: '100%', width: '100%' }}
                            initialAspectRatio={1}

                            background={false}
                            // Cropper.js options

                            guides={false}
                            responsive={true}
                            autoCropArea={1}

                        />
                        <div className='flex justify-end'>
                            <button onClick={handleCrop} className="bg-indigo-700 text-white p-2 mr-2 mt-4 rounded-md">Crop</button>
                            <button onClick={() => setCropModalIsOpen(false)} className="bg-gray-500 text-white p-2 mt-4 rounded-md">Cancel</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DragAndDropArea;