import { Preloader } from '@ui';
import { get } from 'http';
import { useSelector } from '@store';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser, getUserState } from '../../services/slices/users';

interface ProtectedRouteProps {
  children: React.ReactElement;
  isPublic?: boolean;
}

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const { isUserChecked } = useSelector(getUserState);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isUserChecked) {
    return <Preloader />;
  }

  if (!isPublic && (user.email === '' || user.name === '')) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isPublic && user.email && user.name) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
