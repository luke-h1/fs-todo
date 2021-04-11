import React from 'react';

interface WrapperProps {
children: React.ReactNode
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col align-center items-center place-items-center">
      {children}
    </div>
  );
};
