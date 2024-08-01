import React from "react";
import Home from "./icons/home";
import Boards from "./icons/boards";
import Setting from "./icons/setting";
import Teams from "./icons/teams";
import Analytics from "./icons/analytics";

const iconComponents = {
  home: Home,
  boards: Boards,
  setting: Setting,
  teams: Teams,
  analytics: Analytics,
};

interface IconRendererProps {
  icon: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ icon }) => {
  const IconComponent = iconComponents[icon as keyof typeof iconComponents];
  return IconComponent ? <IconComponent /> : null;
};

export default IconRenderer;
