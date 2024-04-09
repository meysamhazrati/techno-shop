import App from "./App";
import Root from "./pages/root/Root";
import Home from "./pages/root/Home";
import Categories from "./pages/root/Categories";
import Category from "./pages/root/Category";
import NotFound from "./pages/NotFound";

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Root />,
        children: [
          { index: true, element: <Home /> },
          { path: "categories", element: <Categories /> },
          { path: "categories/:title", element: <Category /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];