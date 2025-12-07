import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import GetStarted from "./pages/GetStarted";
import PrivateRoute from "./components/common/PrivateRoutes";
import PageNotFound from "./components/error/PageNotFound";
import { ToastContainer } from "react-toastify";
import UserHome from "./pages/UserHome.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import { useLoadUserQuery } from "./features/auth/authApi.js";
import RootRedirect from "./utils/RootRedirect.jsx";

function App() {
  const { isLoading } = useLoadUserQuery();
  return (
    <div>
      <Routes>
        <Route index={true} element={<RootRedirect isLoading={isLoading} />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route
          path="/user"
          element={
            <PrivateRoute route="/login" allowRoles={["user"]}>
              <UserHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/captain"
          element={
            <PrivateRoute route={"/captain-login"} allowRoles={["captain"]}>
              <CaptainHome />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />

        {
          // for catch the 404 errors
        }
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
