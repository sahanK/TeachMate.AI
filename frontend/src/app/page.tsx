'use client'

import InputsForm from "@/components/InputsFrom";

const Home: React.FC = () => {
  return (
    <main className="h-full w-full">
      <div className="flex flex-1 flex-col w-full h-full">
        <InputsForm />
      </div>
    </main>
  );
};

export default Home;
