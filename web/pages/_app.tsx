import { AuthState } from '../src/context/AuthState';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </>
  );
}

export default MyApp;
