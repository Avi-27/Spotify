import { useRecoilState } from "recoil";
import { CurrentTrackIdState, isPlayingState } from "../atom/songAtom";
import useSpotify from "../hooks/useSpotify";
import { convertToMinutes } from "../lib/time";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(CurrentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div className="grid grid-cols-2 text-gray-500 hover:bg-gray-900 rounded-lg px-5 py-4">
      <div className="flex items-center space-x-4 cursor-pointer" onClick={playSong}>
        <p>{order + 1}</p>
        <img
          src={track.track.album.images[0].url}
          className="h-10 w-10
        "
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className=" w-40 hidden md:inline text-sm">{track.track.album.name}</p>
        <p className="text-sm ">{convertToMinutes(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
