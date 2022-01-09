import React, { Fragment, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Metadata } from "../layout/Metadata";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state: any) => state.products
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="MetaShop | Homepage" />
          <div className="h-screen flex flex-col text-center items-center justify-center ">
            <p>Welcome to MetaShop</p>
            <h1>Find Amazing Products Below</h1>

            <h2 className="text-center font-sans text-xl mx-auto">
              Featured Products
            </h2>
            <div className="flex flex-wrap w-3/4">
              {products &&
                products.map(
                  (product: {
                    name: string;
                    images: { url: string }[];
                    price: string;
                    _id: string;
                    ratings: number;
                    numOfReviews: number;
                  }) => <ProductCard product={product} />
                )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
