import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ route, children, allowRoles }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth?.authChecked) return <p>Loading...</p>;
  if (
    auth.isAuthenticated &&
    allowRoles &&
    !allowRoles.includes(auth?.user?.role)
  ) {
    return <Navigate to={`/`} replace />;
  }
  // If authenticated, render provided children (when used as wrapper)
  if (auth.isAuthenticated) return children ? children : <Outlet />;

  // ${route || "/"}

  // Not authenticated -> redirect to provided route (or root)
  return <Navigate to={`${route || "/"}`} replace />;
};

export default PrivateRoute;
