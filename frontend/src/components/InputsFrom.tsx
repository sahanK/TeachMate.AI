import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormComboBox from './FormComboBox';
import { PlusCircleIcon, CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import BeatLoader from "react-spinners/BeatLoader";
import { useReduxDispatch } from '@/redux/hooks';
import { setCurrentLessonPlan } from '@/redux/slices/currentLessonPlanSlice';
import { getLessonPlan } from '@/service/api';
import { validateLessonPlanInputs } from '@/utils/lessonPlan';

const subjects: FormComboBoxItem[] = [
  { name: 'Mathematics', value: 'Mathematics' },
  // { name: 'Science', value: 'Science' },
];

const grades: FormComboBoxItem[] = [
  { name: '6th Grade', value: '6' },
  // { name: '7th Grade', value: '7' },
];

const lessons: FormComboBoxItem[] = [
  { name: 'Addition', value: 'Addition' },
  { name: 'Circles', value: 'Circles' },
  { name: 'Division', value: 'Division' },
  { name: 'Fractions', value: 'Fractions' },
  { name: 'Multiplication', value: 'Multiplication' },
  { name: 'Positional Value', value: 'Positional Value' },
  { name: 'Subtraction', value: 'Subtraction' },
  { name: 'Time', value: 'Time' },
];

const classInterests: FormComboBoxItem[] = [
  { name: 'Art', value: 'Art' },
  { name: 'Games', value: 'Games' },
  { name: 'Music', value: 'Music' },
  { name: 'Science', value: 'Science' },
  { name: 'Technology', value: 'Technology' },
  { name: 'Travelling', value: 'Travelling' },
  { name: 'Videos', value: 'Videos' },
];

const InputsForm: React.FC = () => {
  const dispatch = useReduxDispatch();
  const router = useRouter();

  const [selectedGrade, setSelctedGrade] = useState<FormComboBoxItem>(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState<FormComboBoxItem>(subjects[0]);
  const [selectedLesson, setSelectedLesson] = useState<FormComboBoxItem>(lessons[0]);
  const [selectedClassInterest, setSelectedClassInterest] = useState<FormComboBoxItem>(classInterests[0]);
  const [teachingObjectives, setTeachingObjectives] = useState<string[]>([]);
  const [teachingOjectiveInputValue, setTeachingObjectiveInputValue] = useState<string>('');
  const [lessonAvgMarkInputValue, setLessonAvgMarkInputValue] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPlusButtonClick = () => {
    if (teachingOjectiveInputValue !== '') {
      setTeachingObjectives((prevValue) => [
        ...prevValue,
        teachingOjectiveInputValue
      ]);
      setTeachingObjectiveInputValue('');
    }
  };

  const onMinusButtonClick = (selectedObjective: string) => {
    setTeachingObjectives((prevValue) => 
      prevValue.filter((value) => value !== selectedObjective)
    );
  };

  const onFindButtonClick = async (event: any) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const newTeachingAid: LessonPlan = {
        grade: Number(selectedGrade.value),
        subject: selectedSubject.value,
        lesson: selectedLesson.value,
        classInterest: selectedClassInterest.value,
        lessonAverageMark: Number(lessonAvgMarkInputValue),
        teachingObjectives: teachingObjectives,
      };

      validateLessonPlanInputs(newTeachingAid);

      const response = await getLessonPlan(newTeachingAid);
      dispatch(setCurrentLessonPlan({
        ...newTeachingAid,
        teachingAid: response.teaching_aid,
        teachingAidCategory: response.teaching_aid_category,
        lessonPlan: response.lesson_plan.choices[0].message.content,
      }));
      setIsLoading(false);
      router.push('/lesson-plan');
    } catch (error: any) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  
  return (
    <form className='flex flex-1 flex-col space-y-[16px] justify-between mt-[20px]'>
      <div className='flex flex-row space-x-[10px]'>
        <div className='w-full p-4 border-[1px] border-gray-200 rounded-[24px] bg-white shadow-xl'>
          <h3 className='text-gray-400 mb-[8px] text-[12px]'>Grade</h3>
          <FormComboBox selected={selectedGrade} setSelected={setSelctedGrade} options={grades} />
        </div>
        <div className='w-full p-4 border-[1px] border-gray-200 rounded-[24px] bg-white shadow-xl'>
          <h3 className='text-gray-400 mb-[8px] text-[12px]'>Subject</h3>
          <FormComboBox selected={selectedSubject} setSelected={setSelectedSubject} options={subjects} />
        </div>
        <div className='w-full p-4 border-[1px] border-gray-200 rounded-[24px] bg-white shadow-xl'>
          <h3 className='text-gray-400 mb-[8px] text-[12px]'>Lesson</h3>
          <FormComboBox selected={selectedLesson} setSelected={setSelectedLesson} options={lessons} />
        </div>
      </div>
      <div className='w-full flex-1 p-4 border-[1px] border-gray-200 rounded-[24px] bg-white shadow-xl'>
        <h3 className='text-gray-400 mb-[8px] text-[12px]'>Teaching objectives</h3>
        {teachingObjectives.length > 0 && (
          <ul>
            {teachingObjectives.map((objective, index) => (
              <li className='flex flex-row items-center space-x-2' key={index}>
                <CheckCircleIcon className='h-5 w-5 text-amber-300' />
                <p className='font-medium text-gray-800 text-[14px]'>{objective}</p>
                <MinusCircleIcon
                  className='h-5 w-5 text-red-300 hover:scale-110 hover:transition hover:duration-300 cursor-pointer active:scale-125'
                  onClick={() => onMinusButtonClick(objective)}
                />
              </li>
            ))}
          </ul>
        )} 
        <div className='flex flex-1 flex-row justify-between items-center space-x-[8px] mt-[8px]'>
          <input
            className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id='objective'
            type='text'
            placeholder='Add new'
            value={teachingOjectiveInputValue}
            onChange={(event) => setTeachingObjectiveInputValue(event.target.value)}
          />
          <PlusCircleIcon
            className='h-8 w-8 text-gray-500 hover:scale-110 hover:transition hover:duration-300 cursor-pointer active:scale-125'
            onClick={onPlusButtonClick}
          />
        </div>
      </div>
      <div className='flex flex-row space-x-[10px]'>
        <div className='w-full p-4 border-[1px] border-gray-200 rounded-[24px] bg-white shadow-xl'>
          <h3 className='text-gray-400 mb-[8px] text-[12px]'>Class interests</h3>
          <FormComboBox selected={selectedClassInterest} setSelected={setSelectedClassInterest} options={classInterests} />
        </div>
        <div className='w-full p-4 border-[1px] border-gray-200 rounded-[24px] bg-white shadow-xl'>
          <h3 className='text-gray-400 mb-[8px] text-[12px]'>Lesson average mark</h3>
          <input
            className='w-full font-medium text-gray-800 text-[14px] px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            id='objective'
            type='text'
            placeholder='Eg: 50'
            value={lessonAvgMarkInputValue}
            onChange={(event) => setLessonAvgMarkInputValue(event.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-row'>
        <p className='flex-1 text-[12px] text-gray-500'>
          This will initiate a dynamic process where our advanced AI algorithms analyze your students&apos; characteristics and learning needs.
          It will curate a tailored selection of optimal teaching aids, carefully chosen to enhance your lesson&apos;s impact.
          The generated lesson plan will seamlessly integrate these resources, empowering you to deliver an engaging and effective educational experience.
        </p>
        <div className='flex-1 flex justify-end'>
          <button
            className='w-[400px] h-[50px] flex flex-col justify-center items-center bg-amber-400 text-white hover:bg-amber-500 rounded-xl focus:border-amber-800'
            onClick={onFindButtonClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <BeatLoader
                color={'white'}
                loading={isLoading}
                size={15}
              />
            ) : (
              <span>FIND</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputsForm;