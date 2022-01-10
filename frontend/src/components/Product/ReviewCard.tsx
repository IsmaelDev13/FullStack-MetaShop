import React from "react";
import { Rating } from "@mui/material";
interface ReviewCardProps {
  review: any;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const options: any = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div>
      <img src="" alt="" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
};
