import React, { Fragment } from "react";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Fragment>
      <div>
        <p>Welcome to MetaShop</p>
      </div>
    </Fragment>
  );
};
