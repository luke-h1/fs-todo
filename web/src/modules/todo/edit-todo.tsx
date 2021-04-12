/* eslint-disable radix */
import { useRouter } from 'next/router';
import React from 'react';

export const EditTogoPage: React.FC<{}> = () => {
  const router = useRouter();
  const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

  return (
    <>
      <h1 className="text-3xl">
        todo id is:
        {intId}
      </h1>
    </>
  );
};
