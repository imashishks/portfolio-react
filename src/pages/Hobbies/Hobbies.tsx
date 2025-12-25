import { Outlet } from "react-router-dom";
import TabLayout from "../../components/TabLayout";
import { ROUTES } from "../../constants";

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
    <TabLayout tabs={tabs} basePath={ROUTES.HOBBIES.key}>
      <h1>Beyond Work</h1>
      <p>This is the Art and Music page.</p>
      <Outlet />
    </TabLayout>
  );
}

export default Hobbies;
