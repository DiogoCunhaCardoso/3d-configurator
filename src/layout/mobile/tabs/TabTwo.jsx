import { useState, useEffect } from "react";
import myStore from "../../../store/model.store";
import TabTwoSubOne from "../subTabs/SubOne";
import TabTwoSubThree from "../subTabs/SubThree";
import TabTwoSubFour from "../subTabs/SubFour";
import TabTwoSubTwo from "../subTabs/SubTwo";

const SubNavigationButton = ({ text, isActive, onClick }) => {
  return (
    <button
      className={`py-4 px-4 flex-shrink-0 transition-colors border-b-2 text-sm ${
        isActive ? "border-[#6597c3] text-[#6597c3]" : "border-transparent"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const TabTwo = () => {
  const [activeSubTab, setActiveSubTab] = useState(0);
  const setIsInteriorToShowing = myStore(
    (state) => state.setIsInteriorToShowing
  );

  useEffect(() => {
    setIsInteriorToShowing(activeSubTab === 2);
  }, [activeSubTab, setIsInteriorToShowing]);

  const subTabContent = [
    <TabTwoSubOne />,
    <TabTwoSubTwo />,
    <TabTwoSubThree />,
    <TabTwoSubFour />,
  ];

  return (
    <div className="w-full pointer-events-auto mt-">
      {/* Sub-navigation buttons */}
      <div className="overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar mb-4">
        <SubNavigationButton
          text={"Grelha Lateral"}
          isActive={activeSubTab === 0}
          onClick={() => setActiveSubTab(0)}
        />
        <SubNavigationButton
          text={"Design Exterior"}
          isActive={activeSubTab === 1}
          onClick={() => setActiveSubTab(1)}
        />
        <SubNavigationButton
          text={"Cuba Interior"}
          isActive={activeSubTab === 2}
          onClick={() => setActiveSubTab(2)}
        />
        <SubNavigationButton
          text={"Tampa"}
          isActive={activeSubTab === 3}
          onClick={() => setActiveSubTab(3)}
        />
      </div>

      {/* Display active sub-tab content */}
      <div className="text-center">{subTabContent[activeSubTab]}</div>
    </div>
  );
};

export default TabTwo;
