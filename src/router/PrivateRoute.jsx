/** Libraries */
import { Navigate } from "react-router-dom";

/**
 * This is a private route, only the users logged are allowed to access to them.
 * If the "id" of the user exist on store, then the user can pass this middleware.
 */
export const PrivateRoute = ({children, isAutenticated}) => {

    return isAutenticated ? children : <Navigate to="/login" />
};