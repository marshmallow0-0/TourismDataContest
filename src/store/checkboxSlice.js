import { createSlice } from '@reduxjs/toolkit';

const initialCheckboxState = {
    selectedCities: [],
    checkboxes: [],
    checkedValues: [true, true],
    mappedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};

const checkboxSlice = createSlice({
    name: 'checkbox',
    initialState: initialCheckboxState,
    reducers: {
        setSelectedCities(state, action) {
            state.selectedCities = action.payload;
        },
        setCheckboxes(state, action) {
            state.checkboxes = action.payload.checkboxes;
            state.checkedValues = action.payload.checkedValues;
            state.mappedValues = action.payload.mappedValues;
        },
    },
});

export const checkboxActions = checkboxSlice.actions;
export default checkboxSlice.reducer;