import App from "./App";
import Home from "./components/home/Home";
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
    ],
  },
];

export default routes;
