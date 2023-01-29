import { type NextPage } from "next";

interface Props {
  setPage: (page: string) => void;
  winner: string;
}

const LandingScreen: NextPage<Props> = ({ setPage, winner }) => {
  return (
    <main className="flex h-[100vh] flex-col items-center justify-center">
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Dots & Boxes
        </p>
      </div>
      <div className="my-4">{winner} has won</div>
      <button
        onClick={() => setPage("")}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Back to Home
      </button>
    </main>
  );
};

export default LandingScreen;
