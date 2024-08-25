import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,

    },
    
    actions: {
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      login: async (userName, email, password, navigate) => {
        const bodyData = {
            userName,
            email,
            password,
        };
        try {
            const res = await axios.post(
                `${process.env.BACKEND_URL}/api/login`,
                bodyData
            );
            console.log("Response received:", res);
    
            if (res.status === 200) {
                const { access_token } = res.data;
                localStorage.setItem("accessToken", access_token);
                await getActions().getCurrentUser();
                navigate("/protected");
                return true;
            } else {
                console.log("Login failed with status", res.status);
                return false;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Invalid credentials");
            } else if (error.response && error.response.status === 400) {
                console.log("Bad request, check the sent data", error.response.data);
            } else {
                console.log("Error during login", error);
            }
            return false;
        }
    },

    getCurrentUser: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
          console.log("No token found");
          return false;
      }
      try {
          const res = await axios.get(
              `${process.env.BACKEND_URL}/api/traveler/profile`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              }
          );

          if (res.status === 200) {
              const userData = res.data;
              setStore({ currentUser: userData });
              return true;
          } else {
              console.log("Failed to fetch user data, status:", res.status);
              return false;
          }
      } catch (error) {
          if (error.response) {
              console.log("Error fetching user data:", error.response.data);
          } else {
              console.log("Error during fetching user data:", error);
          }
          return false;
      }
  },
      register: async (userName, email, password, navigate) => {
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
                console.log("User successfully registered:", res.data);
                navigate("/login");
                return true;
            } else {
                console.log("Unexpected response status during registration:", res.status);
                return false;
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    console.log("Error: Email already in use");
                } else if (error.response.status === 400) {
                    console.log("Error: Bad request", error.response.data);
                } else {
                    console.log("Error during registration", error.response.data);
                }
            } else {
                console.log("Error during registration: Network or unknown error", error);
            }
            return false;
        }
    },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
    },
  };
};

export default getState;
