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
  ];
  return (
    <TabLayout tabs={tabs}>
      <h1>Hobbies</h1>
      <p>This is the Art and Music page.</p>
    </TabLayout>
  );
}

export default Hobbies;
