import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/userSlice';

// import projectsSlice from './projects.slice';

// const rootReducer = combineReducers({
//   user: userSlice,
//   //   projects: projectsSlice,
// });

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
