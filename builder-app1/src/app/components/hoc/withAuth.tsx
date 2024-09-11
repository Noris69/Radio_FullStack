import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent, requiredRole) => {
  return function WithAuthComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const role = localStorage.getItem('role');
      if (!role || role !== requiredRole) {
        router.push('/login'); // Redirect to login if role doesn't match
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
