import React from 'react';
import Cropper from 'react-cropper';

const ImageCropper = ({ cropData, getCropData, cropperRef, image }) => {
    return (
        <div className="flex flex-row justify-center items-center ml-14 mt-20 gap-20">
            <div className="text-right border-dashed border-2 border-gray-500 rounded-md">
                <div className="flex flex-col items-center">
                    <div className="border">
                        {cropData ? (
                            <img className="mr-2 ml-2 mt-2 mb-2 w-72 h-60" src={cropData} alt="Cropped" />
                        ) : (
                            <img className="mr-2 ml-2 mt-2 mb-2 w-72 h-60" src="./img/no_image.png" alt="No Crop" />
                        )}
                    </div>
                    <br />
                    <p className="text-md font-Pretendard text-semibold">Cropped Image</p>
                    <br />
                </div>
            </div>
            <div className="flex flex-col ml-10">
                <Cropper
                    ref={cropperRef}
                    className='w-72 h-72'
                    style={{ height: "10em", width: "20em" }}
                    zoomTo={0.2}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={true}
                />
                <button className="mt-3 w-28 h-10 bg-indigo-700 rounded-md px-2 py-2 text-xs text-white font-Pretendard" onClick={getCropData}>
                    Crop
                </button>
            </div>
        </div>
    );
};

export default ImageCropper;