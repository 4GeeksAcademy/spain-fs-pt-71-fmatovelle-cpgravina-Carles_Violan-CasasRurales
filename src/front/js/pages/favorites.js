import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { HouseCard } from "../component/houseCard";

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
      <h1 className="m-5">Your Favorite Houses</h1>
      <div className="row">
        {favoriteHouses.length > 0 ? (
          favoriteHouses.map((house, index) => (
            <HouseCard house={house} index={index} key={house.id} />
          ))
        ) : (
          <p className="m-5">You have no favorite houses yet.</p>
        )}
      </div>
    </div>
  );
};
