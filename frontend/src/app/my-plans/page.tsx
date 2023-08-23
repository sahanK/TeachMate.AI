'use client'

import useLocalStorage from "@/hooks/useLocalStorage";
import { useMemo } from "react";

const MyPlans: React.FC = () => {
  const { data } = useLocalStorage('lessonPlans');

  const lessonPlans = useMemo(() => {
    if (data) {
      return data as LessonPlan[];
    }
    return []
  }, [data]);

  return (
    <main className="h-full w-full">
      <div className="flex flex-1 flex-col items-center">
        {lessonPlans && lessonPlans.map((lessonPlan, index) => (
          <div className="w-full flex flex-row items-start justify-between border-[1px] border-gray-200 p-4 rounded-2xl shadow-xl" key={index}>
            <div className="h-full">
              <h3 className="text-[24px] font-semibold text-gray-800">{lessonPlan.lesson} - {lessonPlan.teachingAid}</h3>
              <p className="text-[16px] text-gray-500">{lessonPlan.subject}</p>
            </div>
            <div className="h-full">
              <p>Grade {lessonPlan.grade}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default MyPlans;