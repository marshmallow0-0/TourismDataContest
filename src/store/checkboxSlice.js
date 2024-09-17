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
            state.selectedCities = action.payload || [];  // 안전하게 배열 할당
            console.log('Selected Cities:', state.selectedCities);
        },
        addCity(state, action) {
            if (!state.selectedCities.includes(action.payload)) {
                state.selectedCities.push(action.payload);
            }
        },
        removeCity(state, action) {
            state.selectedCities = state.selectedCities.filter(city => city !== action.payload);
        },
        toggleCheckbox(state, action) {
            state.checkboxes = state.checkboxes || [];  // 상태 초기화 방어적 처리

            if (state.checkboxes.includes(action.payload)) {
                state.checkboxes = state.checkboxes.filter(checkbox => checkbox !== action.payload);
            } else {
                state.checkboxes.push(action.payload);
            }
        },
        removeCheckbox(state, action) {
            state.checkboxes = state.checkboxes.filter(checkbox => checkbox !== action.payload);
        },
        setCheckboxes(state, action) {
            const { checkboxes = [], checkedValues = [true, true], mappedValues = [] } = action.payload || {};

            state.checkboxes = action.payload.checkboxes;
            state.checkedValues = action.payload.checkedValues;
            state.mappedValues = action.payload.mappedValues;
        },
    },
});

export const checkboxActions = checkboxSlice.actions;
export default checkboxSlice.reducer;