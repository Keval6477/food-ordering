import Login from "./auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./auth/Signup";
import ForgetPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import Navbar from "./shared/Navbar";
import HeroSection from "./components/component/HeroSection";
import MainLayout from "./Layout/MainLayout";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
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
