import React, { Fragment, useState } from "react";

interface SearchProps {
  history: any;
}

export const Search: React.FC<SearchProps> = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
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
