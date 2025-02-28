import App from "./App";
import ErrorPage from "./components/errorPage/ErrorPage";
import Home from "./components/home/Home";
import Login from "./components/login/Login";

const routes = [
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage> ,
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
