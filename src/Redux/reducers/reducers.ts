import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APICallResponseType, InitialState} from '../../Utils/types';
import {
  getCategoryList,
  getMealsByName,
  getRandomMeals,
} from '../actions/actions';
export const initialState: InitialState = {
  loading: true,
  categories: [],
  meals: [],
  error: false,
  success: false,
  message: '',
  randomMeals: [],
  isRandomMealsLoading: true,
};

export const reducer = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // *********** getMealsByName START *********** \\
      .addCase(getMealsByName.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        getMealsByName.fulfilled,
        (state, action: PayloadAction<APICallResponseType>) => {
          if (action.payload.status) {
            state.meals = action.payload.data;
            state.success = true;
          } else {
            state.message = action.payload.message;
            state.error = true;
          }
          state.loading = false;
        },
      )
      // *********** getMealsByName END *********** \\
      // *********** getCategoryList START *********** \\
      .addCase(getCategoryList.pending, state => {
        state.loading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        getCategoryList.fulfilled,
        (state, action: PayloadAction<APICallResponseType>) => {
          if (action.payload.status) {
            state.categories = action.payload.data;
            state.success = true;
          } else {
            state.message = action.payload.message;
            state.error = true;
          }
          state.loading = false;
        },
      )
      // *********** getCategoryList END *********** \\
      // *********** getRandomMeals START *********** \\
      .addCase(getRandomMeals.pending, state => {
        state.isRandomMealsLoading = true;
        state.message = '';
        state.success = false;
        state.error = false;
      })
      .addCase(
        getRandomMeals.fulfilled,
        (state, action: PayloadAction<APICallResponseType>) => {
          if (action.payload.status) {
            state.randomMeals = action.payload.data;
            state.success = true;
          } else {
            state.message = action.payload.message;
            state.error = true;
          }
          state.isRandomMealsLoading = false;
        },
      );
    // *********** getRandomMeals END *********** \\
  },
});

export const {} = reducer.actions;

export default reducer.reducer;
