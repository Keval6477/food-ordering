import "./App.css";
import Login from "./auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./shared/Layout";
import Signup from "./auth/Signup";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={appRouter}></RouterProvider>
        {/* <Login /> */}
      </div>
    </>
  );
}

export default App;
