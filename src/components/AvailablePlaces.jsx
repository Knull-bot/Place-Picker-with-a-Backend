import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [loadingState, setLoadingState] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // PROMISE VARIANT
  // useEffect(() => {
  //   setLoadingState(true);
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setAvailablePlaces(data.places);
  //       setLoadingState(false);
  //     });
  // }, []);

  // ASYNC variant
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setLoadingState(false);
        });
      } catch (error) {
        setError({
          message: "Could not fetch places, please try again later.",
        });
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title={"An error ocured!"} message={error.message} />;
  }

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
