import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import videoSlice from './features/videoSlice';
import contentSlice from './features/contentSlice';
import  likeSlice  from './features/likesSlice';

// import projectsSlice from './projects.slice';

const rootReducer = combineReducers({
  user: userSlice,
  video: videoSlice,
  content: contentSlice,
  like: likeSlice,
});

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
