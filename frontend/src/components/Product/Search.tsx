import React, { Fragment, useState } from "react";
import { Metadata } from "../layout/Metadata";

interface SearchProps {
  history: any;
}

export const Search: React.FC<SearchProps> = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e: any) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
      <Metadata title="MetaShop | Search A Product... " />
      <div className="h-screen w-full flex flex-col justify-center items-center mx-auto">
        <form
          className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg p-16 rounded-l-xl  "
          onSubmit={searchSubmitHandler}
        >
          <input
            autoFocus
            className="focus-within:outline-none border-b-2 border-l-2 p-2 "
            type="text"
            placeholder="Search a Product..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            className="flex border-2 font-sans border-gray-500   hover:border-black px-8 cursor-pointer py-2 hover:shadow-md "
            type="submit"
            value="Search"
          />
        </form>
      </div>
    </Fragment>
  );
};
