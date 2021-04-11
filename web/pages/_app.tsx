import { useEffect, useState } from 'react';
import { API_URL } from '../src/constants/API';
import { AuthState } from '../src/context/AuthState';
import { setAccessToken } from '../src/utils/accessToken';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </>
  );
}

export default MyApp;
