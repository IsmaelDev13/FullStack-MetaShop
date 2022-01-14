import React, { Fragment, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Metadata } from "../layout/Metadata";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Banner } from "./Banner";

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
          <div className="h-full  mx-auto ">
            <Banner />
            {/* <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto p-10 space-x-10"> */}
            <div className="flex overflow-y-hidden overflow-x-scroll scrollbar-hide">
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
            <div className="border-t  border-gray-800 ">
              <img
                className="h-40 w-full md:h-96 object-cover drop-shadow-lg"
                loading="lazy"
                src="/man.jpg"
                alt=""
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
