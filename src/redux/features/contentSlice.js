import { createSlice } from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'content',
  initialState: null,
  reducers: {
    setContent: (state, action) => {
      return (state = action.payload);
    },
    deleteContent: (state) => {
      return (state = null);
    },
  },
});

export const {setContent, deleteContent} = contentSlice.actions;

export default contentSlice.reducer;
