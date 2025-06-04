import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState } from '../../services/slices/users';
import { loginUser } from '../../services/slices/users/user-slice';
import { AppDispatch } from 'src/services/store';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const errMessage = useSelector(getUserState).userLoginError;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error('Login failed:', err);
      });
  };

  return (
    <LoginUI
      errorText={errMessage?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
