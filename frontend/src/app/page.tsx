'use client'

import Header from "@/components/Header";
import InputsForm from "@/components/InputsFrom";
import LessonPlan from "@/components/LessonPlan";
import { useState } from "react";

const Home: React.FC = () => {
  const [isLessonPlanVisible, setIsLessonPlanVisible] = useState<boolean>(false);

  return (
    <main className="h-full w-full">
      <div className="flex flex-1 flex-col w-full h-full">
        { !isLessonPlanVisible && <InputsForm isLessonPlanVisible={isLessonPlanVisible} setIsLessonPlanVisible={setIsLessonPlanVisible} /> }
        { isLessonPlanVisible && <LessonPlan isLessonPlanVisible={isLessonPlanVisible} setIsLessonPlanVisible={setIsLessonPlanVisible} /> }
      </div>
    </main>
  );
};

export default Home;
