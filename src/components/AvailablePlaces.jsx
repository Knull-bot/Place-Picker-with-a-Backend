import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [loadingState, setLoadingState] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    setLoadingState(true);
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAvailablePlaces(data.places);
        setLoadingState(false);
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
      isLoading={loadingState}
      loadingText={"Fetching place data..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
