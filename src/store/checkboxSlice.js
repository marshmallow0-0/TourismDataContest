// // import { createSlice } from '@reduxjs/toolkit';

// // const initialCheckboxState = {
// //     selectedCities: [],
// //     checkboxes: [],
// //     checkedValues: [],
// //     mappedValues: [],
// // };

// // const checkboxSlice = createSlice({
// //     name: 'checkbox',
// //     initialState: initialCheckboxState,
// //     reducers: {
// //         setSelectedCities(state, action) {
// //             state.selectedCities = action.payload || [];  // 안전하게 배열 할당
// //             console.log('Selected Cities:', state.selectedCities);
// //         },
// //         addCity(state, action) {
// //             if (!state.selectedCities.includes(action.payload)) {
// //                 state.selectedCities.push(action.payload);
// //             }
// //         },
// //         removeCity(state, action) {
// //             state.selectedCities = state.selectedCities.filter(city => city !== action.payload);
// //         },
// //         toggleCheckbox(state, action) {
// //             state.checkboxes = state.checkboxes || [];  // 상태 초기화 방어적 처리

// //             if (state.checkboxes.includes(action.payload)) {
// //                 state.checkboxes = state.checkboxes.filter(checkbox => checkbox !== action.payload);
// //             } else {
// //                 state.checkboxes.push(action.payload);
// //             }
// //         },
// //         removeCheckbox(state, action) {
// //             state.checkboxes = state.checkboxes.filter(checkbox => checkbox !== action.payload);
// //         },
// //         setCheckboxes(state, action) {
// //             const { checkboxes = [], checkedValues = [true, true], mappedValues = [] } = action.payload || {};

// //             state.checkboxes = action.payload.checkboxes;
// //             state.checkedValues = action.payload.checkedValues;
// //             state.mappedValues = action.payload.mappedValues;
// //         },
// //     },
// // });

// // export const checkboxActions = checkboxSlice.actions;
// // export default checkboxSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialCheckboxState = {
//     selectedCities: [],  // 선택된 도시
//     checkboxes: [],      // 선택된 체크박스 라벨
//     checkedValues: [],   // 체크된 항목의 고유 숫자 값
//     mappedValues: [],    // 선택된 도시의 고유 숫자 값
// };

// const checkboxSlice = createSlice({
//     name: 'checkbox',
//     initialState: initialCheckboxState,
//     reducers: {
//         // 도시 선택 로직
//         toggleCity(state, action) {
//             const { cityName, value } = action.payload;  // 도시 이름과 매핑된 숫자 값

//             // selectedCities와 mappedValues가 배열로 초기화되어 있는지 확인
//             state.selectedCities = state.selectedCities || [];
//             state.mappedValues = state.mappedValues || [];

//             if (state.selectedCities.includes(cityName)) {
//                 // 이미 선택된 도시일 경우 선택 해제
//                 state.selectedCities = state.selectedCities.filter(city => city !== cityName);
//                 state.mappedValues = state.mappedValues.filter(v => v !== value);
//             } else {
//                 // 선택되지 않은 도시일 경우 추가
//                 state.selectedCities.push(cityName);
//                 state.mappedValues.push(value);
//             }
//         },

//         // 체크박스 선택 로직
//         toggleCheckbox(state, action) {
//             const { label, value } = action.payload;

//             // checkboxes와 checkedValues가 정의되지 않았으면 빈 배열로 초기화
//             state.checkboxes = state.checkboxes || [];
//             state.checkedValues = state.checkedValues || [];

//             if (state.checkboxes.includes(label)) {
//                 // 이미 체크된 항목일 경우 체크 해제
//                 state.checkboxes = state.checkboxes.filter(item => item !== label);
//                 state.checkedValues = state.checkedValues.filter(v => v !== value);
//             } else {
//                 // 체크되지 않은 항목일 경우 추가
//                 state.checkboxes.push(label);
//                 state.checkedValues.push(value);
//             }
//         },

//         // 도시 목록을 설정하는 로직
//         setSelectedCities(state, action) {
//             state.selectedCities = action.payload || [];
//         },

