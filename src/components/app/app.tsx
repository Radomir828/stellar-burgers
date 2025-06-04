import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients';
import { AppDispatch } from 'src/services/store';
import { fetchUser } from '../../services/slices/users';

const App = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = () => navigate(-1);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />

          <Route
            path='/login'
            element={
              <ProtectedRoute isPublic>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path='/register'
            element={
              <ProtectedRoute isPublic>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute isPublic>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path='/reset-password'
            element={
              <ProtectedRoute isPublic>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path='*'
            element={
              <div className={styles.detailPageWrap}>
                <NotFound404 />
              </div>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали ингредиентов
                </p>
                <IngredientDetails />
              </div>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали заказа
                </p>
                <OrderInfo />
              </div>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали заказа
                </p>
                <OrderInfo />
              </div>
            }
          />
        </Routes>
        {/*--------------- Модалки------------------------------- */}
        {backgroundLocation && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='Детали заказа' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />

            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />

            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal title='Детали заказа' onClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
