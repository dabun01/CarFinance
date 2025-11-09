// utils/filterCars.js
const RANGE = {
  yearRange: {
    "2021–2025": [2021, 2025],
    "2016–2020": [2016, 2020],
    "2011–2015": [2011, 2015],
    "2005–2010": [2005, 2010],
    "Older": [0, 2004]
  },
  priceRange: {
    "Under $15,000": [0, 15000],
    "$15,000–$25,000": [15000, 25000],
    "$25,000–$40,000": [25000, 40000],
    "$40,000+": [40000, Infinity]
  },
  mileageRange: {
    "Under 10,000 miles": [0, 10000],
    "10,000–30,000 miles": [10000, 30000],
    "30,000–60,000 miles": [30000, 60000],
    "60,000+ miles": [60000, Infinity]
  },
  mpgPreference: {
    "Under 25 MPG (performance)": [0, 25],
    "25–35 MPG (balanced)": [25, 35],
    "35+ MPG (efficient)": [35, Infinity]
  },
  engineSize: {
    "Under 1.5L": [0, 1.5],
    "1.5L–2.0L": [1.5, 2.0],
    "2.0L–3.0L": [2.0, 3.0],
    "3.0L+": [3.0, Infinity]
  }
};

const inRange = (value, [min, max]) => value >= min && value <= max;

export function filterCars(cars, answers) {
  const {
    // modelType, // not applied (your data has no bodyType field)
    yearRange,
    priceRange,
    transmission,
    mileageRange,
    fuelType,
    mpgPreference,
    engineSize
  } = answers || {};

  return cars
    .map((c) => ({ ...c, model: String(c.model || "").trim() })) // normalize
    .filter((c) => {
      // Year
      if (yearRange && RANGE.yearRange[yearRange]) {
        if (!inRange(Number(c.year), RANGE.yearRange[yearRange])) return false;
      }

      // Price
      if (priceRange && RANGE.priceRange[priceRange]) {
        if (!inRange(Number(c.price), RANGE.priceRange[priceRange])) return false;
      }

      // Transmission
      if (transmission && transmission !== "No preference") {
        if (String(c.transmission).toLowerCase() !== transmission.toLowerCase()) return false;
      }

      // Mileage
      if (mileageRange && RANGE.mileageRange[mileageRange]) {
        if (!inRange(Number(c.mileage), RANGE.mileageRange[mileageRange])) return false;
      }

      // Fuel
      if (fuelType) {
        if (String(c.fuelType).toLowerCase() !== fuelType.toLowerCase()) return false;
      }

      // MPG
      if (mpgPreference && RANGE.mpgPreference[mpgPreference]) {
        const [min, max] = RANGE.mpgPreference[mpgPreference];
        // For "Under 25", treat as <25 (exclusive upper), else inclusive is fine.
        const ok =
          mpgPreference.startsWith("Under")
            ? Number(c.mpg) < max
            : inRange(Number(c.mpg), [min, max]);
        if (!ok) return false;
      }

      // Engine size
      if (engineSize && RANGE.engineSize[engineSize]) {
        if (!inRange(Number(c.engineSize), RANGE.engineSize[engineSize])) return false;
      }

      return true;
    });
}
