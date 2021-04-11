import { createContext } from 'react';
import { isServer } from '../utils/isServer';

const authContext = createContext([]);

export default authContext;
