import React from "react";

const TwoSidedArrow = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75 9.75L18 18M18 18V10.08M18 18H10.08"
        stroke="#797979"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.25 14.25L6 6M6 6V13.92M6 6H13.92"
        stroke="#797979"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default TwoSidedArrow;
