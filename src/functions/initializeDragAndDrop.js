//드래그 앤 드롭 함수 초기화 
function initializeDragAndDrop(dragDropAreaId) {
    const dragDropArea = document.getElementById(dragDropAreaId);
    //const fileUploadInput = document.getElementById(fileUploadInputId);

    dragDropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        // 드래그 오버 이벤트 처리
        dragDropArea.classList.add('drag-over');
    });

    dragDropArea.addEventListener('dragleave', function () {
        // 드래그 떠남 이벤트 처리
        dragDropArea.classList.remove('drag-over');
    });

    dragDropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        // 드롭 이벤트 처리
        dragDropArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        console.log('Dropped files:', files);
    });

    // fileUploadInput.addEventListener('change', function () {
    //     // 파일 선택 이벤트 처리
    //     const files = fileUploadInput.files;
    // });
}

export default initializeDragAndDrop;