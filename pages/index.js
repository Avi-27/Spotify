import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Spotify 2.0</title>
        <meta name="SpotifyClone" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black h-screen overflow-hidden flex">
        {/* sidebar */}

        <Sidebar />
        <Center />

        {/* main content */}
      </main>
      <div className="sticky bottom-0 ">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}