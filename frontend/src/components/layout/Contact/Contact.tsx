import React from "react";

export const Contact = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center mx-auto justify-center ">
      <a href="mailto:ismaeldev13@gmail.com">
        <button className="transform transition duration-150 ease-in-out hover:scale-105 border-2 appearance-none py-5 lg:p-10 rounded-md shadow-inner hover:bg-green-100 border-green-500 text-2xl md:text-6xl">
          Contact: ismaeldev13@gmail.com
        </button>
      </a>
    </div>
  );
};
