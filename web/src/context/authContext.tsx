import { createContext } from 'react';
import { isServer } from '../utils/isServer';

const authContext = createContext({
  loading: false,
  accessToken: !isServer() && localStorage.getItem('token'),
});

export default authContext;
