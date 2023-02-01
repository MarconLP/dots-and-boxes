import { type NextPage } from "next";
import Head from "next/head";

import LandingScreen from "@components/LandingScreen";
import RoomList from "@components/RoomList";
import { useState } from "react";
import Room from "@components/Room";
import Game from "@components/Game";
import EndScreen from "@components/EndScreen";
import { PusherProvider } from "../utils/pusher";
import PostHog from "@components/PostHog";
import ConnectState from "@components/ConnectState";

const Home: NextPage = () => {
  const [page, setPage] = useState<string>("");
  const [team, setTeam] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [winner, setWinner] = useState<string>("");

  return (
    <>
      <Head>
        <title>Dots & Boxes</title>
        <meta
          name="description"
          content="Dots and Boxes classic pencil and paper online game to play in your browser.-app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {page === "" && (
        <LandingScreen
          username={username}
          setUsername={setUsername}
          setPage={setPage}
          setRoomId={setRoomId}
        />
      )}
      {page === "room-list" && (
        <RoomList
          username={username}
          setUsername={setUsername}
          setPage={setPage}
          setRoomId={setRoomId}
        />
      )}
      {roomId && ["game", "room"].includes(page) && (
        <PusherProvider slug={roomId}>
          <ConnectState />
          {page === "room" && (
            <Room
              username={username}
              roomId={roomId}
              setTeam={setTeam}
              setPage={setPage}
            />
          )}
          {page === "game" && team && (
            <Game
              roomId={roomId}
              team={team}
              setWinner={setWinner}
              setPage={setPage}
            />
          )}
        </PusherProvider>
      )}
      {page === "end" && <EndScreen winner={winner} setPage={setPage} />}

      <PostHog />
    </>
  );
};

export default Home;
