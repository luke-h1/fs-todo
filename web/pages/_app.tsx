import { AuthState } from '../src/context/AuthState';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </>
  );
}

export default MyApp;
