import { motion } from "motion/react";
import RecordPlayer from "../../../components/RecordPlayer";
import SpotifyPlayer from "../../../components/SpotifyPlayer.jsx"

const whatAmIListeningTo = [
  {
    name: "Bachelor of Technology",
    artist: "Computer Science",
  },
  {
    name: "Bachelor of Technology",
    artist: "Computer Science",
  },
  {
    name: "Bachelor of Technology",
    artist: "Computer Science",
  },

];

const favouriteAlbums = [
  {
    name: "Bachelor of Technology",
    artist: "Computer Science",
  }]
const favouriteArtists = [
  {
    name: "Bachelor of Technology",

  }];

const songSections = {
  whatAmIListeningTo: {
    title: "what am i listening to these days ?",
    data: whatAmIListeningTo
  },
  favouriteAlbums: {
    title: "favourite albums",
    data: favouriteAlbums
  },
  favouriteArtists: {
    title: "favourite artists (to name a few)",
    data: favouriteArtists
  }
}




export function Section({ songSections }) {
  return (
    <motion.section className="mt-16 w-full mb-8">
      <h3 className="mb-4 font-bold text-blue">{songSections.title}</h3>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        className="grid grid-cols-2 gap-x-16 gap-y-4 max-w-4xl"
      >
        {songSections.data.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-semibold text-sm text-black">
              {item.name}
            </p>
            <p className="mt-1 text-xs text-neutral-500">{item.artist}</p>

          </motion.div>
        ))}
      </motion.section>
    </motion.section>
  );
}


const Music = () => {
  return (
    <div className="mt-10">
      {/* <p className="text-2xl text-blue mb-8 font-medium">
        Please don't stop the music
      </p> */}
      <p>
        Music has always been my constant companion, something that inspires me,
        energizes me, and sometimes helps me slow down. My taste is wildly
        diverse, shifting from hip hop to rock to classic 80s pop depending on
        the mood.
      </p>
      <p className="mt-4">
        I love everything from Linkin Park’s raw emotion to Queen’s iconic
        energy, from Green Day’s punchy attitude to Seedhe Maut’s bold
        storytelling. For me, music isn’t just a hobby, it’s a way to feel alive,
        connect with people, and discover new emotions every day.
      </p>
      <h3 className="mt-8 mb-8 font-semibold ">what am i listening to these days?</h3>



      <RecordPlayer></RecordPlayer>
      {/* <SpotifyPlayer></SpotifyPlayer> */}


    </div>
  );
};

export default Music;