import React from "react";

export default function CarCard({ car }) {
  const {
    model,
    year,
    price,
    transmission,
    mileage,
    fuelType,
    mpg,
    engineSize
  } = car;

  return (
    <div className="car-card">
      <h2 className="car-title">
        {year} {model}
      </h2>
      <p className="car-price">${price.toLocaleString()}</p>

      <ul className="car-specs">
        <li><strong>Transmission:</strong> {transmission}</li>
        <li><strong>Mileage:</strong> {mileage.toLocaleString()} mi</li>
        <li><strong>Fuel Type:</strong> {fuelType}</li>
        <li><strong>MPG:</strong> {mpg}</li>
        <li><strong>Engine Size:</strong> {engineSize}L</li>
      </ul>
    </div>
  );
}
