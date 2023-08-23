import { configureStore } from '@reduxjs/toolkit';
import currentTeachingAidReducer from './slices/currentLessonPlanSlice';

export const store = configureStore({
  reducer: {
    currentLessonPlan: currentTeachingAidReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;