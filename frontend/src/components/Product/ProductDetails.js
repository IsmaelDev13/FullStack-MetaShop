import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { ReviewCard } from "./ReviewCard";
import { Loader } from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Metadata } from "../layout/Metadata";
import { addItemsToCard } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isOpenReviews, setIsOpenReviews] = useState(false);
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Succesfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, alert, success]);

  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCard(id, quantity));
    alert.success("Item Added to Cart");
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setIsOpenReviews(false);
  };

  return (
    <Fragment className="h-screen">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`MetaShop | ${product.name} `} />
          <div className="flex flex-col  md:grid grid-cols-3 bg-gray-100 shadow-lg rounded-lg ">
            <div className="col-span-2  scale-75 top-10 border-t-2    ">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="h-[669px] w-[669px]  object-contain "
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="col-span-1 pt-24 space-y-5  text-center relative shadow-lg border-b border-l  bg-white">
              <div className="absolute top-5 left-10 font-sans italic ">
                {product.category}
              </div>
              <div>
                <h2 className="text-3xl italic font-semibold pb-4 uppercase">
                  {product.name}
                </h2>
              </div>
              <div className="absolute top-5 right-10 text-sm flex items-center space-x-3">
                <Rating {...options} />
                <span className="font-bold text-sm underline">
                  {product.numOfReviews} Reviews
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-semibold pb-4 uppercase">{`$${product.price}`}</h1>
                <div className="p-2">
                  <p className="font-sans font-light">{product.description}</p>
                </div>
                <div className="p-2">
                  <p className="font-sans font-light">
                    This product does not have any discounts nor promo codes.
                  </p>
                </div>
                <div>
                  <div>
                    <button
                      className="bg-black text-white px-3 hover:scale-105 transition-transform duration-150 ease-in hover:bg-gray-800"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      className="text-center font-semibold border-2 rounded-sm"
                      readOnly
                      value={quantity}
                      type="number"
                    />
                    <button
                      className="bg-black text-white px-3 hover:scale-105 transition-transform duration-150 ease-in  hover:bg-gray-800"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Status:{" "}
                    <b>{product.Stock < 1 ? "Out Of Stock" : "In Stock"}</b>
                  </p>
                  <button
                    className="bg-black text-white w-1/2 p-3 m-4 border border-white  hover:bg-gray-700 cursor-pointer "
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <button
                className="p-3 m-4 w-1/2 bg-white text-black border border-black hover:bg-gray-200"
                onClick={() => setIsOpenReviews(true)}
              >
                Submit Review
              </button>
            </div>
          </div>
          <Dialog aria-labelledby="simple-dialog-title" open={isOpenReviews}>
            <DialogTitle className="text-center">Submit Review</DialogTitle>
            <DialogContent className="flex flex-col space-y-4 items-center">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                cols="30"
                rows="10"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpenReviews(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="flex overflow-y-hidden overflow-x-scroll scrollbar-hide p-3">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="font-bold  p-4 text-center text-xl">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;
