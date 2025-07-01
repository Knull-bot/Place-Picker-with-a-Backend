import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAvailablePlaces(data.places);
      });
  }, []);

  // ASYNC variant
  // useEffect(() => {
  //   async function fetchPlaces() {
  //     const response = await fetch("http://localhost:3000/places");
  //     const data = await response.json();
  //     setAvailablePlaces(data.places);
  //   }

  //   fetchPlaces();
  // }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
