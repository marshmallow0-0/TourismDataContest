import { createSlice } from '@reduxjs/toolkit';

const initialImageState = {
  uploadedImage: null,
  isImageUploaded: false,
  imageFile: null,
  image: '', // 초기 이미지 설정
  cropData: "",
};

const imageSlice = createSlice({
  name: 'image',
  initialState: initialImageState,
  reducers: {
    setImage(state, action) {
      state.image = action.payload;
    },
    setUploadedImage(state, action) {
      state.uploadedImage = action.payload;
      state.isImageUploaded = true;
    },
    setImageFile(state, action) {
      state.imageFile = action.payload;
    },
    setCropData(state, action) {
      state.cropData = action.payload;
    },
    resetImage(state) {
      state.uploadedImage = null;
      state.isImageUploaded = false;
      state.imageFile = null;
      state.image = '';
      state.cropData = "";
    },
  },
});

export const imageActions = imageSlice.actions;
export default imageSlice.reducer;