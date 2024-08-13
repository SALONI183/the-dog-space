import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data); 
        setDogs(data);
      } catch (error) {
        console.error("Failed to fetch dog data:", error);
        setError("Failed to load dog data. Please try again later.");
      }
    };

    fetchDogData();
  }, []);

  const sortedAndFilteredDogs = dogs
    .filter((dog) => dog.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      
      {error && (
        <div className="error-message">{error}</div>
      )}
      {!dogs.length && !error ? (
        <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <section className="p-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl font-bold lg:text-5xl">
              DOGSHOP! FIND YOUR PET!
            </h1>
            <p className="my-8 text-white text-lg font-extrabold">
              The Dog Lover's Guide to Finding the Perfect Pet
            </p>
            <form className="max-w-xl mx-auto" autoComplete="off">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search The Dog Breed"
                className="py-2 px-4 rounded shadow w-full bg-cyan-400 text-white placeholder-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <button
              onClick={toggleSortOrder}
              className="mt-4 py-2 px-4 bg-cyan-600 text-white rounded shadow"
            >
              Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 my-16 md:grid-cols-3 gap-4">
            {sortedAndFilteredDogs.map((dog) => {
              const imageUrl = dog.reference_image_id
                ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
                : "https://via.placeholder.com/150"; // Fallback image.

              return (
                <Link
                  to={`/${dog.name}`}
                  key={dog.id}
                  className="bg-[#99e3cd] p-4 rounded hover:bg-[#3a5311] transition-all duration-200"
                >
                  <article>
                    <img
                      src={imageUrl}
                      alt={dog.name}
                      className="rounded md:h-72 w-full object-cover"
                      onError={(e) => e.currentTarget.src = "https://via.placeholder.com/150"} // Fallback on error.
                    />
                    <h3 className="text-xl font-bold mt-4 my-4">{dog.name}</h3>
                    <p className="text-white">Bred For: {dog.bred_for}</p>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
