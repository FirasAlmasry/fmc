import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  if (action.type === 'DELETE_ACCOUNT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
      const user = storageAvailable ? JSON.parse(localStorage.getItem('user')) : '';

      if (accessToken && user) {
        setSession(accessToken);

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });
      const { token: access_token, ...user } = response?.data?.data;
      localStorage.setItem('user', JSON.stringify(user));
      setSession(access_token);
      localStorage.setItem('accessToken', access_token);

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });

      return { status: 'success', message: response?.data?.message || 'Login successful', data: user };
    } catch (error) {
      console.error("🚀 ~ login error:", error);
      return {
        status: 'error',
        message: error?.response?.data?.message || 'رقم الهاتف او كلمة المرور غير صحيحة',
      };
    }
  }, []);

  // REGISTER
  const register = useCallback(async (name, email, password) => {
    const response = await axios.post('/register', {
      name,
      email,
      password
    });

    const { token: access_token, ...user } = response?.data?.data;
    localStorage.setItem('user', JSON.stringify(user));
    setSession(access_token);
    localStorage.setItem('accessToken', access_token);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
    return response
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await axios.post('/logout');
    setSession(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // const deleteAccount = useCallback(async () => {
  //   await axios.delete('/users/delete');
  //   setSession(null);
  //   localStorage.removeItem('user');
  //   dispatch({
  //     type: 'DELETE_ACCOUNT',
  //   });
  // }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
