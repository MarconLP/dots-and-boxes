import { type NextPage } from "next";
import Head from "next/head";

import LandingScreen from "@components/LandingScreen";
import RoomList from "@components/RoomList";
import { useState } from "react";
import Room from "@components/Room";
import Game from "@components/Game";
import EndScreen from "@components/EndScreen";
import { PusherProvider } from "../utils/pusher";

const Home: NextPage = () => {
  const [page, setPage] = useState<string>("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

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
      {page === "room-list" && <RoomList />}
      {roomId && ["game", "room"].includes(page) && (
        <PusherProvider slug={roomId}>
          {page === "room" && (
            <Room roomId={roomId} username={username} setPage={setPage} />
          )}
          {page === "game" && <Game setPage={setPage} />}
        </PusherProvider>
      )}
      {page === "end" && <EndScreen setPage={setPage} />}
    </>
  );
};

export default Home;
