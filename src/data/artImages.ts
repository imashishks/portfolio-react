export interface ArtImage {
  name: string;
  title: string;
  orientation: string;
  border: boolean;
  thumbnail: string;
  highres: string;
}

export const artImages: ArtImage[] = [

  {
    name: "starrynight",
    title: "Starry Night",
    orientation: "potrait",
    thumbnail: "../../assets/images/art/thumbnails/starrynight.webp",
    highres: "../../assets/images/art/highres/starrynight.jpg",
    border: false,
  },
  {
    name: "underwater",
    title: "Underwater",
    orientation: "landscape",
    thumbnail: "../../assets/images/art/thumbnails/underwater.webp",
    highres: "../../assets/images/art/highres/underwater.jpg",
    border: false,
  },
  { name: "anger", title: "Anger", orientation: "potrait", border: false, thumbnail: "../../assets/images/art/thumbnails/anger.webp", highres: "../../assets/images/art/highres/anger.jpg", },
  {
    name: "astronaut",
    title: "Astronaut",
    orientation: "potrait",
    thumbnail: "../../assets/images/art/thumbnails/astronaut.webp",
    highres: "../../assets/images/art/highres/astronaut.jpg",
    border: false,
  },

  {
    name: "beginnings",
    title: "Beginnings",
    orientation: "potrait",
    thumbnail: "../../assets/images/art/thumbnails/beginnings.webp",
    highres: "../../assets/images/art/highres/beginnings.jpg",
    border: false,
  },
  { name: "doodler", title: "Doodler", orientation: "potrait", border: false, thumbnail: "../../assets/images/art/thumbnails/doodler.webp", highres: "../../assets/images/art/highres/doodler.jpg", },
  {
    name: "freechild",
    title: "Freechild",
    orientation: "potrait",
    thumbnail: "../../assets/images/art/thumbnails/freechild.webp",
    highres: "../../assets/images/art/highres/freechild.jpg",
    border: false,
  },

  {
    name: "ifeelitcoming",
    title: "I Feel It Coming",
    orientation: "landscape",
    thumbnail: "../../assets/images/art/thumbnails/ifeelitcoming.webp",
    highres: "../../assets/images/art/highres/ifeelitcoming.jpg",
    border: false,
  },


  { name: "lost", title: "Lost", orientation: "potrait", thumbnail: "../../assets/images/art/thumbnails/lost.webp",highres: "../../assets/images/art/highres/lost.jpg", border: false },
  {
    name: "kantara",
    title: "Kantara",
    orientation: "landscape",
    thumbnail: "../../assets/images/art/thumbnails/kantara.webp",
    highres: "../../assets/images/art/highres/kantara.jpg",
    border: false,
  },
  {
    name: "steallikeanartist",
    title: "Steal Like An Artist",
    orientation: "potrait",
    thumbnail: "../../assets/images/art/thumbnails/steallikeanartist.webp",
    highres: "../../assets/images/art/highres/steallikeanartist.jpg",
    border: false,
  },
  { name: "stepup", title: "Step Up", orientation: "landscape", thumbnail: "../../assets/images/art/thumbnails/stepup.webp", border: false,highres: "../../assets/images/art/highres/stepup.jpg", },



  {
    name: "johnmayer",
    title: "John Mayer",
    orientation: "potrait",
    thumbnail: "../../assets/images/art/thumbnails/johnmayer.webp",
    highres: "../../assets/images/art/highres/johnmayer.jpg",
    border: false,
  },
];
