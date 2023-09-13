import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    id: null,
    isOpen: false,
  },
  reducers: {
    setVideoParams: (state, action) => {
      return (state = {
        id: action.payload,
        isOpen: true,
      });
    },
    deleteVideoParams: (state) => {
      return (state = {
        id: null,
        isOpen: false,
      });
    },
  },
});

export const { setVideoParams, deleteVideoParams } = videoSlice.actions;

export default videoSlice.reducer;
