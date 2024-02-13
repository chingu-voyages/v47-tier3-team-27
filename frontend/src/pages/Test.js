import React, { useState, useEffect } from "react";
const api = process.env.REACT_APP_API_URL;

export default function Test() {
  async function displayCategories() {
    await fetch(`${api}/categories/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load categories.");
        }
        return response.json();
      })
      .then((categories) => setCategories(categories))
      .catch((error) => console.error(error));
  }

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    displayCategories();
  }, []);
  return (
    <div>
      {!categories.length ? (
        <div>Loading....</div>
      ) : (
        <div>
          {categories?.map((c) => {
            return <p>{c._id}, {c.name}</p>;
          })}
        </div>
      )}
    </div>
  );
}
