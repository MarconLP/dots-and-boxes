import { type NextPage } from "next";
import { Fragment, useState } from "react";

const Game: NextPage = () => {
  const [clicked, setClicked] = useState<number[]>([]);

  const handleClick = (id: number) => {
    setClicked((x) => [...x, id]);
  };

  const isOwned = (row: number, col: number) => {
    const id = parseInt(`${row}${col}`);

    const neededIds = [
      id,
      id + 1,
      parseInt(`${row - 1}${col}`),
      parseInt(`${row + 1}${col}`),
    ];

    return neededIds.every((elem) => clicked.includes(elem));
  };

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center gap-4">
      <div>
        <p className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Your Turn
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => {
          const isBigRow = !(row % 2);
          return (
            <div
              key={row}
              className={`flex flex-row ${isBigRow ? "" : "gap-6"}`}
            >
              {[1, 2, 3, 4, 5, 6]
                .filter((x) => isBigRow || x !== 6)
                .map((col) => {
                  const id = parseInt(`${row}${col}`);
                  return (
                    <Fragment key={id}>
                      <div
                        onClick={() => handleClick(id)}
                        data-id={id}
                        className={`cursor-pointer rounded bg-gray-900 ${
                          isBigRow ? "h-[100px] w-6" : "h-6 w-[100px]"
                        }`}
                      ></div>
                      {isBigRow && col !== 6 && (
                        <div
                          data-id={id}
                          className={`w-[100px] ${
                            isOwned(row, col) ? "bg-blue-500" : ""
                          }`}
                        ></div>
                      )}
                    </Fragment>
                  );
                })}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Game;
