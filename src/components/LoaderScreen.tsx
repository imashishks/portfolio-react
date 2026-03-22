import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import loaderGif from "../assets/images/loader.gif";

/**
 * Parses GIF89a binary data and returns the total animation duration in ms.
 * Sums the delay values from every Graphic Control Extension block.
 */
function getGifDuration(buffer: ArrayBuffer): number {
  const data = new Uint8Array(buffer);
  let totalDelay = 0;
  let i = 6; // skip header (GIF89a) + logical screen descriptor (7 bytes with i=6)

  // Skip the logical screen descriptor (7 bytes from position 6)
  // position 0-5: header "GIF89a"
  // position 6: logical screen width (2 bytes)
  // position 8: packet byte with global color table flag + color resolution + sort flag + GCT size
  const packedByte = data[10];
  const hasGCT = (packedByte & 0x80) >> 7;
  const gctSize = hasGCT ? 3 * (1 << ((packedByte & 0x07) + 1)) : 0;

  i = 13 + gctSize; // skip header (6) + logical screen descriptor (7) + GCT

  while (i < data.length) {
    const byte = data[i];

    if (byte === 0x3b) break; // GIF trailer

    if (byte === 0x21) {
      // Extension block
      const label = data[i + 1];
      if (label === 0xf9) {
        // Graphic Control Extension
        // delay is at bytes i+4 and i+5 (little-endian, units of 10ms)
        const delayLow = data[i + 4];
        const delayHigh = data[i + 5];
        const delay = (delayHigh * 256 + delayLow) * 10; // convert to ms
        totalDelay += delay;
      }
      // Skip through sub-blocks
      i += 2;
      while (data[i] !== 0x00) {
        i += data[i] + 1;
      }
      i++; // skip block terminator
    } else if (byte === 0x2c) {
      // Image descriptor
      i += 10;
      const imagePacked = data[i - 1];
      const hasLCT = (imagePacked & 0x80) >> 7;
      const lctSize = hasLCT ? 3 * (1 << ((imagePacked & 0x07) + 1)) : 0;
      i += lctSize;
      i++; // LZW minimum code size
      // Skip sub-blocks
      while (data[i] !== 0x00) {
        i += data[i] + 1;
      }
      i++; // skip block terminator
    } else {
      // Unknown — advance by 1 to avoid infinite loop
      i++;
    }
  }

  return totalDelay > 0 ? totalDelay : 2000; // fallback to 2s
}

interface LoaderScreenProps {
  onComplete: () => void;
}

export default function LoaderScreen({ onComplete }: LoaderScreenProps) {
  const [visible, setVisible] = useState(true);
  const hasCompleted = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(loaderGif, { signal: controller.signal })
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const duration = getGifDuration(buffer);
        const FADE_DURATION_MS = 500;
        timerRef.current = setTimeout(() => {
          setVisible(false);
        }, Math.max(0, duration - FADE_DURATION_MS));
      })
      .catch(() => {
        // fallback if fetch fails
        if (!hasCompleted.current) {
          timerRef.current = setTimeout(() => setVisible(false), 2000);
        }
      });

    return () => {
      controller.abort();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleExitComplete() {
    if (!hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="loader"
          className="loader-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={loaderGif}
            width={"100%"}
            alt="Loading…"
            className="loader-gif"
            // Prevent browser caching inconsistencies that could cause GIF to not restart
            key="loader-gif"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
