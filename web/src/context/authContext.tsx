import { createContext } from 'react';

const authContext = createContext({
  loading: false,
});

export default authContext;
