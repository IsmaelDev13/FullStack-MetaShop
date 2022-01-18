/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
interface ReviewCardProps {
  review: any;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user } = useSelector((state: any) => state.user);
  const options: any = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="flex flex-col items-center p-5 border-t-2  shadow-xl rounded-md">
      <img className="h-10 w-10 rounded-full" src={user?.avatar.url} alt="" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
};
