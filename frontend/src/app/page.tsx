import Header from "@/components/Header";
import InputsForm from "@/components/InputsFrom";

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12 bg-gray-100">
      <div className="flex flex-1 flex-col w-full h-full">
        <Header />
        <InputsForm />
      </div>
    </main>
  );
};

export default Home;
