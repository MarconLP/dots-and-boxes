import { type NextPage } from "next";
import { api } from "../utils/api";
import { faker } from "@faker-js/faker";

interface Props {
  username: string;
  setUsername: (username: string) => void;
  setPage: (username: string) => void;
  setRoomId: (username: string) => void;
}

const RoomList: NextPage<Props> = ({
  username,
  setUsername,
  setPage,
  setRoomId,
}) => {
  const { data: rooms, isLoading } = api.room.getAll.useQuery(undefined, {
    refetchInterval: 5000,
  });

  const handleClick = (roomId: string) => () => {
    const newUsername = username || faker.name.middleName();
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    setRoomId(roomId);
    setPage("room");
  };

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center">
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Dots & Boxes
        </p>
      </div>
      <div className="pt-1">
        <p className="text-sm tracking-tight text-gray-500">
          Click to join a room
        </p>
      </div>
      <div className="mt-4 max-h-[60vh] w-[300px] overflow-scroll rounded border border-[#E2E8F0] p-2">
        {isLoading && (
          <p className="text-center text-sm text-[#888]">Loading...</p>
        )}
        {rooms?.length === 0 && (
          <p className="text-center text-sm text-[#888]">No rooms</p>
        )}
        {rooms?.map(({ roomId, id }: { roomId: string; id: string }) => (
          <div
            onClick={handleClick(roomId)}
            key={id}
            className="flex h-8 cursor-pointer cursor-pointer items-center justify-center"
          >
            <div className="m-2 flex h-full w-full items-center justify-center rounded text-center text-sm hover:bg-[#e5e7e0]">
              <p>{roomId}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default RoomList;
