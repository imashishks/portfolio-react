import TabLayout from "../components/TabLayout";

function Hobbies() {
  const tabs = [
    {
      id: "art",
      label: "Art",
    },
    {
      id: "music",
      label: "Music",
    },
    {
      id: "coffee",
      label: "Coffee",
    },
    {
      id: "plants",
      label: "Plants",
    },
    {
      id: "fishes",
      label: "Fishes",
    },
  ];
  return (
    <TabLayout tabs={tabs}>
      <h1>Beyond Work</h1>
      <p>This is the Art and Music page.</p>
    </TabLayout>
  );
}

export default Hobbies;
