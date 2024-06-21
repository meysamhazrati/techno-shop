import App from "./App";
import Root from "./pages/root/Root";
import Home from "./pages/root/Home";
import Categories from "./pages/root/Categories";
import Category from "./pages/root/Category";
import Brands from "./pages/root/Brands";
import Brand from "./pages/root/Brand";
import Products from "./pages/root/Products";
import Product from "./pages/root/Product";
import Articles from "./pages/root/Articles";
import Article from "./pages/root/Article";
import Offers from "./pages/root/Offers";
import Offer from "./pages/root/Offer";
import Cart from "./pages/root/Cart";
import Authentication from "./pages/authentication/Authentication";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import ResetPassword from "./pages/authentication/ResetPassword";
import Me from "./pages/me/Me";
import Dashboard from "./pages/me/Dashboard";
import Profile from "./pages/me/Profile";
import Addresses from "./pages/me/Addresses";
import Orders from "./pages/me/Orders";
import Order from "./pages/me/Order";
import Favorites from "./pages/me/Favorites";
import Comments from "./pages/me/Comments";
import Tickets from "./pages/me/Tickets";
import Ticket from "./pages/me/Ticket";
import Admin from "./pages/admin/Admin";
import Dashboard_ from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import User from "./pages/admin/User";
import Addresses_ from "./pages/admin/Addresses";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

export default [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Root />,
        children: [
          { index: true, element: <Home /> },
          { path: "categories", element: <Categories /> },
          { path: "categories/:title", element: <Category /> },
          { path: "brands", element: <Brands /> },
          { path: "brands/:name", element: <Brand /> },
          { path: "products", element: <Products /> },
          { path: "products/:id", element: <Product /> },
          { path: "articles", element: <Articles /> },
          { path: "articles/:id", element: <Article /> },
          { path: "offers", element: <Offers /> },
          { path: "offers/:title", element: <Offer /> },
          { path: "cart", element: <Cart /> },
        ],
      },
      {
        path: "authentication",
        element: <Authentication />,
        children: [
          { index: true, element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "login", element: <Login /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },
      {
        path: "me",
        element: <Me />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "addresses", element: <Addresses /> },
          { path: "orders", element: <Orders /> },
          { path: "orders/:id", element: <Order /> },
          { path: "favorites", element: <Favorites /> },
          { path: "comments", element: <Comments /> },
          { path: "tickets", element: <Tickets /> },
          { path: "tickets/:id", element: <Ticket /> },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          { index: true, element: <Dashboard_ /> },
          { path: "users", element: <Users /> },
          { path: "users/:id", element: <User /> },
          { path: "addresses", element: <Addresses_ /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];