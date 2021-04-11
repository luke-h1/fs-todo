import { AuthState } from '../src/context/auth/AuthState';
import { TodoState } from '../src/context/todo/TodoState';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <AuthState>
        <TodoState>
          <Component {...pageProps} />
        </TodoState>
      </AuthState>
    </>
  );
};

export default MyApp;
