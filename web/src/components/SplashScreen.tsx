import React from 'react';

export const SplashScreen: React.FC<{}> = () => {
  return (
    <>
      <div className="flex flex-col align-center items-center h-50">
        <div className="mt-96">
          <h1 className="text-2xl mb-4">Login with Github</h1>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">
          Login with Github
        </button>
      </div>
    </>
  );
};
