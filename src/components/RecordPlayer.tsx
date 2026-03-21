import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import classNames from "classnames";
// import pauseIcon from "../assets/icons/pause.svg";
import PauseIcon from "../assets/icons/pause.svg?react";

const API_URL = "https://ashish.world/api/spotify/recently-played?limit=5";
const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Song {
  id: number;
  title: string;
  name: string;
  artist: string;
  duration: string;
  durationSecs: number;
  cover: string;
  albumArt: string;
  previewUrl: string | null;
  playedAt: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GROOVE_RADII: number[] = [30, 46, 62, 78, 94, 110, 120];
const EQ_DELAYS: number[] = [0, 0.15, 0.3];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatPlayedAt(dateString: string): string {
  const played = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - played.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);

  if (diffMs < 60_000) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const day = played.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? "st"
    : day === 2 || day === 22 ? "nd"
      : day === 3 || day === 23 ? "rd" : "th";
  const year = String(played.getFullYear()).slice(2);
  return `${day}${suffix} ${months[played.getMonth()]} ${year}`;
}

// ─── Component ────────────────────────────────────────────────────────────────


export default function RecordPlayer() {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [tracks, setTracks] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        setTracks(data.tracks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      if (activeIndex === null) return;
      const next = activeIndex + 1;
      if (next < tracks.length && tracks[next].previewUrl) {
        playTrack(tracks[next]);
      }
    };

    const onPlay = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    const onPause = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeIndex, tracks]);

  const tick = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animFrameRef.current = requestAnimationFrame(tick);
    }
  };

  // ── Audio engine ────────────────────────────────────────────────────────────

  const playTrack = useCallback(
    (track: Song): void => {
      if (!track?.previewUrl) return;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const audio = audioRef.current;
      if (!audio) return;

      setCurrentTime(0);
      audio.currentTime = 0;
      audio.src = track.previewUrl;
      audio.volume = volume;
      audio.play();

      const index = tracks.findIndex((item: Song) => item.id === track.id);
      setActiveIndex(index);
      setIsPlaying(true);
    },
    [volume, tracks]
  );

  const pauseTrack = useCallback((): void => {
    if (audioRef.current) audioRef.current.pause();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  }, []);

  const resumeTrack = useCallback((): void => {
    if (audioRef.current) audioRef.current.play();
  }, []);

  const seekTo = useCallback((_seconds: number): void => {
    if (audioRef.current) audioRef.current.currentTime = _seconds;
  }, []);

  // ── Interaction handlers ────────────────────────────────────────────────────

  const handleSelectSong = (song: Song): void => {
    if (activeSong?.id === song.id) {
      handlePlayPause();
    } else {
      setActiveSong(song);
      setCurrentTime(0);
      setIsPlaying(true);
      playTrack(song);
    }
  };

  const handlePlayPause = (): void => {
    if (!activeSong) return;
    if (isPlaying) {
      setIsPlaying(false);
      pauseTrack();
    } else {
      setIsPlaying(true);
      resumeTrack();
    }
  };

  const handleSeekPointer = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!activeSong || !seekBarRef.current) return;
    if (e.type === "pointerdown") e.currentTarget.setPointerCapture(e.pointerId);
    if (e.type === "pointermove" && e.buttons !== 1) return;

    const rect = seekBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const trackDuration = duration || activeSong.durationSecs || 30;
    const newTime = ratio * trackDuration;
    setCurrentTime(newTime);
    seekTo(newTime);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.src = DEFAULT_COVER;
  };

  // ── Derived values ──────────────────────────────────────────────────────────

  const vinylCover: string | null = activeSong?.albumArt ?? null;
  const tonearmAngle: number = activeSong ? 20 : 3;
  const progressPct: number = activeSong
    ? (currentTime / (duration || activeSong.durationSecs || 30)) * 100
    : 0;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @keyframes record-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .record-spin {
          animation: record-spin 3.5s linear infinite;
        }
      `}</style>

      <div className="flex items-center justify-center">
        <div className="flex gap-[52px] w-full">

          {/* ═══════════════ RECORD PLAYER ═══════════════ */}
          <div className="relative flex-shrink-0">

            {/* Player chassis */}
            <div className="w-[360px] h-[340px] bg-white rounded-[20px] z-[1] relative border-2 border-black overflow-visible">

              {/* Top inner shadow */}
              <div className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-black/[0.025] to-transparent rounded-t-[22px] pointer-events-none" />

              {/* ── VINYL PLATTER ── */}
              <div className="absolute top-[26px] left-[52px] w-[248px] h-[248px]">

                {/* Drop shadow */}
                <div className="absolute inset-1 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.22)]" />

                {/* Spinning disc */}
                <div
                  className="w-[248px] h-[248px] rounded-full bg-[#111] relative overflow-hidden flex items-center justify-center record-spin"
                  style={{
                    animationPlayState: isPlaying && activeSong ? "running" : "paused",
                  }}
                >
                  {/* Album art */}
                  <AnimatePresence mode="wait">
                    {vinylCover && (
                      <motion.img
                        key={vinylCover}
                        src={vinylCover}
                        alt="vinyl art"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                        onError={handleImgError}
                      />
                    )}
                  </AnimatePresence>

                  {/* Edge vignette */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,0.55)_100%)] pointer-events-none z-[2]" />

                  {/* Groove rings */}
                  {GROOVE_RADII.map((r) => (
                    <div
                      key={r}
                      className="absolute rounded-full pointer-events-none z-[3] transition-[border-color] duration-400"
                      style={{
                        width: `${r * 2}px`,
                        height: `${r * 2}px`,
                        border: `1px solid ${vinylCover ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.08)"}`,
                      }}
                    />
                  ))}

                  {/* Specular sheen */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_32%_26%,rgba(255,255,255,0.18)_0%,transparent_50%)] pointer-events-none z-[4]" />

                  {/* Center label */}
                  <div className="absolute w-[62px] h-[62px] rounded-full bg-gradient-to-br from-[#f0ece4] to-[#ddd8cc] flex items-center justify-center z-10 shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#aaa] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]" />
                  </div>
                </div>
              </div>

              {/* ── TONEARM ── */}
              <div className="absolute top-[16px] right-[22px] z-20">
                {/* Pivot dot */}
                <div className="absolute -top-1 right-[3px] w-5 h-5 rounded-full z-[21] border-2 border-black bg-white" />

                {/* Arm */}
                <motion.div
                  animate={{ rotate: tonearmAngle }}
                  transition={{ duration: 0.9, ease: [0.34, 1.05, 0.64, 1] }}
                  className="w-[7px] h-[136px] rounded-[4px] mr-[7px] relative bg-blue border-2 border-black"
                  style={{ transformOrigin: "top right" }}
                >
                  {/* Cartridge body */}
                  <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 -rotate-[18deg] w-[22px] h-[22px] rounded-[20px] bg-white border-2 border-black" />
                  {/* Stylus */}
                  <div className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-[6px] h-[9px] bg-blue rounded-b-sm border-2 border-black" />
                </motion.div>
              </div>

              {/* ── BOTTOM CONTROLS ── */}
              <div className="absolute bottom-[18px] left-5 right-5 flex items-center gap-3">

                {/* Play / Pause button */}
                <motion.button
                  onClick={handlePlayPause}
                  disabled={!activeSong}
                  className="w-[38px] h-[38px] rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 outline-none p-0 bg-transparent"
                  style={{ cursor: activeSong ? "pointer" : "default" }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isPlaying ? (
                      <motion.svg
                        key="pause"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.15 }}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <rect x="2" y="2" width="3.5" height="10" rx="1" fill="#000" />
                        <rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="#000" />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="play"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.15 }}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="ml-0.5"
                      >
                        <path d="M3 2L12 7L3 12V2Z" fill="#000" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Seek bar */}
                <div className="flex-1 flex flex-col gap-[5px]">
                  <div
                    ref={seekBarRef}
                    onPointerDown={handleSeekPointer}
                    onPointerMove={handleSeekPointer}
                    className="h-[10px] bg-[#e8e8e8] rounded-[11px] relative border-2 border-black"
                    style={{ cursor: activeSong ? "pointer" : "default" }}
                  >
                    {/* Filled progress */}
                    <motion.div
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.1, ease: "linear" }}
                      className="absolute -left-0.5 -top-0.5 h-[10px] rounded-[11px] border-2 border-black"
                      style={{
                        background: activeSong ? "#2592c1" : "#d8d8d8",
                      }}
                    />
                    {/* Thumb */}
                    <motion.div
                      animate={{ left: `${progressPct}%` }}
                      transition={{ duration: 0.1, ease: "linear" }}
                      className="absolute top-[60%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-black pointer-events-none"
                      whileHover={{ scale: 1.3 }}
                    />
                  </div>
                </div>

                {/* Decorative knob */}
                <div className="w-[38px] h-[38px] rounded-full border-2 border-black flex-shrink-0 relative flex items-center justify-center">
                  <div className="w-0.5 h-4 rotate-45 bg-black rounded-sm" />
                </div>
              </div>
            </div>

            {/* Shadow block behind chassis */}
            <div className="absolute top-0 w-[360px] h-[350px] bg-black rounded-[32px] border-2 border-black overflow-visible" />

            {/* Now playing label */}
            <div className="mt-[18px] text-center min-h-[50px]">
              <AnimatePresence mode="wait">
                {activeSong ? (
                  <motion.div
                    key={activeSong.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                  >
                    <motion.div
                      key={isPlaying ? "playing" : "paused"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="text-[14px]  uppercase text-blue   flex items-center  justify-center gap-1">
                      {isPlaying ? (
                        "Now Playing"
                      ) : (
                        "Paused"
                      )}
                    </motion.div>
                    <div className="text-[#1a1a1a] text-sm font-bold">{activeSong.title}</div>
                    <div className="text-[#aaa] text-xs mt-0.5">{activeSong.artist}</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[#ccc] text-xs mt-1.5"
                  >
                    Select a track to play
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ═══════════════ PLAYLIST ═══════════════ */}
          <div className="flex-1">
            <div className="flex flex-col gap-[3px]">
              {tracks.map((song, i) => {
                const isActive: boolean = activeSong?.id === song.id;
                return (
                  /** Main div */
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                     
                      borderColor: isActive ? "#000000" : "rgba(0,0,0,0)",
                    }}
                    transition={{
                      delay: i * 0.07,
                      duration: 0.35,
                      backgroundColor: { duration: 0.25, delay: 0 },
                      borderColor: { duration: 0.25, delay: 0 },
                    }}
                    onClick={() => handleSelectSong(song)}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3 px-3 py-[10px] pl-4 rounded-xl cursor-pointer relative border-2 border-solid"
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-sm bg-blue"
                      />
                    )}

                    {/* Track number / EQ bars */}
                    <div className="w-[18px] text-center flex-shrink-0">
                      {isActive && isPlaying ? (
                        <div className="flex gap-0.5 items-end h-[14px] justify-center">
                          {EQ_DELAYS.map((delay) => (
                            <motion.div
                              key={delay}
                              animate={{ scaleY: [0.3, 1, 0.3] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.75,
                                delay,
                                ease: "easeInOut",
                              }}
                              className="w-[3px] h-3 bg-blue rounded-sm origin-bottom"
                            />
                          ))}
                        </div>
                      ) : (
                        <span
                          className={classNames(
                            "text-[11px] font-medium transition-colors duration-[250ms]",
                            isActive ? "text-blue" : "text-gray-400"
                          )}
                        >
                          {i + 1}
                        </span>
                      )}
                    </div>

                    {/* Album thumbnail */}
                    <div
                      className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 transition-shadow duration-300"
                      style={{
                        boxShadow: isActive
                          ? "0 4px 14px rgba(224,92,32,0.2)"
                          : "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        src={song.albumArt}
                        alt={song.name}
                        className="w-full h-full object-cover block"
                        onError={handleImgError}
                      />
                    </div>

                    {/* Title + artist */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[13px] whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-[250ms]"
                        style={{
                          color: isActive ? "#1a1a1a" : "#666",
                          fontWeight: isActive ? 700 : 400,
                        }}
                      >
                        {song.name}
                      </div>
                      <div className="text-[#bbb] text-[11px] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                        {song.artist}
                      </div>
                    </div>

                    {/* Played at */}
                    <div className="text-[#ccc] text-[11px] flex-shrink-0 tabular-nums">
                      {song.playedAt ? formatPlayedAt(song.playedAt) : song.duration}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} />
    </>
  );
}