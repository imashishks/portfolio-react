import { useState, useEffect } from "react";
import Image from "./Image";
import { ArtImage } from "../../data/artImages";

interface ImageGridProps {
  images: ArtImage[];
}

function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {images.map((image) => {
        const orientation = image.orientation;
        const isLandscape = orientation === "landscape";
        const isPortrait = orientation === "portrait";
        return (
          <div
            key={image.name}
            className={`
              ${isLandscape ? "col-span-2" : ""}
              ${isPortrait ? "col-span-1" : ""}
            `}
          >
            <Image image={image} />
          </div>
        );
      })}
    </div>
  );
}

export default ImageGrid;
