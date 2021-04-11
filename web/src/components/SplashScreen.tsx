import React, { useContext } from 'react';
import AuthContext from '../context/authContext';

interface SplashScreenProps {}

export const SplashScreen: React.FC<SplashScreenProps> = () => {
  const authContext = useContext(AuthContext);

  const { loading, login } = authContext;

  return (
    <>
      {loading && <h1 className="text-2xl">Loading</h1>}
      <div className="flex flex-col align-center items-center h-50">
        <div className="mt-96">
          <h1 className="text-2xl mb-4">Login with Github</h1>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={async () => login()}>
          Login with Github
        </button>
      </div>
    </>
  );
};
