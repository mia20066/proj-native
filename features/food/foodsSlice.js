import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchFoods = createAsyncThunk(
    'foods/fetchFoods',
    async () => {
        const response = await fetch(baseUrl + 'foods');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const foodsSlice = createSlice({
    name: 'foods',
    initialState: { isLoading: true, errMess: null, foodsArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFoods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFoods.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.foodsArray = action.payload;
            })
            .addCase(fetchFoods.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const  foodsReducer = foodsSlice.reducer;