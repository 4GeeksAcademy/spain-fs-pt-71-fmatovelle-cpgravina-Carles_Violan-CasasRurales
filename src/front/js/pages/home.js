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
