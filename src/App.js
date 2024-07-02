import "./App.scss";
import { useState, useEffect } from "react";
import RootLayout from "./components/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Shop from "./routes/Shop";
import Cart from "./routes/Cart";
import React from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";


function App() {
  const [products, setProducts] = useState([]);
  const { width } = useWindowDimensions();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Shop products={products} />,
        },
        {
          path: "/cart",
          element: <Cart/>,
        },
      ],
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
        );
        if (!response.ok) {
          throw new Error("Response was not OK");
        }
        let data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    }

    fetchData();
  }, []);

  return (
    <div className={`App ${
      width <= 767 ? `mobile` : width <= 1024 ? `tablet` : `desktop`
    }`}>
      <Provider store={store}>
        <RouterProvider router={router}  />
      </Provider>
    </div>
  );
}

export default App;
