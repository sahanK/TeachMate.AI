export const getLessonPlan = async (lessonPlanInputs: LessonPlan): Promise<PredictAPIResponse> => {
  const requestbody = {
    grade: lessonPlanInputs.grade,
    subject: lessonPlanInputs.subject,
    lesson: lessonPlanInputs.lesson,
    interest: lessonPlanInputs.classInterest,
    lesson_average_mark: lessonPlanInputs.lessonAverageMark,
    teaching_objectives: lessonPlanInputs.teachingObjectives,
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const response = await fetch('https://teachmate.site/predict', {
    method: 'POST',
    body: JSON.stringify(requestbody),
    headers,
  });
  const responseJson = await response.json();
  return responseJson;
};