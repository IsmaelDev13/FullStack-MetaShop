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
          <div className="h-full max-w-screen-lg mx-auto ">
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto p-10 space-x-10">
              {products &&
                products.map(
                  (product: {
                    name: string;
                    images: { url: string }[];
                    price: string;
                    _id: string;
                    ratings: number;
                    numOfReviews: number;
                    category: string;
                  }) => <ProductCard product={product} />
                )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
