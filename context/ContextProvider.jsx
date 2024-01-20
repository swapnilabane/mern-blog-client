import { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const getUserFromLocalStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || null;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null;
  }
};

const INITIAL_STATE = {
  user: getUserFromLocalStorage(),
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const updateUserInLocalStorage = (user) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user data in localStorage:', error);
    }
  };

  const dispatchWithLocalStorageUpdate = (action) => {
    dispatch(action);

    if (action.type === 'LOGIN_SUCCESS' || action.type === 'LOGOUT') {
      updateUserInLocalStorage(state.user);
    }
  };

  const logout = () => {
    dispatchWithLocalStorageUpdate({ type: 'LOGOUT' });
  };

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch: dispatchWithLocalStorageUpdate,
        logout: logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
