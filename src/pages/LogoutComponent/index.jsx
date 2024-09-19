import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function LogoutComponent() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the authentication token
        localStorage.removeItem('authToken');

        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    return null;
}

export default LogoutComponent;

