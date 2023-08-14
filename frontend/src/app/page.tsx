'use client'

import Header from "@/components/Header";
import InputsForm from "@/components/InputsFrom";
import LessonPlan from "@/components/LessonPlan";
import { useState } from "react";

const Home: React.FC = () => {
  const [isLessonPlanVisible, setIsLessonPlanVisible] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12 bg-gray-100">
      <div className="flex flex-1 flex-col w-full h-full">
        <Header />
        { !isLessonPlanVisible && <InputsForm isLessonPlanVisible={isLessonPlanVisible} setIsLessonPlanVisible={setIsLessonPlanVisible} /> }
        { isLessonPlanVisible && <LessonPlan isLessonPlanVisible={isLessonPlanVisible} setIsLessonPlanVisible={setIsLessonPlanVisible} /> }
      </div>
    </main>
  );
};

export default Home;
