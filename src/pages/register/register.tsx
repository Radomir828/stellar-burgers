import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserState,
  registerUser
} from '../../services/slices/users/user-slice';
import type { AppDispatch } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const errMessage = useSelector(getUserState).userRegisterError;

  // console.log('errMessage', errMessage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error('Registration failed:', err);
      });
  };

  return (
    <RegisterUI
      errorText={errMessage?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
