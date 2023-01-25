import { type NextPage } from "next";

interface Props {
    setPage: (page: string) => void
}

const Room: NextPage<Props> = ({ setPage }) => {
    const players = ['player 1', 'player 2']

    return (
        <main className="flex justify-center items-center h-[100vh] flex-col">
            <div><p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Dots & Boxes</p></div>
            <div className="pt-1"><p className="text-sm tracking-tight text-gray-500">Click on players to kick them</p></div>
            <div className="border-[#E2E8F0] border w-[200px] mt-4 p-2">
                {players.map(room => (
                    <div key={room} className="h-8 flex justify-center items-center cursor-pointer">
                        <div className="w-full text-sm h-full text-center hover:bg-[#e5e7e0] rounded m-2 flex justify-center items-center"><p>{room}</p></div>
                    </div>
                ))}
            </div>
            <button onClick={() => setPage('game')} disabled={players.length !== 2} className="mt-4 mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Start game</button>
        </main>
    );
};

export default Room