import React from "react";
import s from "./StarsRating.module.scss";
import star from "./assets/star.svg";
import starGray from "./assets/star-gray.svg";

type TStarsRating = {
  amount: number;
  onChange?: (stars: number) => void;
  interactive?: boolean;
};

const StarsRating: React.FC<TStarsRating> = ({
  amount,
  onChange,
  interactive = false,
}) => {
  const [hoveredStars, setHoveredStars] = React.useState(0);
  const [selectedStars, setSelectedStars] = React.useState(amount);

  const handleStarClick = (index: number) => {
    if (interactive && onChange) {
      setSelectedStars(index + 1);
      onChange(index + 1);
    }
  };

  const handleStarHover = (index: number) => {
    if (interactive) {
      setHoveredStars(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredStars(0);
    }
  };

  return (
    <div className={s.container} onMouseLeave={handleMouseLeave}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={s.star}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
        >
          <img
            src={(hoveredStars || selectedStars) > index ? star : starGray}
            alt="star"
          />
        </span>
      ))}
    </div>
  );
};

export default StarsRating;
