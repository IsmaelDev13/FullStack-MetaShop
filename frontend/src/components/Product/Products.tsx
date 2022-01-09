import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Loader } from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import { ProductCard } from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
import { Metadata } from "../layout/Metadata";

const categories = [
  "Laptop",
  "MacBook",
  "Tops",
  "Bottom",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState<any>(0);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state: any) => state.products);

  const keyword = params.keyword;
  const setCurrentPageNo = (e: React.SetStateAction<number>) => {
    setCurrentPage(e);
  };
  const priceHandler = (e: any, newPrice: any) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    console.log(keyword);
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="MetaShop | Products" />
          <h2>Products</h2>
          <div>
            {products &&
              products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul>
              {categories.map((category) => (
                <li
                  className="cursor-pointer hover:text-teal-500"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="flex items-center  m-7 ">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass=" border p-2 cursor-pointer first:rounded-l-lg last:rounded-r-lg "
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default Products;
