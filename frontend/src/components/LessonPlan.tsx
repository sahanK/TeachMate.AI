import { Dispatch, SetStateAction, useMemo } from "react";
import { BookmarkIcon, ShareIcon, DocumentIcon } from '@heroicons/react/24/outline'
import useLocalStorage from "@/hooks/useLocalStorage";
import { getLessonPlanSections } from "@/utils/lessonPlan";
import { useReduxSelector } from "@/redux/hooks";

type LessonPlanProps = {
  isLessonPlanVisible: boolean;
  setIsLessonPlanVisible: Dispatch<SetStateAction<boolean>>
};

const LessonPlan: React.FC<LessonPlanProps> = ({ isLessonPlanVisible, setIsLessonPlanVisible }) => {
  const currentLessonPlan = useReduxSelector(state => state.currentLessonPlan.lessonPlan);
  const {data: lessonPlans, setData: saveLessonPlans} = useLocalStorage('lessonPlans');

  console.log(currentLessonPlan);

  const sections: string[][] = useMemo(() => {
    if (currentLessonPlan && currentLessonPlan.lessonPlan) {
      return getLessonPlanSections(currentLessonPlan.lessonPlan);
    }
    return [[]];
  }, [currentLessonPlan]);

  const onSaveClick = () => {
    if (currentLessonPlan) {
      let newLessonPlans = [];
      if (lessonPlans !== null) {
        newLessonPlans = [...lessonPlans, currentLessonPlan];
      } else {
        newLessonPlans = [currentLessonPlan];
      }
      saveLessonPlans(newLessonPlans);
    }
  };

  return (
    <div className="flex-1 flex-col">
      {
        sections.map((section, sectionIndex) => {
          return (
            <div className="flex flex-col my-[16px]" key={sectionIndex}>
              {
                section.map((item, itemIndex) => {
                  if (item === 'Procedure:') {
                    return (
                      <div
                        className="flex flex-row items-center space-x-10 p-2 rounded-full border-2 border-gray-200"
                        key={itemIndex}
                      >
                        <h2 className="text-[24px] font-bold border-2 border-amber-300 rounded-full p-2">{currentLessonPlan?.teachingAid}</h2>
                        <BookmarkIcon
                          className="teaching-aid-action"
                          onClick={onSaveClick}
                        />
                        <ShareIcon
                          className="teaching-aid-action"
                          onClick={() => {}}
                        />
                        <DocumentIcon
                          className="teaching-aid-action"
                          onClick={() => {}}
                        />
                      </div>
                    )
                  }
                  if (itemIndex === 0) {
                    return <h2 className="text-[16px] font-semibold" key={itemIndex}>{item}</h2>
                  }
                  return <p className="text-[14px] text-gray-600" key={itemIndex}>{item}</p>
                })
              }
            </div>
          )
        })
      }
      <div className='flex-1 flex justify-end'>
        <button
          className='w-[400px] h-[50px] bg-amber-400 text-white hover:bg-amber-500 rounded-xl focus:border-amber-800'
          onClick={(event) => {
            event.preventDefault()
            setIsLessonPlanVisible(false)
          }}
        >
          CREATE ANOTHER
        </button>
      </div>
    </div>
  );
};

export default LessonPlan;