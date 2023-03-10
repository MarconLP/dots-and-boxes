import { type NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { useSubscribeToEvent } from "../utils/pusher";
import { api } from "../utils/api";

interface Props {
  setPage: (page: string) => void;
  setWinner: (winner: string) => void;
  team: string;
  roomId: string;
}

const Game: NextPage<Props> = ({ roomId, setPage, setWinner, team }) => {
  const gameEvent = api.room.gameEvent.useMutation();
  const [turn, setTurn] = useState("TeamA");
  const [teamALines, setTeamALines] = useState<number[]>([]);
  const [teamABoxes, setTeamABoxes] = useState<number[]>([]);
  const [teamBLines, setTeamBLines] = useState<number[]>([]);
  const [teamBBoxes, setTeamBBoxes] = useState<number[]>([]);

  useSubscribeToEvent("game-event", (data: { line: number; team: string }) => {
    if (data.team === team) return;
    handleTurn(data.line, data.team);
  });

  const toggleTurn = () => {
    if (turn === "TeamA") setTurn("TeamB");
    else if (turn === "TeamB") setTurn("TeamA");
  };

  const handleTurn = (id: number, team: string) => {
    if (team === "TeamA") {
      setTeamALines((x) => [...x, id]);
    } else if (team === "TeamB") {
      setTeamBLines((x) => [...x, id]);
    }
  };

  const handleClick = (id: number) => {
    if (turn !== team) return;
    if ([...teamALines, ...teamBLines].includes(id)) return;
    gameEvent.mutate({
      team,
      channel: roomId,
      line: id,
    });
    handleTurn(id, team);
  };

  useEffect(() => {
    checkBoxClaim();
  }, [teamALines, teamBLines]);

  useEffect(() => {
    if ([...teamABoxes, ...teamBBoxes].length >= 20) {
      setWinner(
        teamABoxes.length > teamBBoxes.length ? "Team Green" : "Team Red"
      );
      setPage("end");
    }
  }, [teamABoxes, teamBBoxes]);

  const checkBoxClaim = () => {
    const boxes: number[] = [];

    [2, 4, 6, 8].map((row) =>
      [1, 2, 3, 4, 5].map((col) =>
        boxes.push(parseInt(row.toString() + col.toString()))
      )
    );

    const boxesResult = boxes
      .filter((id) => ![...teamABoxes, ...teamBBoxes].includes(id))
      .map((id) => {
        const neededIds = [
          id,
          id + 1,
          parseInt(
            `${parseInt(id.toString().charAt(0)) - 1}${parseInt(
              id.toString().charAt(1)
            )}`
          ),
          parseInt(
            `${parseInt(id.toString().charAt(0)) + 1}${parseInt(
              id.toString().charAt(1)
            )}`
          ),
        ];

        const fullBox = neededIds.every((elem) =>
          [...teamALines, ...teamBLines].includes(elem)
        );

        if (fullBox && turn === "TeamA") {
          setTeamABoxes((x) => [...x, id]);
          return true;
        } else if (fullBox && turn === "TeamB") {
          setTeamBBoxes((x) => [...x, id]);
          return true;
        }
      });

    if (!boxesResult.some((x) => x)) {
      toggleTurn();
    }
  };

  const getBoxOwnerColor = (id: number) => {
    const teamA = teamABoxes.includes(id);
    const teamB = teamBBoxes.includes(id);

    if (teamA) return "#44be2acc";
    else if (teamB) return "#c64136cc";
    else return "#ffffff";
  };

  const getLineOwnerColor = (id: number) => {
    const teamA = teamALines.includes(id);
    const teamB = teamBLines.includes(id);

    if (teamA) return "#44be2acc";
    else if (teamB) return "#c64136cc";
  };

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center gap-4">
      <div>
        <p className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {turn === team ? "Your Turn" : "Opponents Turn"}
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
                        style={{
                          backgroundColor: getLineOwnerColor(id),
                        }}
                        onClick={() => handleClick(id)}
                        data-id={id}
                        className={`cursor-pointer rounded border border-[#e9ebf0] ${
                          isBigRow ? "h-[100px] w-6" : "h-6 w-[100px]"
                        }`}
                      ></div>
                      {isBigRow && col !== 6 && (
                        <div
                          data-id={id}
                          className="flex w-[100px] items-center justify-center"
                        >
                          <div
                            className="h-[75px] w-[75px] rounded opacity-80"
                            style={{
                              backgroundColor: getBoxOwnerColor(id),
                            }}
                          ></div>
                        </div>
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
