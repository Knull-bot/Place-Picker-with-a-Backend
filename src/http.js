export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("Failed to fetch places.");
  }
  const data = await response.json();
  return data.places;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  if (!response.ok) {
    throw new Error("Failed to fetch user's places.");
  }
  const data = await response.json();
  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data... try again later");
  }

  return data.message;
}
