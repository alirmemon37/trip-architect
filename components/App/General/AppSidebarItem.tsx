import React from "react";

const AppSidebarItem = ({
  name,
  Icon,
  onClick,
}: {
  name: string;
  Icon: React.FC;
  onClick: () => void;
}) => {
  return (
    <div
      className="text-xs flex flex-col py-2 px-4 md:py-4 md:px-0 items-center hover:bg-gray-100 rounded-lg gap-1 cursor-pointer"
      onClick={onClick}
    >
      <Icon />
      {name}
    </div>
  );
};

export default AppSidebarItem;
