import App from "./App";
import Home from "./components/home/Home";
import ProductPage from "./components/home/product_page/ProductPage";
import Login from "./components/login/Login";

const routes = [
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/home/:category",
        element: <Home></Home>,
      },
      {
        path: "/home/products/:productId",
        element: <Home></Home>
      }
    ],
  },
];

export default routes;
