import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const API_URL = "https://ashish.world/api/spotify/recently-played?limit=5";
const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string; // display string e.g. "3:42"
  durationSecs: number; // total seconds for seek calculations
  cover: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const playlist: Song[] = [
  {
    id: 1,
    title: "The Final Countdown",
    artist: "Europe",
    duration: "5:09",
    durationSecs: 309,
    cover: "https://upload.wikimedia.org/wikipedia/en/1/1a/Europefinalcountdown.jpg",
  },
  {
    id: 2,
    title: "car keys",
    artist: "Tsumyoki, Venserto, lil help",
    duration: "2:47",
    durationSecs: 167,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Running Up That Hill",
    artist: "Kate Bush",
    duration: "5:02",
    durationSecs: 302,
    cover: "https://upload.wikimedia.org/wikipedia/en/0/05/KateBush-RunningUpThatHill.jpg",
  },
  {
    id: 4,
    title: "Mr. Brightside",
    artist: "The Killers",
    duration: "3:42",
    durationSecs: 222,
    cover: "https://upload.wikimedia.org/wikipedia/en/7/7e/Killers_Mr_Brightside.jpg",
  },
  {
    id: 5,
    title: "Take On Me",
    artist: "a-ha",
    duration: "3:46",
    durationSecs: 226,
    cover: "https://upload.wikimedia.org/wikipedia/en/1/1f/A-ha_-_Take_On_Me_%28Single%29.jpg",
  },
];

