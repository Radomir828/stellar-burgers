import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUser } from '../../services/slices/users';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(getUser).name} />
);
