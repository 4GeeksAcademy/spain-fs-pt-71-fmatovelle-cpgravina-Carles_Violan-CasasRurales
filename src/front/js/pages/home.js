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
  const handleDestinationChange = (value) => {
    setDestination(value);
  };

  // Filtrar las casas según el destino seleccionado
  const filteredHouses = store.houses.filter((house) => {
    if (destination.toLowerCase() === "barcelona") {
      return (
        house.city.toLowerCase() === "barcelona"
       
      );
    } else if (destination.toLowerCase() === "valencia") {
      return (
        house.city.toLowerCase() === "valencia"
      );
    } else if (destination.toLowerCase() === "madrid") {
      return (
       house.city.toLowerCase() === "madrid"
      );
    } else if (destination.toLowerCase() === "bilbao") {
      return house.city.toLowerCase() === "bilbao"
    } else if (destination.toLowerCase() === "zaragoza") {
      return house.city.toLowerCase() === "zaragoza"
    } else if (destination.toLowerCase() === "malaga") {
      return house.city.toLowerCase() === "malaga"
    }
    return true; // Si no se selecciona un destino, mostrar todas las casas
  });

  if (!store.houses || store.houses.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <MainCarousel />

      <div className="container mt-5">
        <Title title="Experience the beauty of rural life" />
        <br />

        {/* Dropdown de destino con botón verde */}
        <div className="dropdown mb-4">
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select a destination
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDestinationChange("")}
              >
                All Destinations
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDestinationChange("Barcelona")}
              >
                Barcelona
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDestinationChange("Valencia")}
              >
                Valencia
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDestinationChange("Madrid")}
              >
                Madrid
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDestinationChange("Zaragoza")}
              >
                Zaragoza
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDestinationChange("Bilbao")}
              >
                Bilbao
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDestinationChange("Malaga")}
              >
                Málaga
              </button>
            </li>
          </ul>
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
