import Link from 'next/link';
import React, { useContext } from 'react';
import authContext from '../context/authContext';

export const IndexPage: React.FC<{}> = () => {
  const AuthContext = useContext(authContext);
  const { user, token } = AuthContext;
  return (
    <>
      {!user && !token ? (
        <div className="flex flex-col align-center items-center h-50">
          <div className="mt-96">
            <h1 className="text-2xl mb-4">Register</h1>
          </div>
          <Link href="/register">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4" type="button">
              Register
            </button>
          </Link>
          <h1 className="text-2xl mb-4">Already a user ? </h1>
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <h1>you're logged in 😎</h1>
      )}
    </>
  );
};
