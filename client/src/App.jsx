import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AuthLayout from "./layout/authLayout";
import Signup from "./pages/signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<h2>Home Page</h2>} />
      <Route element={<AuthLayout />}>
        <Route path="/singup" element={<Signup />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
