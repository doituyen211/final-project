import {jwtDecode} from "jwt-decode";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('authToken');

    let isAuthenticated = false;
    let userRole = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);

            userRole = decodedToken.role;
            console.log("User Role:", userRole);

            const currentTime = Date.now() / 1000;
            isAuthenticated = decodedToken.exp > currentTime;
        } catch (error) {
            console.error("Invalid token", error);
        }
    }

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }
    
    // //
    // // if (userRole === 'ADMIN') {
    // //     return <AdminLayout>{children}</AdminLayout>;
    // // } else if (userRole === 'USER') {
    // //     return <UserLayout>{children}</UserLayout>;
    // // } else {
    // //     return <Navigate to="/login"/>;
    // // }
    return children
};


export default PrivateRoute;
