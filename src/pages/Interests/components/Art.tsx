import ImageGrid from "../../../components/common/ImageGrid";
import { artImages } from "../../../data/artImages";

const Art = () => {
  return (
    <div className="mt-10">
      <p className="text-2xl text-blue mb-8 font-medium">
        Art is where imagination learns to speak without words
      </p>
      <p>
        Art has been a part of my life for as long as I can remember. What
        started as scribbling in school notebooks grew into a deep passion for
        colours, shapes, and visual storytelling.
      </p>
      <p className="mt-4">
        I'm a self-taught artist working with acrylics and digital tools,
        constantly experimenting, learning, and finding new ways to express
        creativity.
      </p>
      <p className="mt-4">Putting some of my work here.</p>
      <ImageGrid images={artImages} />
    </div>
  );
};

export default Art;
