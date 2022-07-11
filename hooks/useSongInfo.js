import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentTrackIdState } from "../atom/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackid] = useRecoilState(CurrentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackinfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }).then((res) => res.json());

        setSongInfo(trackinfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  //   console.log("songInfo", songInfo);

  return songInfo;
}

export default useSongInfo;
