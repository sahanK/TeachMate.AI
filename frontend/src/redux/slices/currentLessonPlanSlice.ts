import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CurrentLessonPlan {
  lessonPlan?: LessonPlan;
};

const initialState: CurrentLessonPlan = {
  lessonPlan: undefined,
};

export const currentLessonPlanSlice = createSlice({
  name: 'currentLessonPlan',
  initialState,
  reducers: {
    setCurrentLessonPlan: (state, action: PayloadAction<LessonPlan>) => {
      state.lessonPlan = action.payload;
    },
  },
})

export const { setCurrentLessonPlan } = currentLessonPlanSlice.actions;

export default currentLessonPlanSlice.reducer;