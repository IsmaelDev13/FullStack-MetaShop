import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import { ReviewCard } from "./ReviewCard";
import { Loader } from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Metadata } from "../layout/Metadata";
import { addItemsToCard } from "../../actions/cartAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state: any) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
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
                  product.images.map((item: { url: string }, i: any) => (
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
                <ReactStars {...options} />
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
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b>{product.Stock < 1 ? "Out Of Stock" : "In Stock"}</b>
                </p>
              </div>
              <div>
                Description: <p>{product.description}</p>
              </div>
              <button>Submit Review</button>
            </div>
          </div>
          <h3>Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div>
              {product.reviews &&
                product.reviews.map((review: any) => (
                  <ReviewCard review={review} />
                ))}
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
