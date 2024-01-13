import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InitialState} from '../../Utils/types';
export const initialState: InitialState = {
  loading: false,
  categories: [],
  meals: [],
};

export const reducer = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder;
    // *********** REGISTER START *********** \\
    // .addCase(register.pending, state => {
    //   state.isFetchingUser = true;
    //   state.message = '';
    //   state.success = false;
    //   state.error = false;
    // })
    // .addCase(
    //   register.fulfilled,
    //   (state, action: PayloadAction<RegisterResponse>) => {
    //     if (action.payload.status) {
    //       // state.isAuthenticated = true;
    //       // state.user = {
    //       //   email:action.payload.email,
    //       //   fullName:action.payload.fullName,
    //       // };
    //       // state.token = action.payload.token;
    //       state.success = true;
    //     } else {
    //       state.message = action.payload.message;
    //       state.error = true;
    //     }
    //     state.isFetchingUser = false;
    //   },
    // )
  },
});

export const {} = reducer.actions;

export default reducer.reducer;
