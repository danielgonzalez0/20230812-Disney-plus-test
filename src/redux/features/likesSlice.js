import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({
  name: 'like',
  initialState: [],
  reducers: {
    getLikes: (state, action) => {
      return (state = action.payload);
    },
    addLike: (state, action) => {
      return (state = [...state, action.payload]);
    },
    deleteLike: (state, action) => {
      return state.filter((like) => like.id !== action.payload);
    },
  },
});

export const { getLikes, addLike, deleteLike } = likeSlice.actions;

export default likeSlice.reducer;
