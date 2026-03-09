import { useState, useEffect, useRef } from "react";
import { ArtImage } from "../../data/artImages";

interface CircularImageCarouselProps {
  images: ArtImage[];
}

function CircularImageCarousel({ images }: CircularImageCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [imageSrcs, setImageSrcs] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRadius = 400; // Radius of the circle in pixels
  const imageSize = 200; // Size of each image container

  // Load all image thumbnails
  useEffect(() => {
    const loadImages = async () => {
      const loaded: Record<string, string> = {};
      for (const image of images) {
        try {
          const module = await import(
            `../../assets/images/art/thumbnails/${image.name}.webp`
          );
          loaded[image.name] = module.default;
        } catch (error) {
          console.error(`Error loading image ${image.name}:`, error);
        }
      }
      setImageSrcs(loaded);
    };
    loadImages();
  }, [images]);

  // Handle scroll-based rotation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementCenter = elementTop + rect.height / 2;

      // Calculate rotation based on scroll position
      // Rotate 360 degrees as user scrolls through the viewport
      // Start rotating when element enters viewport, complete rotation when it exits
      const viewportCenter = scrollY + windowHeight / 2;
      const distanceFromCenter = viewportCenter - elementCenter;
      const scrollRange = windowHeight * 2; // Rotate over 2 viewport heights
      const scrollProgress = distanceFromCenter / scrollRange;
      const newRotation = scrollProgress * 360;
      setRotation(newRotation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate position for each image around the circle
  const getImagePosition = (index: number, total: number) => {
    const angle = (index / total) * 360; // Angle in degrees
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * circleRadius;
    const y = Math.sin(radian) * circleRadius;
    return { x, y, angle };
  };

  const handleDownload = async (image: ArtImage) => {
    try {
      const extensions = ["jpg", "png"];
      let highresModule = null;
      let extension = "";

      for (const ext of extensions) {
        try {
          highresModule = await import(
            `../../assets/images/art/highres/${image.name}.${ext}`
          );
          extension = ext;
          break;
        } catch (e) {
          continue;
        }
      }

      if (!highresModule) {
        console.error("Highres image not found");
        return;
      }

      const response = await fetch(highresModule.default);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${image.name}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center my-32"
      style={{ height: `${circleRadius * 2 + imageSize}px` }}
    >
      {/* Circular container that rotates */}
      <div
        className="absolute top-1/2 left-1/2 transition-transform duration-100 ease-out"
        style={{
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          transformOrigin: "center center",
          width: `${circleRadius * 2}px`,
          height: `${circleRadius * 2}px`,
        }}
      >
        {/* Images positioned around the circle */}
        {images.map((image, index) => {
          const { x, y, angle } = getImagePosition(index, images.length);
          const imageSrc = imageSrcs[image.name];

          return (
            <div
              key={image.name}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, 0%) rotate(${
                  -rotation + angle + 90
                }deg)`,
                width: `${imageSize}px`,
                height: `${imageSize}px`,
              }}
            >
              {imageSrc ? (
                <div className="relative w-full h-full group">
                  <div className="w-full h-full rounded-lg border-2 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${imageSrc})`,
                      }}
                      role="img"
                      aria-label={image.title}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm rounded-b-lg px-3 py-2 flex justify-between items-center">
                    <h3 className="text-black text-sm font-medium truncate">
                      {image.title}
                    </h3>
                    <button
                      onClick={() => handleDownload(image)}
                      className="bg-blue-200 hover:bg-blue-300 text-black px-2 py-1 rounded border border-black text-xs transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CircularImageCarousel;
