import React from "react";

const HomePageFeature = ({
  title,
  description,
  cta,
}: {
  title: string;
  description: string;
  cta?: React.ReactNode;
}) => {
  return (
    <div className="relative flex gap-4 mb-4">
      <div className="mt-2 z-10 block h-5 w-5 rounded-full">
        <div className="h-3 w-3 rounded-full border-2 border-gray-400"></div>
      </div>
      <div className="flex flex-col justify-start">
        <h3 className="text-xl tracking-tight font-medium">{title}</h3>
        <p className="mb-3 font-normal">{description}</p>
        <p className="text-xs mb-3">{cta}</p>
      </div>
    </div>
  );
};

export default HomePageFeature;
