import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      currentUser: null,
      adminContent: null,
    },
    
    actions: {
      login: async (userName, password, navigate) => {
        const bodyData = {
            userName,
            password,
        };
        try {
            const res = await axios.post(
                `${process.env.BACKEND_URL}/api/login`,
                bodyData
            );
            console.log("Response received:", res);
    
            if (res.status === 200) {
                const { access_token, role } = res.data;
                localStorage.setItem("accessToken", access_token);
                await getActions().getCurrentUser();
    
                if (role === 'admin') {
                    // Redirect to the backend /admin URL
                    window.location.href = `${process.env.BACKEND_URL}admin/`;
                } else {
                    navigate("/protected");
                }
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

      logout: async (navigate) => {
        try {
            localStorage.removeItem('accessToken');
            setStore({ currentUser: null });
            console.log("User logged out successfully");
    
            // Confirm the navigate function is being called
            console.log("Navigating to home...");
            navigate('/'); 
            console.log("Navigation should have occurred");
    
            return true; 
        } catch (error) {
            if (error.response) {
                console.error("Error during logout:", error.response.data);
            } else {
                console.error("Logout failed due to an unexpected error:", error);
            }
            return false;  
        }
    },

      submitFeedback: async (name, email, ratings, message) => {
        const bodyData = { name, email, ratings, message };
        try {
          console.log('Submitting feedback:', bodyData);
          const response = await axios.post(`${process.env.BACKEND_URL}/api/submit-feedback`, bodyData);
      
          console.log('Response received:', response);
          
          if (response.status === 200 || response.status === 201) {
            return true; 
          } else {
            console.error('Feedback submission failed:', response.statusText);
            return false; 
          }
        } catch (error) {
          console.error('Error during feedback submission:', error.response ? error.response.data : error.message);
          return false;
        }
      },

      getAllHouses: async () => {
        try {
            const response = await axios.get(`${process.env.BACKEND_URL}/api/houses`);
            if (response.status === 200) {
              setStore({ houses: response.data });
              return response.data;
            } else {
              console.error('Failed to fetch houses data, status:', response.status);
              return [];
            }
          } catch (error) {
            console.error('Error fetching houses data:', error.response ? error.response.data : error.message);
            return [];
          }
      },
    },
  };
};

export default getState;
