import { type NextPage } from "next";

const LandingScreen: NextPage = () => {
    return (
        <main className="flex justify-center items-center h-[100vh] flex-col">
            <div><p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Dots & Boxes</p></div>
            <div>
                <div>
                    <div className="mt-1">
                        <input type="text" id="name" name="name" autoComplete="given-name" placeholder="Choose a name"
                               className="h-8 px-2 mt-8 mb-4 block w-full border-[#E2E8F0] border rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm" />
                    </div>
                </div>
                <div>
                    <button className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Find a Game</button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create a Room</button>
                </div>
            </div>
        </main>
    );
};

export default LandingScreen;