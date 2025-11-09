import React from "react";
import CarCard from "./CarCard";

export default function CarCardList({ cars }) {
  if (!cars || cars.length === 0) {
    return <p>No cars found.</p>;
  }

  return (
    <div className="car-card-list">
      {cars.map((car, index) => (
        <CarCard key={index} car={car} />
      ))}
    </div>
  );
}
