import { type NextPage } from "next";
import { api } from "../utils/api";

const RoomList: NextPage = () => {
  const { data: rooms, isLoading } = api.room.getAll.useQuery();

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
      <div className="mt-4 w-[200px] border border-[#E2E8F0] p-2">
        {isLoading && (
          <p className="text-center text-sm text-[#888]">Loading...</p>
        )}
        {rooms?.length === 0 && (
          <p className="text-center text-sm text-[#888]">No rooms</p>
        )}
        {rooms?.map((room) => (
          <div
            key={room.id}
            className="flex h-8 cursor-pointer items-center justify-center"
          >
            <div className="m-2 flex h-full w-full items-center justify-center rounded text-center text-sm hover:bg-[#e5e7e0]">
              <p>{room.id}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default RoomList;
