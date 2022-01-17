/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Metadata } from "../layout/Metadata";
import { Sidebar } from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
interface ProductListProps {
  history: any;
}

export const ProductReviews: React.FC<ProductListProps> = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error: deleteError, isDeleted } = useSelector(
    (state: any) => state.review
  );
  const [productId, setProductId] = useState("");

  const { error, reviews, loading } = useSelector(
    (state: any) => state.productReviews
  );

  const deleteReviewsHandler = (reviewId: any) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewSubmitHandler = (e: any) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, productId, history]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params: any) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewsHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows: any = [];
  reviews &&
    reviews.forEach((item: any) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <Metadata title={"All Reviews | Admin"} />
      <div>
        <Sidebar />
        <div className="flex flex-col items-center justify-center mx-auto space-y-10 h-screen ">
          <form
            className="transition-all focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg p-16 rounded-l-xl"
            onSubmit={productReviewSubmitHandler}
            encType="multipart/form-data"
          >
            <h1 className="font-bold italic text-xl">All Reviews</h1>
            <div className="flex border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
              <StarIcon className="mx-4" />
              <input
                type="text"
                className="focus-within:outline-none flex-grow"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>
          <div className="w-full ">
            {reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            ) : (
              <h1 className="font-bold text-center text-xl">
                No Reviews Found
              </h1>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
