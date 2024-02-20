import App from "./App";
import NotFound from "./components/NotFound";
import Root from "./pages/root/Root";
import Home from "./pages/root/Home";

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Root />,
        children: [
          { index: true, element: <Home /> }
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];