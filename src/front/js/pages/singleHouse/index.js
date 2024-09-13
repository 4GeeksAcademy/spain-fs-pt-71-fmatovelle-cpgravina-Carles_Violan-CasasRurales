import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext"; // Corrected path to appContext
import { BookingForm } from "../../component/bookingForm"; // Corrected path to BookingForm
import { Title } from "../../component/Title"; // Corrected path to Title
import { HouseImageGallery } from "../../component/houseImageGallery"; // Corrected path to HouseImageGallery
import { HouseFeatures } from "../../component/houseFeatures"; // Corrected path to HouseFeatures
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import Map, { Marker } from "react-map-gl";
import "./styles.css";

export const SingleHouse = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [house, setHouse] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function handleHouses() {
      // Buscar la casa específica según el id en los params
      const selectedHouse = store.houses.find(
        (h) => h.id === parseInt(params.theid)
      );
      setHouse(selectedHouse);
    }
    const withHouses = store.houses.length > 0;
    if (withHouses) {
      handleHouses()
      setIsLoading(false)
    } else {
      actions.getAllHouses();
    }
  }, [store.houses]);


  // API key de Mapbox
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiY2FybGVzdmlvbGFuIiwiYSI6ImNtMHMwejZzODBmc2Yya3I1azU1dzZmM2EifQ.TFTp78EGCVDPE1wNttKiIw"; // Reemplaza con tu clave de Mapbox

  useEffect(() => {
    // Buscar la casa específica según el id en los params
    const selectedHouse = store.houses.find(
      (h) => h.id === parseInt(params.theid)
    );
    const latitude = house?.latitude ? parseFloat(house.latitude) : 0;
    const longitude = house?.longitude ? parseFloat(house.longitude) : 0;
    setHouse(selectedHouse);
  }, [store.houses, params.theid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const images = [
    house.image1,
    house.image2,
    house.image3,
    house.image4,
  ].filter(Boolean);

  const isFavorite = actions.isFavorite(house.id);

  const toggleFavorite = (event) => {
    event.preventDefault(); // Prevent default link behavior
    if (isFavorite) {
      actions.removeFavorite(house.id);
    } else {
      actions.addFavorite(house.id);
    }
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <Title title={house.name} subtitle={house.address} />
        <div className="ms-2">
          <i
            className={`fa-${isFavorite ? "solid" : "regular"} fa-heart fs-3`}
            style={{ color: isFavorite ? "red" : "black", cursor: "pointer" }}
            onClick={toggleFavorite}
          ></i>
        </div>

        <HouseImageGallery images={images} />

        <HouseFeatures features={house.features} />

        <Link to="/">
          <span
            className="btn search-button text-start"
            role="button"
            style={{ marginBottom: "30px", float: "right" }}
          >
            Back home
          </span>
        </Link>

        <hr className="my-4" />

        {/* Mapa de Mapbox */}
        <h3>Location</h3>
        <div style={{ height: "400px", width: "100%", marginBottom: "100px" }}>
          <Map
            initialViewState={{
              longitude: house.longitude, // Usar la longitud de la casa
              latitude: house.latitude, // Usar la latitud de la casa
              zoom: 12, // Nivel de zoom del mapa
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11" // Estilo del mapa
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {/* Marcador para la ubicación de la casa */}
            <Marker latitude={house.latitude} longitude={house.longitude}>
              <div>
              </div>
            </Marker>
          </Map>
        </div>
      </div>
      <div className="mt-5">
        <BookingForm house={house} />
      </div>
    </div>
  );
};

SingleHouse.propTypes = {
  match: PropTypes.object,
};