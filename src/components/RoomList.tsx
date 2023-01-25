import { type NextPage } from "next";

const RoomList: NextPage = () => {
    const rooms = ['room1', 'room2', 'room3', 'room4']

    return (
        <main className="flex justify-center items-center h-[100vh] flex-col">
            <div><p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Dots & Boxes</p></div>
            <div className="pt-1"><p className="text-sm tracking-tight text-gray-500">Click to join a room</p></div>
            <div className="border-[#E2E8F0] border w-[200px] mt-4 p-2">
                {rooms.length <= 0 && <p className="text-sm text-center text-[#888]">No rooms</p>}
                {rooms.map(room => (
                    <div key={room} className="h-8 flex justify-center items-center cursor-pointer">
                        <div className="w-full text-sm h-full text-center hover:bg-[#e5e7e0] rounded m-2 flex justify-center items-center"><p>{room}</p></div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default RoomList