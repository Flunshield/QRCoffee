import React, { ReactNode, useState } from 'react';
import Button from "./Button";

interface Tab {
  label: string;
  children: ReactNode;
  active: boolean;
}

interface TabsProps {
  tabs: Tab[];
  onTabClick: (label: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick }) => {
  return (
    <div>
      <div className="flex ml-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => onTabClick(tab.label)}
            className={`${
              tab.active ? 'font-bold button-container-tab' : 'font-normal'
            } px-4 py-2 text-sm focus:outline-none`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.active)?.children}</div>
    </div>
  );
};

export default Tabs;