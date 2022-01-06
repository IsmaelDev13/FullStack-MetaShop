import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Loader } from "../layout/Loader/Loader";
import { ProductCard } from "../Home/ProductCard";

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state: any) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2>Products</h2>
          {products &&
            products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </Fragment>
      )}
    </Fragment>
  );
};
