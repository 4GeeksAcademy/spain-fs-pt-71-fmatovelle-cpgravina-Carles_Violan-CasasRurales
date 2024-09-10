import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { BookingForm } from "../component/bookingForm";
import Map, { Marker } from "react-map-gl";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [house, setHouse] = useState(null);


  // API key de Mapbox
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2FybGVzdmlvbGFuIiwiYSI6ImNtMHMwejZzODBmc2Yya3I1azU1dzZmM2EifQ.TFTp78EGCVDPE1wNttKiIw'; // Reemplaza con tu clave de Mapbox
  
  useEffect(() => {
    // Buscar la casa específica según el id en los params
    const selectedHouse = store.houses.find(h => h.id === parseInt(params.theid));
    const latitude = house?.latitude ? parseFloat(house.latitude) : 0;
    const longitude = house?.longitude ? parseFloat(house.longitude) : 0;
    setHouse(selectedHouse);
  }, [store.houses, params.theid]);

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
    <div className="jumbotron">
      <h1 className="display-4">{house.name}</h1>
      <p className="lead">{house.address}</p>

      {/* Galería de imágenes en formato grid */}
      <div className="row my-3">
        {house.image1 && (
          <div className="col-6 col-md-3 mb-3">
            <img src={house.image1} className="img-fluid" alt="House 1" />
          </div>
        )}
        {house.image2 && (
          <div className="col-6 col-md-3 mb-3">
            <img src={house.image2} className="img-fluid" alt="House 2" />
          </div>
        )}
        {house.image3 && (
          <div className="col-6 col-md-3 mb-3">
            <img src={house.image3} className="img-fluid" alt="House 3" />
          </div>
        )}
        {house.image4 && (
          <div className="col-6 col-md-3 mb-3">
            <img src={house.image4} className="img-fluid" alt="House 4" />
          </div>
        )}
      </div>

      <h3>Features</h3>
      <ul>
        <li>Square Meters: {house.features?.square_meters}</li>
        <li>Bedrooms: {house.features?.bedrooms}</li>
        <li>Bathrooms: {house.features?.bathrooms}</li>
        <li>Has Pool: {house.features?.has_pool ? "Yes" : "No"}</li>
        <li>Has Parking: {house.features?.has_parking ? "Yes" : "No"}</li>
      </ul>
      <Link to="/">
        <span className="btn btn-primary btn-lg" role="button" style={{marginBottom: "30px", float: "right" }}>
          Back home
        </span>
      </Link>

        <hr className="my-4" />

         {/* Mapa de Mapbox */}
         <h3>Location</h3>
        <div style={{ height: "400px", width: "100%", marginBottom: "100px" }}>
          <Map
            initialViewState={{
              longitude: house.longitude,  // Usar la longitud de la casa
              latitude: house.latitude,    // Usar la latitud de la casa
              zoom: 12,                    // Nivel de zoom del mapa
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11" // Estilo del mapa
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {/* Marcador para la ubicación de la casa */}
            <Marker latitude={house.latitude} longitude={house.longitude}>
              <div>
                <span role="img" aria-label="marker">🏡</span>
              </div>
            </Marker>
          </Map>
        </div>

        {/* <Link to="/">
          <span className="btn btn-lg static-btn" href="#" role="button">
            Back home
          </span>
        </Link> */}
      </div>
      <div className="mt-5">
        <BookingForm house={house} />
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
