import React from "react";
import ReactStars from "react-rating-stars-component";

interface ReviewCardProps {
  review: any;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.ratings,
    isHalf: true,
  };
  return (
    <div>
      <img src="" alt="" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};
