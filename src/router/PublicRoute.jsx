/** Libraries */
import { Navigate } from "react-router-dom";

/**
 * This is a public route, only the users unlogged are allowed to access to them.
 * If the "id" of the user doesn't exist on store, then the user can pass 
 * this middleware.
 */
export const PublicRoute = ({children, isAutenticated}) => {


    return !isAutenticated ? children : <Navigate to="/" />
};