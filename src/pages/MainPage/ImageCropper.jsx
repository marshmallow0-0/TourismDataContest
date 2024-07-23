// import React, { useState, createRef } from "react";
// import Cropper from "react-cropper"; // ReactCropperElement import 제거
// import "cropperjs/dist/cropper.css";
// //import "./Demo.css";

// const defaultSrc =
//     "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

// export const Demo = () => {
//     const [image, setImage] = useState(defaultSrc);
//     const [cropData, setCropData] = useState("#");
//     const cropperRef = createRef(); // 타입 어노테이션 제거
//     const onChange = e => { // any 타입 제거
//         e.preventDefault();
//         let files;
//         if (e.dataTransfer) {
//             files = e.dataTransfer.files;
//         } else if (e.target) {
//             files = e.target.files;
//         }
//         const reader = new FileReader();
//         reader.onload = () => {
//             setImage(reader.result); // as any 제거
//         };
//         reader.readAsDataURL(files[0]);
//     };

//     const getCropData = () => {
//         if (typeof cropperRef.current?.cropper !== "undefined") {
//             setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
//         }
//     };

//     return (
//         <div>
//             <div style={{ width: "100%" }}>
//                 <input type="file" onChange={onChange} />
//                 <button>Use default img</button>
//                 <br />
//                 <br />
//                 <Cropper
//                     ref={cropperRef}
//                     style={{ height: 400, width: "100%" }}
//                     zoomTo={0.5}
//                     initialAspectRatio={1}
//                     preview=".img-preview"
//                     src={image}
//                     viewMode={1}
//                     minCropBoxHeight={10}
//                     minCropBoxWidth={10}
//                     background={false}
//                     responsive={true}
//                     autoCropArea={1}
//                     checkOrientation={false}
//                     guides={true}
//                 />
//             </div>
//             <div>
//                 {/* <div className="box" style={{ width: "50%", float: "right" }}>
//                     <h1>Preview</h1>
//                     <div
//                         className="img-preview"
//                         style={{ width: "100%", float: "left", height: "300px" }}
//                     />
//                 </div> */}
//                 <div
//                     className="box"
//                     style={{ width: "50%", float: "right", height: "300px" }}
//                 >
//                     <h1>
//                         <span>Crop</span>
//                         <button style={{ float: "right" }} onClick={getCropData}>
//                             Crop Image
//                         </button>
//                     </h1>
//                     <img style={{ width: "100%" }} src={cropData} alt="cropped" />
//                 </div>
//             </div>
//             <br style={{ clear: "both" }} />
//         </div>
//     );
// };

// export default Demo;

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