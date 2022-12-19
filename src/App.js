import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//App imports
import { routes } from "./routes";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
