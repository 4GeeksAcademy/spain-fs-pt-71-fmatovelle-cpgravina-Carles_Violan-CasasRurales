import React, { useState } from "react";
import { Navbar } from "../component/navbar/index";
import { Home } from "../pages/home";

export const MainPage = () => {
  // Estado para almacenar la ciudad seleccionada
  const [destination, setDestination] = useState(""); // Estado inicial es una cadena vacía

  return (
    <div>
      {/* Paso la función setDestination para que el Navbar actualice la ciudad */}
      <Navbar setDestination={setDestination} />
      
      {/* Paso el valor de la ciudad seleccionada al componente Home */}
      <Home destination={destination} />
    </div>
  );
};
