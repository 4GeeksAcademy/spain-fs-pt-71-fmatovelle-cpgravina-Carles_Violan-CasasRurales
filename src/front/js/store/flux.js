import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      currentUser: null,
      isLoggedIn: false,
      isLoadingUser: true,
      bookingDetails: {
        house: null,
        startDate: null,
        endDate: null,
      },
      houses: [],
      favorites: [],
    },

    actions: {
     
      addFavorite: (houseId) => {
        const store = getStore();
        const updatedFavorites = [...store.favorites, houseId];
        setStore({ favorites: updatedFavorites });

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      },


      removeFavorite: (houseId) => {
        const store = getStore();
        const updatedFavorites = store.favorites.filter(id => id !== houseId);
        setStore({ favorites: updatedFavorites });

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      },

      isFavorite: (houseId) => {
        const store = getStore();
        return store.favorites.includes(houseId);
      },

      loadFavorites: () => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          setStore({ favorites: JSON.parse(storedFavorites) });
        }
      },

      login: async (userName, password) => {
        const bodyData = {
          userName,
          password,
        };
        try {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/login`,
            bodyData
          );

          if (res.status === 200) {
            const { access_token, role } = res.data;
            localStorage.setItem("accessToken", access_token);
            await getActions().getCurrentUser();

            return { success: true, role };
          } else {
            return { success: false };
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
          } else if (error.response && error.response.status === 400) {
          } else {
          }
          return false;
        }
      },

      getCurrentUser: async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          return false;
        }
        try {
          const res = await axios.get(
            `${process.env.BACKEND_URL}/api/traveler/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.status === 200) {
            const userData = res.data;
            setStore({
              currentUser: userData,
              isLoadingUser: false,
              isLoggedIn: true,
            });
            return true;
          } else {
            localStorage.removeItem("accessToken");
            setStore({
              currentUser: null,
              isLoadingUser: false,
              isLoggedIn: false,
            });
            return false;
          }
        } catch (error) {
          localStorage.removeItem("accessToken");
          setStore({
            currentUser: null,
            isLoadingUser: false,
            isLoggedIn: false,
          });
          if (error.response) {
          } else {
          }
          return false;
        }
      },

      register: async (userName, email, password) => {
        const bodyData = {
          userName,
          email,
          password,
        };
        try {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/register`,
            bodyData
          );
          if (res.status === 200 || res.status === 201) {
            return { success: true };
          } else {
            return { success: false, message: "Unexpected response status" };
          }
        } catch (error) {
          let errorMessage =
            "Error during registration: Network or unknown error";

          if (error.response) {
            if (error.response.status === 409) {
              errorMessage = "Email already in use";
            } else if (error.response.status === 400) {
              errorMessage = "Bad request: " + error.response.data.message;
            } else {
              errorMessage = "Error: " + error.response.data.message;
            }
          } else {
          }

          return { success: false, message: errorMessage };
        }
      },

      logout: async () => {
        try {
          localStorage.removeItem("accessToken");
          setStore({ currentUser: null });
          return true;
        } catch (error) {
          if (error.response) {
          } else {
          }
          return false;
        }
      },

      submitFeedback: async (name, email, ratings, message) => {
        const bodyData = { name, email, ratings, message };
        try {
          const response = await axios.post(
            `${process.env.BACKEND_URL}/api/submit-feedback`,
            bodyData
          );

          if (response.status === 200 || response.status === 201) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      },

      getAllHouses: async () => {
        try {
          const response = await axios.get(
            `${process.env.BACKEND_URL}/api/houses`
          );
          if (response.status === 200) {
            setStore({ houses: response.data });
            return response.data;
          } else {
            return [];
          }
        } catch (error) {
          return [];
        }
      },

      setBookingDetails: (house, startDate, endDate) => {
        setStore({
          bookingDetails: {
            house,
            startDate,
            endDate,
          },
        });
      },

      clearBookingDetails: () => {
        setStore({
          bookingDetails: {
            house: null,
            startDate: null,
            endDate: null,
          },
        });
      },
    },
  };
};

export default getState;
