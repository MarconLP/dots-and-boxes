import { type NextPage } from "next";
import { useSubscribeToEvent } from "../utils/pusher";
import DotsLoader from "@components/DotsLoader";

interface Props {
  setPage: (page: string) => void;
  setTeam: (team: string) => void;
  roomId: string;
  username: string;
}

const Room: NextPage<Props> = ({ setPage, roomId, setTeam, username }) => {
  useSubscribeToEvent(
    "game-start",
    ({ teams }: { teams: [{ user: string; team: string }] }) => {
      const team: string | undefined = teams.find(
        (x) => x.user === username
      )?.team;
      if (team) {
        setTeam(team);
        setPage("game");
      } else {
        setPage("");
      }
    }
  );

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center">
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Dots & Boxes
        </p>
      </div>
      <div className="pt-1">
        <p className="text-sm tracking-tight text-gray-500">
          Waiting for opponent to join: {roomId}
        </p>
      </div>
      <DotsLoader />
      {/*<div className="mt-4 w-[200px] border border-[#E2E8F0] p-2">*/}
      {/*  {players.map((room) => (*/}
      {/*    <div*/}
      {/*      key={room}*/}
      {/*      className="flex h-8 cursor-pointer items-center justify-center"*/}
      {/*    >*/}
      {/*      <div className="m-2 flex h-full w-full items-center justify-center rounded text-center text-sm hover:bg-[#e5e7e0]">*/}
      {/*        <p>{room}</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      {/*<button*/}
      {/*  onClick={() => setPage("game")}*/}
      {/*  disabled={players.length !== 2}*/}
      {/*  className="mt-4 mr-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"*/}
      {/*>*/}
      {/*  Start game*/}
      {/*</button>*/}
    </main>
  );
};

export default Room;
