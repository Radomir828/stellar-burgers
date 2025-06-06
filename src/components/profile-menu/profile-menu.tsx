import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
// import { AppDispatch, useDispatch } from '@store';
import { log } from 'console';
import { logoutUser } from '../../services/slices/users';
import { useDispatch } from '@store';
import { AppDispatch } from '@store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
