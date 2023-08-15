import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    photo: '',
  },
  reducers: {
    setUserLoginDetails: (state, action) => {
      return (state = {
        name: action.payload.name,
        email: action.payload.email,
        photo: action.payload.photo,
      });
    },
    setSignOutState: (state) => {
      return (state = {
        name: null,
        email: null,
        photo: null,
      });
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export default userSlice.reducer;
