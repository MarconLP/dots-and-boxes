import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import LandingScreen from "@components/LandingScreen";
import RoomList from "@components/RoomList";
import { useState } from "react";
import Room from "@components/Room";
import Game from "@components/Game";
import EndScreen from "@components/EndScreen";
import { PusherProvider, useSubscribeToEvent } from "../utils/pusher";

const Home: NextPage = () => {
  const [page, setPage] = useState("");

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

      <PusherProvider slug={`my-channel`}>
        {page === "" && <LandingScreen setPage={setPage} />}
        {page === "room-list" && <RoomList />}
        {page === "room" && <Room setPage={setPage} />}
        {page === "game" && <Game setPage={setPage} />}
        {page === "end" && <EndScreen setPage={setPage} />}
      </PusherProvider>
    </>
  );
};

export default Home;
