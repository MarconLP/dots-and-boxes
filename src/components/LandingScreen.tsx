import { type NextPage } from "next";
import { api } from "../utils/api";
import { ChangeEvent, useState } from "react";
import { faker } from "@faker-js/faker";

interface Props {
  setPage: (page: string) => void;
}

const LandingScreen: NextPage<Props> = ({ setPage }) => {
  const [username, setUsername] = useState("");
  const createRoom = api.room.createRoom.useMutation();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handleNewRoom = () => {
    createRoom.mutate(
      {
        username: username || faker.name.fullName(),
      },
      { onSuccess: () => setPage("room") }
    );
  };

  const handleRoomListClick = () => {
    setPage("room-list");
  };

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center">
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Dots & Boxes
        </p>
      </div>
      <div>
        <div>
          <div className="mt-1">
            <input
              type="text"
              id="name"
              value={username}
              onChange={handleUsernameChange}
              maxLength={30}
              name="name"
              autoComplete="given-name"
              placeholder="Choose a name"
              className="mt-8 mb-4 block h-8 w-full rounded-md border border-[#E2E8F0] px-2 shadow-sm focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleRoomListClick}
            disabled={createRoom.isLoading}
            className="mr-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
          >
            Find a Game
          </button>
          <button
            onClick={handleNewRoom}
            disabled={createRoom.isLoading}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
          >
            Create a Room
          </button>
        </div>
      </div>
    </main>
  );
};

export default LandingScreen;
