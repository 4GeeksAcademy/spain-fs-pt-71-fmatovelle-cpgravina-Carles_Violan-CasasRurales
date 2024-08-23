import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a function
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      login: async (email, password, navigate) => {
        const bodyData = {
          email,
          password,
        };
        try {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/login`,
            bodyData
          );
          const { access_token } = res.data;
          if (access_token) {
            localStorage.setItem("accessToken", access_token);
            await getActions().getCurrentUser(); // Obtain the current user after login
            navigate("/protected"); // Redirect to the protected page
            return true;
          }
          return false;
        } catch (error) {
          console.log("Error during login", error);
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
          if (res.status === 200) {
            navigate("/login"); // Redirect to login after a successful registration
            return true;
          }
          return false;
        } catch (error) {
          console.log("Error during registration", error);
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

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
