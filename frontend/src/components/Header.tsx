import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col w-full mb-[20px]">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-gray-800 text-[36px]">TeachMate.AI</h1>
        <div className="flex flex-row items-center space-x-[16px]">
          <Link href='/'>
            <h3 className="bg-amber-100 py-2 px-4 rounded-md border-2 border-amber-400 text-amber-400">Home</h3>
          </Link>
          <Link href='/my-plans'>
            <h3 className="bg-amber-100 py-2 px-4 rounded-md border-2 border-amber-400 text-amber-400">My Plans</h3>
          </Link>
        </div>
      </div>
      <p className="text-gray-600">
        Revolutionize your teaching approach using AI-generated aids!
        Craft engaging lessons with personalized teaching materials aligned
        to your students&apos; individual traits. Elevate education through innovation today.
      </p>
    </div>
  );
};

export default Header;