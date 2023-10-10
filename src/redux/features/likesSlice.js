import { createSlice } from '@reduxjs/toolkit';
// import db from '../../utils/firebase';
// import { doc, setDoc } from 'firebase/firestore';

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
    // setLikesOnFirebase: async (state, action) => {
    //   const likesRef = doc(db, 'likes', action.payload);
    //   state = [...state]
    //   console.log(state);
    //   await setDoc(likesRef, {
    //     data:state,
    //   });
    // },
  },
});

export const { getLikes, addLike, deleteLike } = likeSlice.actions;

export default likeSlice.reducer;
