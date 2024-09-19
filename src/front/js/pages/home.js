import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { MainCarousel } from "../component/mainCarousel";
import { HouseCard } from "../component/houseCard";
import { LoadingSpinner } from "../component/loadingSpinner";
import { Title } from "../component/Title";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

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
      <div className="container">
        <Title title="Experience the beauty of rural life" />
        {/* cards */}
        <div className="container mt-4">
          <div className="row">
            {store.houses.map((house, index) => (
              <HouseCard key={index} house={house} index={index} />
            ))}
          </div>
          {/* end of cards */}
        </div>
      </div>
    </div>
  );
};