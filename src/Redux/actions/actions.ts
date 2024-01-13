// // Register user
// export const register = createAsyncThunk(
//   'auth/register',
//   async (user: IRegister, thunkAPI) => {
//     try {
//       return await RegisterAsync(user);
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );
