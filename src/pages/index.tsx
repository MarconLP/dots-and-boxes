import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import LandingScreen from "@components/LandingScreen";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Dots & Boxes</title>
        <meta name="description" content="Dots and Boxes classic pencil and paper online game to play in your browser.-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingScreen />
    </>
  );
};

export default Home;