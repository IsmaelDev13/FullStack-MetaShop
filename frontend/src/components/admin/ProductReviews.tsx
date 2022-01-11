import { Button } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
interface ProductListProps {}

export const ProductReviews: React.FC<ProductListProps> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, productId]);

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
      <Metadata title={`All Reviews | Admin`} />
      <div>
        <Sidebar />
        <div>
          <form
            onSubmit={productReviewSubmitHandler}
            encType="multipart/form-data"
          >
            <h1>All Reviews</h1>
            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          ) : (
            <h1>No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};
