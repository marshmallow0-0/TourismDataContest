// img.js
const handleCropImage = async () => {
    try {
        const cropped = await getCroppedImg(croppedImage, croppedAreaPixels);
        const data = new FormData();
        data.append('background', dataURLtoFile(cropped, 'background.png'));
        await api.put('/mypage/background', data);
        setCropperModal(false);
        setCroppedImage(null);
    } catch (e) {
        console.error(e);
    }
};