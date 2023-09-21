import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
    children: React.ReactNode;
}

const AuthChecker = ({ children }: Props) => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
            console.log(user);
            
        }
    }, [isLoading, isAuthenticated, user, loginWithRedirect]);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            console.log(user);
            navigate('/dashboard');
        }
    }, [isLoading, isAuthenticated, user, navigate]);
    return (
        <>{children}</>
    );
};

export default AuthChecker;