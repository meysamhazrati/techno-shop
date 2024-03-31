import App from "./App";
import NotFound from "./components/NotFound";
import Root from "./pages/root/Root";
import Home from "./pages/root/Home";
import Categories from "./pages/root/Categories";

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
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];