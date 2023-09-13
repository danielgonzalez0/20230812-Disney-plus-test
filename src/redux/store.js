import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice  from './features/userSlice';
import videoSlice from './features/videoSlice';

// import projectsSlice from './projects.slice';

const rootReducer = combineReducers({
  user: userSlice, 
  video: videoSlice,
});

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
