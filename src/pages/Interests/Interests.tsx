import { Outlet } from "react-router-dom";
import TabLayout from "../../components/TabLayout";
import { ROUTES } from "../../constants";

function Interests() {
  const tabs = [

    {
      id: "music",
      label: "Music",
    },
    {
      id: "art",
      label: "Art",
    },

    // {
    //   id: "plants",
    //   label: "Plants",
    // },
    // {
    //   id: "fishes",
    //   label: "Fishes",
    // },
  ];
  return (
    <TabLayout tabs={tabs} basePath={ROUTES.INTERESTS.key}>
      <div className="flex h-full w-full flex-col md:w-[80%]">
        <Outlet />
      </div>
    </TabLayout>
  );
}

export default Interests;
