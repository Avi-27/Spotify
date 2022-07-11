import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentTrackIdState, isPlayingState } from "../atom/songAtom";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  FastForwardIcon,
  VolumeUpIcon,
  VolumeOffIcon,
  SwitchHorizontalIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/solid";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackid] = useRecoilState(CurrentTrackIdState);

  const songInfo = useSongInfo();

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(({ body }) => {
        setCurrentTrackid(body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
          setIsPlaying(body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
      if (body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //
      fetchCurrentSong();
      setVolume(50);
    }
  }, [session, spotifyApi, currentTrackId]);

  useEffect(() => {
    if (volume > 0 && volume <= 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  return (
    <div className="text-white h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className=" hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchVerticalIcon className="btn" />
        <RewindIcon className="btn" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="btn h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="btn h-10 w-10" />
        )}
        <FastForwardIcon className="btn" />
        <SwitchHorizontalIcon className="btn" />
      </div>
      <div className="flex items-center justify-end space-x-3 md:space-x-4">
        <VolumeOffIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="btn" />
        <input
          type="range"
          name=""
          id=""
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
          className="w-14 md:w-28"
        />
        <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="btn" />
      </div>
    </div>
  );
}

export default Player;
