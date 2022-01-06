import React from "react";

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className="w-screen h-screen bg-white grid place-items-center max-w-full">
      <svg
        className="animate-[spin_1s_linear_infinite] h-20 w-20 mr-3 bg-red-200 border-b-8 rounded-2xl "
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
};
