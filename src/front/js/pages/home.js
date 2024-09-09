import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { MainCarousel } from "../component/mainCarousel";
import { HouseCard } from "../component/houseCards";
import { LoadingSpinner } from "../component/loadingSpinner";
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
      <div>
        <h1 className="ms-5">Experience the beauty of rural life</h1>
        {/* cards */}
        <div className="container mt-5">
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



