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
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCard(id, quantity));
    alert.success("Item Added to Cart");
  };

  // const submitReviewToggle = () => {
  //   open ? setOpen(false) : setOpen(true);
  // };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setIsOpenReviews(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`MetaShop | ${product.name} `} />
          <div>
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img key={item.url} src={item.url} alt={`${i} Slide`} />
                  ))}
              </Carousel>
            </div>
            <div>
              <div>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div>
                <Rating {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div>
                <h1>{`$${product.price}`}</h1>
                <div>
                  <div>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b>{product.Stock < 1 ? "Out Of Stock" : "In Stock"}</b>
                </p>
              </div>
              <div>
                Description: <p>{product.description}</p>
              </div>
              <button onClick={() => setIsOpenReviews(true)}>
                Submit Review
              </button>
            </div>
          </div>
          <h3>Reviews</h3>
          <Dialog aria-labelledby="simple-dialog-title" open={isOpenReviews}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent>
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
              <Button color="secondary">Cancel</Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div>
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p>No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;
