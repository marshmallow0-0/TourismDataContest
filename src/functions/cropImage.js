// cropImage.js 파일
export default async function getCroppedImg(imageSrc, pixelCrop) {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
        image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // 이 부분은 canvas를 데이터 URL로 변환합니다.
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                // 실패 처리
                console.error('Canvas is empty');
                return;
            }
            const fileUrl = window.URL.createObjectURL(blob);
            resolve(fileUrl);
        }, 'image/jpeg');
    });
}

