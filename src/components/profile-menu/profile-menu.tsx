import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
// import { AppDispatch, useDispatch } from 'src/services/store';
import { log } from 'console';
import { logoutUser } from '../../services/slices/users';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
