export const getLessonPlanSections = (content: string) => {
  let currentSection: string[] = [];
  let sections: string[][] = [];
  const split1 = content.split('\n');
  split1.forEach(item => {
    if (item === '') {
      sections.push(currentSection);
      currentSection = [];
    } else {
      currentSection.push(item)
    }
  })
  console.log(sections)
  return sections;
};

export const validateLessonPlanInputs = (lessonPlan: LessonPlan) => {
  if (!lessonPlan.grade || isNaN(lessonPlan.grade)) {
    throw new Error('Please enter the grade');
  }
  if (!lessonPlan.lessonAverageMark || isNaN(lessonPlan.lessonAverageMark)) {
    throw new Error('Please enter the lesson average mark');
  }
  if (!lessonPlan.classInterest || lessonPlan.classInterest === '') {
    throw new Error('Please select the class interest');
  }
  if (!lessonPlan.lesson || lessonPlan.lesson === '') {
    throw new Error('Please select the lesson');
  }
  if (!lessonPlan.subject || lessonPlan.subject === '') {
    throw new Error('Please select the subject');
  }
  if (lessonPlan.teachingObjectives.length === 0) {
    throw new Error('Please add the teaching objectives');
  }
  lessonPlan.teachingObjectives.forEach((teachingObjective) => {
    if (
      teachingObjective === ' ' ||
      typeof teachingObjective !== 'string' ||
      !isNaN(parseFloat(teachingObjective))
    ) {
      throw new Error('Please add valid teaching objectives.');
    }
  });
};