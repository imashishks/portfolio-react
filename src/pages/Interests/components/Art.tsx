import ImageGrid from "../../../components/common/ImageGrid";
import { artImages } from "../../../data/artImages";
import  { BentoGrid } from "../../../components/common/Bento";
const Art = () => {
  return (
    <div className="mt-10">
      {/* <p className="text-2xl text-blue mb-8 font-medium">
        Art is where imagination learns to speak without words
      </p> */}
      <p>
        Art has been a part of my life for as long as I can remember. What
        started as scribbling in school notebooks grew into a deep passion for
        colours, shapes, and visual storytelling.
      </p>
      <p className="mt-2">
        I'm a self-taught artist working with acrylics and digital tools,
        constantly experimenting, learning, and finding new ways to express
        creativity.
      </p>
      <p className="mt-4 font-semibold">Putting some of my work here.</p>
      <BentoGrid items={artImages} />

    </div>
  );
};

export default Art;
