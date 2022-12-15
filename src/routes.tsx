import { Login } from "./pages/Login";
import { ComingSoon } from "./pages/ComingSoon";

export const routes = [
  {
    path: "/",
    element: <ComingSoon />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
