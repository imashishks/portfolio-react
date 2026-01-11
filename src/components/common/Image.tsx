import { useState, useEffect } from "react";
import { ArtImage } from "../../data/artImages";
import Button from "./Button";

interface ImageProps {
  image: ArtImage;
}

function Image({ image }: ImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  useEffect(() => {
    // Dynamically import the thumbnail
    import(`../../assets/images/art/thumbnails/${image.name}.webp`)
      .then((module) => {
        setThumbnailSrc(module.default);
        const img = new window.Image();
        img.src = module.default;

        img.onload = () => {
          setImageLoaded(true);
        };
      })
      .catch((error) => {
        console.error("Error loading thumbnail:", error);
      });
  }, [image.name]);

  const handleDownload = async () => {
    try {
      // Try .jpg first, then .png
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

  if (!imageLoaded) {
    return (
      <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    );
  }

  return (
    <div className="relative group">
      <div className="w-full h-[400px] rounded-lg border-2 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-110"
          style={{
            backgroundImage: thumbnailSrc ? `url(${thumbnailSrc})` : undefined,
          }}
          role="img"
          aria-label={image.title}
        />
      </div>

      <div className="h-[60px] flex justify-between items-center">
        <h3 className="text-black text-lg font-medium">{image.title}</h3>
        <Button className="px-4! py-1! text-sm!" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
}

export default Image;
