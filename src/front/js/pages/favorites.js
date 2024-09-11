import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { HouseCard } from "../component/houseCard";
import { Title } from "../component/Title";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadFavorites();
  }, []);

  const favoriteHouses = store.houses.filter((house) =>
    store.favorites.includes(house.id)
  );

  return (
    <div className="container mt-4">
      <Title title="Your favorite houses" />
      <div className="row">
        {favoriteHouses.length > 0 ? (
          favoriteHouses.map((house, index) => (
            <HouseCard house={house} index={index} key={house.id} />
          ))
        ) : (
          <Title subtitle="You have no favorite houses yet." />
        )}
      </div>
    </div>
  );
};
