'use client'

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useReduxDispatch } from "@/redux/hooks";
import { setCurrentLessonPlan } from "@/redux/slices/currentLessonPlanSlice";
import Image from "next/image";

const MyPlans: React.FC = () => {
  const { data } = useLocalStorage('lessonPlans');
  const dispatch = useReduxDispatch();
  const router = useRouter();

  const lessonPlans = useMemo(() => {
    if (data) {
      return data as LessonPlan[];
    }
    return []
  }, [data]);

  const onClickLessonPlan = (selectedLessonPlan: LessonPlan) => {
    dispatch(setCurrentLessonPlan(selectedLessonPlan));
    router.push('/lesson-plan');
  };

  return (
    <main className="h-full w-full">
      <div className="h-full w-full flex flex-1 flex-col items-center space-y-[24px]">
        {lessonPlans && lessonPlans.map((lessonPlan, index) => (
          <div
            className="w-full flex flex-row items-start justify-between border-[1px] border-gray-200 p-4 rounded-2xl shadow-md cursor-pointer"
            key={index}
            onClick={() => onClickLessonPlan(lessonPlan)}
          >
            <div className="h-full">
              <h3 className="text-[24px] font-semibold text-gray-800">{lessonPlan.lesson} - {lessonPlan.teachingAid}</h3>
              <p className="text-[16px] text-gray-500">{lessonPlan.subject}</p>
            </div>
            <div className="h-full">
              <p>Grade {lessonPlan.grade}</p>
            </div>
          </div>
        ))}
        {lessonPlans.length <= 0 && (
          <div className="h-full w-full flex flex-col items-center justify-center mt-[20px]">
            <Image src="/empty.svg" alt="Empty" className="h-[250px] w-[250px]" width={250} height={250} />
            <h3 className="text-gray-500 mt-[20px]">You have not saved any Lesson Plans yet</h3>
          </div>
        )}

      </div>
    </main>
  );
};

export default MyPlans;