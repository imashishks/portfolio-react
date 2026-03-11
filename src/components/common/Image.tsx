import Button from "./Button";
import { ArtImage } from "../../data/artImages";

// Preload all thumbnails and highres images at build time so Vite
// includes them in the dist and gives us the final URLs.
const thumbnailMap = (import.meta as any).glob(
  "../../assets/images/art/thumbnails/*.webp",
  { eager: true, as: "url" }
) as Record<string, string>;

const highresJpgMap = (import.meta as any).glob(
  "../../assets/images/art/highres/*.jpg",
  { eager: true, as: "url" }
) as Record<string, string>;

const highresPngMap = (import.meta as any).glob(
  "../../assets/images/art/highres/*.png",
  { eager: true, as: "url" }
) as Record<string, string>;

interface ImageProps {
  image: ArtImage;
}

function Image({ image }: ImageProps) {
  const isLandscape = image.orientation === "landscape";

  const thumbnailKey = `../../assets/images/art/thumbnails/${image.name}.webp`;
  const highresJpgKey = `../../assets/images/art/highres/${image.name}.jpg`;
  const highresPngKey = `../../assets/images/art/highres/${image.name}.png`;

  const thumbnailSrc = thumbnailMap[thumbnailKey];
  const highresSrc = highresJpgMap[highresJpgKey] ?? highresPngMap[highresPngKey];
  const highresExt = highresJpgMap[highresJpgKey] ? "jpg" : "png";

  const handleDownload = () => {
    if (!highresSrc) {
      console.error("Highres image not found for", image.name);
      return;
    }

    const link = document.createElement("a");
    link.href = highresSrc;
    link.download = `${image.name}.${highresExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={
          isLandscape
            ? "w-full h-[200px] overflow-hidden rounded-lg border-2"
            : "w-[200px] h-[200px] mx-auto overflow-hidden rounded-lg border-2"
        }
      >
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={image.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <h3 className="text-black text-sm font-medium truncate">
          {image.title}
        </h3>
        <Button className="px-4! py-1! text-xs!" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
}

export default Image;

