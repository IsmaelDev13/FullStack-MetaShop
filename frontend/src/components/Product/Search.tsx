import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Metadata } from "../layout/Metadata";

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e: any) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <Fragment>
      <Metadata title="MetaShop | Search A Product... " />
      <form onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};
function useHistory() {
  throw new Error("Function not implemented.");
}