//         // 체크박스 목록을 설정하는 로직
//         setCheckboxes(state, action) {
//             const { checkboxes = [], checkedValues = [], mappedValues = [] } = action.payload || {};

//             state.checkboxes = checkboxes;
//             state.checkedValues = checkedValues;
//             state.mappedValues = mappedValues;
//         },

//         // 체크박스와 도시 개별 삭제 로직
//         removeCheckbox(state, action) {
//             state.checkboxes = state.checkboxes.filter(checkbox => checkbox !== action.payload);
//             state.checkedValues = state.checkedValues.filter(v => v !== action.payload);
//         },
//         removeCity(state, action) {
//             state.selectedCities = state.selectedCities.filter(city => city !== action.payload);
//             state.mappedValues = state.mappedValues.filter(v => v !== action.payload);
//         },
//     },
// });

// export const checkboxActions = checkboxSlice.actions;
// export default checkboxSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialCheckboxState = {
    selectedCities: [],  // 선택된 도시
    checkboxes: [],      // 선택된 체크박스 라벨
    checkedValues: [],   // 체크된 항목의 고유 숫자 값
    mappedValues: [],    // 선택된 도시의 고유 숫자 값
};

const checkboxSlice = createSlice({
    name: 'checkbox',
    initialState: initialCheckboxState,
    reducers: {
        // 도시 선택 로직
        toggleCity(state, action) {
            const { cityName, value } = action.payload;  // 도시 이름과 매핑된 숫자 값

            state.selectedCities = state.selectedCities || [];
            state.mappedValues = state.mappedValues || [];

            const cityIndex = state.selectedCities.indexOf(cityName);
            if (cityIndex > -1) {
                // 이미 선택된 도시일 경우 선택 해제
                state.selectedCities = state.selectedCities.filter(city => city !== cityName);
                state.mappedValues.splice(cityIndex, 1);
            } else {
                // 선택되지 않은 도시일 경우 추가
                state.selectedCities.push(cityName);
                state.mappedValues.push(value);
            }
        },

        // 체크박스 선택 로직
        toggleCheckbox(state, action) {
            const { label, value } = action.payload;

            state.checkboxes = state.checkboxes || [];
            state.checkedValues = state.checkedValues || [];

            const checkboxIndex = state.checkboxes.indexOf(label);
            if (checkboxIndex > -1) {
                // 이미 체크된 항목일 경우 체크 해제
                state.checkboxes = state.checkboxes.filter(item => item !== label);
                state.checkedValues.splice(checkboxIndex, 1);
            } else {
                // 체크되지 않은 항목일 경우 추가
                state.checkboxes.push(label);
                state.checkedValues.push(value);
            }
        },

        // 도시 목록을 설정하는 로직
        setSelectedCities(state, action) {
            state.selectedCities = action.payload || [];
        },

        // 체크박스 목록을 설정하는 로직
        setCheckboxes(state, action) {
            const { checkboxes = [], checkedValues = [], mappedValues = [] } = action.payload || {};

            state.checkboxes = checkboxes;
            state.checkedValues = checkedValues;
            state.mappedValues = mappedValues;
        },

        // 체크박스 개별 삭제 로직
        removeCheckbox(state, action) {
            const label = action.payload;
            const checkboxIndex = state.checkboxes.indexOf(label);

            if (checkboxIndex > -1) {
                state.checkboxes = state.checkboxes.filter(checkbox => checkbox !== label);
                state.checkedValues.splice(checkboxIndex, 1);
            }
        },

        // 도시 개별 삭제 로직
        removeCity(state, action) {
            const cityName = action.payload;
            const cityIndex = state.selectedCities.indexOf(cityName);

            if (cityIndex > -1) {
                state.selectedCities = state.selectedCities.filter(city => city !== cityName);
                state.mappedValues.splice(cityIndex, 1);  // 인덱스에 해당하는 mappedValues 값 삭제
            }
        },
    },
});

export const checkboxActions = checkboxSlice.actions;
export default checkboxSlice.reducer;
