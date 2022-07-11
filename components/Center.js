import { ChevronDownIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistState, playlistIdState } from "../atom/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import spotifyApi from "../lib/spotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-orange-500",
  "from-red-500",
  "from-purple-500",
  "from-pink-500",
  "from-yellow-500",
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (playlistId) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((res) => {
          setPlaylist(res.body);
        })
        .catch((err) => {
          console.log("error while loading a playlist", err);
        });
    }
  }, [spotifyApi, playlistId]);
  console.log("playlist", playlist);

  return (
    <div className=" flex-grow text-gray-500 overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-10">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={signOut}
        >
          <img src={session?.user?.image} alt="" className="rounded-full h-10 w-10" />
          <h2 className="text-gray-500 hover:text-gray-100">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          className="h-44 w-44 shadow-2xl md:h-30 w-30"
          alt="playlist_image"
        />
        <div>
          <p className="font-semibold">PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl lg:text-5xl">{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
