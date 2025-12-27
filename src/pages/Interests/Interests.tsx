import { Outlet } from "react-router-dom";
import TabLayout from "../../components/TabLayout";
import { ROUTES } from "../../constants";

function Interests() {
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
      id: "plants",
      label: "Plants",
    },
    {
      id: "fishes",
      label: "Fishes",
    },
  ];
  return (
    <TabLayout tabs={tabs} basePath={ROUTES.INTERESTS.key}>
      <div className="flex items-center flex-col w-4/6 h-full">
        <Outlet />
      </div>
    </TabLayout>
  );
}

export default Interests;
