import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import About from "./components/Layout/Layout";
import Carts from "./components/Carts/Carts";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NotFound from "./components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  useEffect(() => {
    if (localStorage.getItem("Token") !== null) {
      saveUserData();
    }
  }, []);

  let [userData, setUserData] = useState(null);
  let [userName, setUserName] = useState("");

  function saveUserData() {
    let encodedToken = localStorage.getItem("Token");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    setUserName(localStorage.getItem("UserName"));
  }

  let routers = createBrowserRouter([
    {
      path: "",
      element: (
        <Layout
          userName={userName}
          setUserData={setUserData}
          userData={userData}
        />
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "carts",
          element: (
            <ProtectedRoute>
              <Carts />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register setUserName={setUserName} /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={routers} />;
    </Provider>
  );
}

export default App;
