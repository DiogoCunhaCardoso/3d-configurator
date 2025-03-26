import React, { useState } from "react";

// TABS --------------------------------------------
import TabOne from "./tabs/TabOne";
import TabTwo from "./tabs/TabTwo";
import TabThree from "./tabs/TabThree";

const NavigationButton = ({ text, isActive, onClick }) => {
  return (
    <button
      className={`py-4 w-40 flex-shrink-0 transition-colors pointer-events-auto border-b-4 ${
        isActive
          ? "bg-[#1a1a1a] border-[#6597c3]"
          : "bg-transparent border-transparent"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const BottomNavigation = ({ images, accessories }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabContent = [
    <TabOne images={images} />,
    <TabTwo />,
    <TabThree accessories={accessories} />,
  ];

  return (
    <div className="fixed bottom-0 h-2/5 w-full bg-[#1a1a1a] text-white lg:hidden">
      {/* Container for scrollable buttons */}
      <div className="flex overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar">
        <NavigationButton
          text={"Padrão"}
          isActive={activeTab === 0}
          onClick={() => setActiveTab(0)}
        />
        <NavigationButton
          text={"Componentes"}
          isActive={activeTab === 1}
          onClick={() => setActiveTab(1)}
        />
        <NavigationButton
          text={"Acessórios"}
          isActive={activeTab === 2}
          onClick={() => setActiveTab(2)}
        />
      </div>

      {/* Display the active tab's content */}

      {tabContent[activeTab]}
    </div>
  );
};

export default BottomNavigation;