const GROOVE_RADII: number[] = [30, 46, 62, 78, 94, 110, 120];
const EQ_DELAYS: number[] = [0, 0.15, 0.3];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RecordPlayer() {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);

  const [activeIndex, setActiveIndex] = useState(null);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        setTracks(data.tracks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  const animFrameRef = useRef<number | null>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setIsPlaying(false);
      // Auto-play next
      const next = activeIndex + 1;
      if (next < tracks.length && tracks[next].previewUrl) {
        playTrack(next);
      }
    };

    const onPlay = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(tick);
    }
    const onPause = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }

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

  const seekBarRef = useRef<HTMLDivElement>(null);

  // ── Stub: replace with your audio engine calls ──────────────────────────────

  const playTrack = useCallback((track: Song): void => {
    // TODO: load & play audio for _song
    console.log(" Track ", track)
    if (!track?.previewUrl) return;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(0);
    audio.currentTime = 0; // force native reset
    audio.src = track.previewUrl;
    audio.volume = volume;
    audio.play();

    const index = tracks.find((item: Song) => item.id === track.id)
    setActiveIndex(index);
    setIsPlaying(true);

  }, [volume, tracks]);

  const pauseTrack = useCallback((): void => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
  }, []);

  const resumeTrack = useCallback((): void => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const seekTo = useCallback((_seconds: number): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = _seconds;
    }
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
    if (e.type === "pointerdown") {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
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
      `}</style>
      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          // background: "#f7f7f5",
          // minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // padding: "40px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "52px",
            // alignItems: "center",
            // maxWidth: "860px",
            width: "100%",
          }}
        >
          {/* ═══════════════════════════════════════════════════════════════
            RECORD PLAYER
        ═══════════════════════════════════════════════════════════════ */}
          <div style={{ position: "relative", flexShrink: 0 }}>

            {/* Player chassis */}
            <div
              style={{
                width: "360px",
                height: "340px",
                background: "#ffffff",
                borderRadius: "20px",
                zIndex: 1,
                position: "relative",
                // boxShadow:"0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.06)",
                border: "2px solid rgba(0,0,0)",
                overflow: "visible",
              }}
            >
              {/* Top inner shadow */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "50px",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.025), transparent)",
                  borderRadius: "22px 22px 0 0",
                  pointerEvents: "none",
                }}
              />

              {/* ── VINYL PLATTER ── */}
              <div
                style={{
                  position: "absolute",
                  top: "26px",
                  left: "52px",
                  width: "248px",
                  height: "248px",
                }}
              >
                {/* Drop shadow */}
                <div
                  style={{
                    position: "absolute",
                    inset: "4px",
                    borderRadius: "50%",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
                  }}
                />

                {/* Spinning disc */}
                <div
                  style={{
                    width: "248px",
                    height: "248px",
                    borderRadius: "50%",
                    background: "#111",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "record-spin 3.5s linear infinite",
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
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        onError={handleImgError}
                      />
                    )}
                  </AnimatePresence>

                  {/* Edge vignette */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, transparent 55%, rgba(0,0,0,0.55) 100%)",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />

                  {/* Groove rings */}
                  {GROOVE_RADII.map((r) => (
                    <div
                      key={r}
                      style={{
                        position: "absolute",
                        width: `${r * 2}px`,
                        height: `${r * 2}px`,
                        borderRadius: "50%",
                        border: `1px solid ${vinylCover ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.08)"}`,
                        pointerEvents: "none",
                        zIndex: 3,
                        transition: "border-color 0.4s ease",
                      }}
                    />
                  ))}

                  {/* Specular sheen */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "radial-gradient(ellipse at 32% 26%, rgba(255,255,255,0.18) 0%, transparent 50%)",
                      pointerEvents: "none",
                      zIndex: 4,
                    }}
                  />

                  {/* Center label */}
                  <div
                    style={{
                      position: "absolute",
                      width: "62px",
                      height: "62px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #f0ece4, #ddd8cc)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#aaa",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ── TONEARM ── */}
              <motion.div


                style={{
                  position: "absolute",
                  top: "16px",
                  right: "22px",

                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-4px", right: "3px",
                    width: "20px", height: "20px",
                    borderRadius: "50%",
                    // background: "linear-gradient(145deg, #e8e8e8, #c0c0c0)",
                    // boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    zIndex: 21,
                    border: "2px solid #000",
                    background: "#fff"
                  }}
                />
                <motion.div
                  animate={{ rotate: tonearmAngle }}
                  transition={{ duration: 0.9, ease: [0.34, 1.05, 0.64, 1] }}
                  style={{
                    transformOrigin: "top right",
                    width: "7px",
                    height: "136px",
                    // background: "linear-gradient(to right, #e0e0e0, #c0c0c0, #d8d8d8)",
                    borderRadius: "4px",
                    marginRight: "7px",
                    // boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    position: "relative",
                    background: "#2592c1",

                    border: "2px solid #000"
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-10px", left: "50%",
                      transform: "translateX(-50%) rotate(-18deg)",
                      width: "22px", height: "22px",
                      // background: "linear-gradient(145deg, #d8d8d8, #b8b8b8)",
                      borderRadius: "20px",
                      background: "#fff",
                      border: "2px solid #000"
                      // boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-17px", left: "50%",
                      transform: "translateX(-50%)",
                      width: "6px", height: "9px",
                      background: "#2592c1",
                      borderRadius: "0 0 2px 2px",
                      border: "2px solid #000"
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* ── BOTTOM CONTROLS ── */}
              <div
                style={{
                  position: "absolute",
                  bottom: "18px",
                  left: "20px",
                  right: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* Play / Pause button */}
                <motion.button
                  onClick={handlePlayPause}
                  // whileTap={{ scale: 0.92 }}
                  // whileHover={{ scale: 1.06 }}
                  disabled={!activeSong}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",

                    border: "2px solid #000",
                    cursor: activeSong ? "pointer" : "default",
                    // background: activeSong ? "linear-gradient(145deg, #e05c20, #c04010)": "linear-gradient(145deg, #e8e8e8, #d0d0d0)",
                    // boxShadow: activeSong? "3px 3px 8px rgba(224,92,32,0.35), -1px -1px 4px rgba(255,255,255,0.5)": "3px 3px 8px rgba(0,0,0,0.1), -1px -1px 4px rgba(255,255,255,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.3s ease, box-shadow 0.3s ease",
                    outline: "none",
                    padding: 0,
                  }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {/* <AnimatePresence mode="wait" initial={false}> */}
                  {isPlaying ? (
                    /* Pause icon */
                    <motion.svg
                      key="pause"
                      // initial={{ opacity: 0, scale: 0.6 }}
                      // animate={{ opacity: 1, scale: 1 }}
                      // exit={{ opacity: 0, scale: 0.6 }}
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
                    /* Play icon */
                    <motion.svg
                      key="play"
                      // initial={{ opacity: 0, scale: 0.6 }}
                      // animate={{ opacity: 1, scale: 1 }}
                      // exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"

                      style={{ marginLeft: "2px" }}
                    >
                      <path d="M3 2L12 7L3 12V2Z" fill="#000" />
                    </motion.svg>
                  )}
                  {/* </AnimatePresence> */}
                </motion.button>

                {/* Seek bar + time */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
                  {/* Track */}
                  <div
                    ref={seekBarRef}
                    onPointerDown={handleSeekPointer}
                    onPointerMove={handleSeekPointer}
                    style={{
                      height: "10px",
                      background: "#e8e8e8",
                      
                      left: 0,
                        top: "1px",
                      borderRadius: "11px",
                      // boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
                      position: "relative",
                      cursor: activeSong ? "pointer" : "default",
                      border: "2px solid #000"
                    }}
                  >
                    {/* Filled progress */}
                    <motion.div
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.1, ease: "linear" }}
                      style={{
                        position: "absolute",
                        left: "-2px",
                        top: "-2px",
                        height: "10px",
                        background: activeSong
                          ? "#2592c1"
                          : "#d8d8d8",
                        borderRadius: "11px",
                        //  background: "#2592c1",
                        // borderRadius: "0 0 2px 2px",
                        border: "2px solid #000"
                      }}
                    />
                    {/* Thumb */}
                    <motion.div
                      animate={{ left: `${progressPct}%` }}
                      transition={{ duration: 0.1, ease: "linear" }}
                      style={{
                        position: "absolute",
                        top: "60%",
                        transform: "translate(-50%, -50%)",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "#fff",
                        border: "2px solid #000",
                        // background: activeSong
                        //   ? "linear-gradient(145deg, #f4f4f4, #e0e0e0)"
                        //   : "linear-gradient(145deg, #f0f0f0, #d8d8d8)",
                        // boxShadow: activeSong
                        //   ? "0 1px 4px rgba(224,92,32,0.3), 0 1px 2px rgba(0,0,0,0.15)"
                        //   : "0 1px 3px rgba(0,0,0,0.12)",
                        pointerEvents: "none",
                      }}
                      whileHover={{ scale: 1.3 }}
                    />
                  </div>

                  {/* Time labels */}
                  {/* <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "9px",
                      color: activeSong ? "#aaa" : "#ccc",
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "0.02em",
                      transition: "color 0.3s ease",
                    }}
                  >
                    <span>{formatTime(currentTime)}</span>
                    <span>{activeSong ? activeSong.duration : "0:00"}</span>
                  </div> */}
                </div>

                {/* Decorative knob (right) */}
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "2px solid #000",
                    // background: "linear-gradient(145deg, #f2f2f2, #d0d0d0)",
                    // boxShadow: "3px 3px 8px rgba(0,0,0,0.1), -1px -1px 4px rgba(255,255,255,0.9)",
                    flexShrink: 0,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Knob indicator line */}
                  <div
                    style={{
                      width: "2px",
                      height: "16px",
                      transform: "rotate(45deg)",
                      background: "#000",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{
              position: "absolute",
              width: "360px",
              height: "350px",
              background: "#000",
              borderRadius: "32px",
              // boxShadow:"0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.06)",
              border: "2px solid rgba(0,0,0)",
              overflow: "visible",
              top: "0"
            }}>

            </div>

            {/* Now playing label */}
            <div style={{ marginTop: "18px", textAlign: "center", minHeight: "50px" }}>
              <AnimatePresence mode="wait">
                {activeSong ? (
                  <motion.div
                    key={activeSong.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#e05c20",
                        marginBottom: "5px",
                        fontWeight: 600,
                      }}
                    >
                      {isPlaying ? "▶ Now Playing" : "⏸ Paused"}
                    </div>
                    <div style={{ color: "#1a1a1a", fontSize: "14px", fontWeight: 700 }}>
                      {activeSong.title}
                    </div>
                    <div style={{ color: "#aaa", fontSize: "12px", marginTop: "2px" }}>
                      {activeSong.artist}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ color: "#ccc", fontSize: "12px", marginTop: "6px" }}
                  >
                    Select a track to play
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
            PLAYLIST
        ═══════════════════════════════════════════════════════════════ */}
          <div style={{ flex: 1 }}>


            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {tracks.map((song, i) => {
                const isActive: boolean = activeSong?.id === song.id;
                return (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    onClick={() => handleSelectSong(song)}
                    whileHover={{ x: 3 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 12px 10px 16px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      background: isActive ? "#fff" : "transparent",
                      boxShadow: isActive
                        ? "0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)"
                        : "none",
                      transition: "background 0.25s ease, box-shadow 0.25s ease",
                      position: "relative",
                    }}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "20%",
                          bottom: "20%",
                          width: "3px",
                          borderRadius: "2px",
                          background: "#e05c20",
                        }}
                      />
                    )}

                    {/* Track number / EQ bars */}
                    <div style={{ width: "18px", textAlign: "center", flexShrink: 0 }}>
                      {isActive && isPlaying ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "2px",
                            alignItems: "flex-end",
                            height: "14px",
                            justifyContent: "center",
                          }}
                        >
                          {EQ_DELAYS.map((delay) => (
                            <motion.div
                              key={delay}
                              animate={{ scaleY: [0.3, 1, 0.3] }}
                              transition={{ repeat: Infinity, duration: 0.75, delay, ease: "easeInOut" }}
                              style={{
                                width: "3px",
                                height: "12px",
                                background: "#e05c20",
                                borderRadius: "2px",
                                transformOrigin: "bottom",
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span
                          style={{
                            color: isActive ? "#e05c20" : "#ddd",
                            fontSize: "11px",
                            fontWeight: 500,
                          }}
                        >
                          {i + 1}
                        </span>
                      )}
                    </div>

                    {/* Album thumbnail */}
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        flexShrink: 0,
                        boxShadow: isActive
                          ? "0 4px 14px rgba(224,92,32,0.2)"
                          : "0 2px 8px rgba(0,0,0,0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                    >
                      <img
                        src={song.albumArt}
                        alt={song.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        onError={handleImgError}
                      />
                    </div>

                    {/* Title + artist */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          color: isActive ? "#1a1a1a" : "#666",
                          fontSize: "13px",
                          fontWeight: isActive ? 700 : 400,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          transition: "color 0.25s",
                        }}
                      >
                        {song.name}
                      </div>
                      <div
                        style={{
                          color: "#bbb",
                          fontSize: "11px",
                          marginTop: "2px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {song.artist}
                      </div>
                    </div>

                    {/* Duration */}
                    <div
                      style={{
                        color: "#ccc",
                        fontSize: "11px",
                        flexShrink: 0,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {song.playedAt}
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
