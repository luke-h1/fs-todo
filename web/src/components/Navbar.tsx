import React from 'react';
import Link from 'next/link';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const body = null;

  return (
    <>
      <div className="bg-gray-100 w-full mb-10 m-0">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-5 align-center">
              <div className="sm:flex sm:items-center">
                <Link href="/">
                  <a className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
                    Home
                  </a>
                </Link>
              </div>
              {body}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
