// PixelRainCloud.tsx
// Dependencies: motion (motion.dev)  →  npm install motion
// Tailwind CSS must be configured in your project
// Usage: <PixelRainCloud />  or  <PixelRainCloud scale={2} />

import { motion } from "motion/react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RaindropDef {
  x: number;       // horizontal offset in px from cloud center
  delay: number;   // animation start delay (s)
  duration: number;// fall duration (s)
  height: number;  // pixel height of the drop
}

interface PixelRainCloudProps {
  /** Multiplier for the whole component. Default: 2 (comfortable screen size) */
  scale?: number;
  className?: string;
}

// ─── Pixel grid ──────────────────────────────────────────────────────────────
// Each cell: 0 = transparent, 1 = cloud, 2 = face-bg, 3 = eye, 4 = mouth
// Grid is 16 cols × 13 rows. Each "pixel" renders as (1 * scale) px square.

const GRID: number[][] = [
  [0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1],  // face background row
  [1,1,1,2,2,3,3,2,2,3,3,2,2,1,1,1],  // eyes row
  [1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1],  // face spacer
  [1,1,1,2,2,2,4,4,4,4,2,2,2,1,1,1],  // mouth row
  [1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1],  // face bg bottom
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
];

// ─── Pixel colours ───────────────────────────────────────────────────────────

function pixelColor(val: number, row: number, col: number, grid: number[][]): string {
  const isEdge =
    !grid[row - 1]?.[col] ||
    !grid[row + 1]?.[col] ||
    !grid[row]?.[col - 1] ||
    !grid[row]?.[col + 1];

  switch (val) {
    case 3: return "#3a4a52";          // eye
    case 4: return "#7aaab8";          // mouth
    case 2: return "#c4dce6";          // face background
    case 1: return isEdge ? "#d4eaf2" : "#e8f4f8"; // cloud edge vs body
    default: return "transparent";
  }
}

// ─── Raindrop data ───────────────────────────────────────────────────────────

const DROPS: RaindropDef[] = [
  { x: -22, delay: 0.0,  duration: 1.5, height: 3 },
  { x:  -8, delay: 0.4,  duration: 1.3, height: 4 },
  { x:   6, delay: 0.8,  duration: 1.6, height: 3 },
  { x:  20, delay: 0.2,  duration: 1.4, height: 4 },
  { x: -14, delay: 1.0,  duration: 1.3, height: 3 },
  { x:   0, delay: 0.6,  duration: 1.5, height: 4 },
  { x:  14, delay: 1.2,  duration: 1.2, height: 3 },
  { x: -30, delay: 0.9,  duration: 1.6, height: 3 },
  { x:  28, delay: 0.3,  duration: 1.4, height: 4 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CloudPixelGrid({ scale }: { scale: number }) {
  const px = scale; // 1 grid unit = `scale` CSS pixels

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(16, ${px}px)`,
        gridTemplateRows: `repeat(${GRID.length}, ${px}px)`,
        imageRendering: "pixelated",
      }}
    >
      {GRID.map((row, r) =>
        row.map((val, c) => (
          <div
            key={`${r}-${c}`}
            style={{
              width: px,
              height: px,
              backgroundColor: pixelColor(val, r, c, GRID),
            }}
          />
        ))
      )}
    </div>
  );
}

function Raindrop({ drop, scale, cloudHeight }: { drop: RaindropDef; scale: number; cloudHeight: number }) {
  const dropW = scale;          // 1 pixel wide
  const dropH = drop.height * scale;
  const travelDistance = cloudHeight * 0.8;

  return (
    <motion.div
      style={{
        position: "absolute",
        // Anchor to bottom-center of cloud, then offset x
        bottom: 0,
        left: "50%",
        marginLeft: drop.x * scale - dropW / 2,
        width: dropW,
        height: dropH,
        backgroundColor: "#4a8fa0",
        imageRendering: "pixelated",
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, travelDistance],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: drop.duration,
        delay: drop.delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.08, 0.8, 1],
      }}
    />
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function PixelRainCloud({ scale = 2, className = "" }: PixelRainCloudProps) {
  const COLS = 16;
  const ROWS = GRID.length;
  const cloudW = COLS * scale;
  const cloudH = ROWS * scale;
  const rainAreaH = cloudH * 0.85;

  return (
    <div
      className={className}
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Cloud body — floats up and down */}
      <motion.div
        style={{ position: "relative", width: cloudW, height: cloudH }}
        animate={{ y: [0, -6 * (scale / 2), 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <CloudPixelGrid scale={scale} />

        {/* Rain container — positioned relative to cloud bottom */}
        <div
          style={{
            position: "absolute",
            bottom: -rainAreaH,
            left: 0,
            width: cloudW,
            height: rainAreaH,
            pointerEvents: "none",
          }}
        >
          {DROPS.map((drop, i) => (
            <Raindrop
              key={i}
              drop={drop}
              scale={scale}
              cloudHeight={rainAreaH}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
