import React from "react";
import "./styles/LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/media/pokeball.png`}
        alt="Loading..."
        className="spinner-image"
      />
    </div>
  );
}
