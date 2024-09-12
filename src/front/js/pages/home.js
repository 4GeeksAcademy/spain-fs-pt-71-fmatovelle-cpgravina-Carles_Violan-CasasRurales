import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { MainCarousel } from "../component/mainCarousel";
import { HouseCard } from "../component/houseCard";
import { LoadingSpinner } from "../component/loadingSpinner";
import { Title } from "../component/Title";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    actions.getAllHouses();
  }, []);

  // Controlador de cambio de destino
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  // Filtrar las casas según el destino seleccionado
  const filteredHouses = store.houses.filter((house) => {
    if (destination.toLowerCase() === "barcelona") {
      return (
        house.name.toLowerCase() === "sunny cottage" ||
        house.name.toLowerCase() === "quiet farmhouse" ||
        house.name.toLowerCase() === "cozy villa"
      );
    } else if (destination.toLowerCase() === "valencia") {
      return (
        house.name.toLowerCase() === "quiet cabin" ||
        house.name.toLowerCase() === "rustic house" ||
        house.name.toLowerCase() === "sunset villa"
      );
    } else if (destination.toLowerCase() === "madrid") {
      return (
        house.name.toLowerCase() === "cozy cave house" ||
        house.name.toLowerCase() === "urban retreat" ||
        house.name.toLowerCase() === "quiet corner"
      );
    }
    return true; // Si no se selecciona un destino, mostrar todas las casas
  });

  if (!store.houses || store.houses.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <MainCarousel />

      <div className="container mt-5" className="container">
        <Title title="Experience the beauty of rural life" />
        <br></br>

        {/* Selector de destino */}
        <div className="mb-4">
          <label htmlFor="destination" className="form-label">
            Select a destination:
          </label>
          <select
            id="destination"
            className="form-select"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="">All Destinations</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Valencia">Valencia</option>
            <option value="Madrid">Madrid</option>
          </select>
        </div>

        {/* Cards de casas filtradas */}
        <div className="row">
          {filteredHouses.length > 0 ? (
            filteredHouses.map((house, index) => (
              <HouseCard key={index} house={house} index={index} />
            ))
          ) : (
            <p>No houses found for the selected destination.</p>
          )}
        </div>
      </div>
    </div>
  );
};
