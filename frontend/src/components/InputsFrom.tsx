'use client'

import { useState } from 'react';
import FormComboBox from './FormComboBox';
import { PlusCircleIcon, CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'

const subjects: FormComboBoxItem[] = [
  { name: 'Mathematics', value: 'mathematics' },
  { name: 'Science', value: 'science' },
];

const grades: FormComboBoxItem[] = [
  { name: '6th Grade', value: '6' },
  { name: '7th Grade', value: '7' },
];

const lessons: FormComboBoxItem[] = [
  { name: 'Circles', value: 'Circles' },
  { name: 'Positional Value', value: 'Positional Value' },
];

const classInterests: FormComboBoxItem[] = [
  { name: 'Games', value: 'Games' },
  { name: 'Videos', value: 'Videos' },
  { name: 'Art', value: 'Videos' },
  { name: 'Science', value: 'Videos' },
  { name: 'Music', value: 'Music' },
  { name: 'Travelling', value: 'Travelling' },
  { name: 'Technology', value: 'Technology' },
];

const InputsForm: React.FC = () => {
  const [selectedGrade, setSelctedGrade] = useState<FormComboBoxItem>(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState<FormComboBoxItem>(subjects[0]);
  const [selectedLesson, setSelectedLesson] = useState<FormComboBoxItem>(lessons[0]);
  const [selectedClassInterest, setSelectedClassInterest] = useState<FormComboBoxItem>(classInterests[0]);
  const [teachingObjectives, setTeachingObjectives] = useState<string[]>([]);
  const [teachingOjectiveInputValue, setTeachingObjectiveInputValue] = useState<string>('');
  const [lessonAvgMarkInputValue, setLessonAvgMarkInputValue] = useState<string>();

  console.log(selectedSubject);

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
            {teachingObjectives.map(objective => (
              <li className='flex flex-row items-center space-x-2'>
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
          This will initiate a dynamic process where our advanced AI algorithms analyze your students' characteristics and learning needs.
          It will curate a tailored selection of optimal teaching aids, carefully chosen to enhance your lesson's impact.
          The generated lesson plan will seamlessly integrate these resources, empowering you to deliver an engaging and effective educational experience.
        </p>
        <div className='flex-1 flex justify-end'>
          <button className='w-[400px] h-[50px] bg-amber-400 text-white hover:bg-amber-500 rounded-xl focus:border-amber-800'>
            FIND
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputsForm;