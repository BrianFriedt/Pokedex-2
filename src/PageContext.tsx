import React, { createContext, useState } from 'react';

const PageContextt = () => {
  const [returnPage, setReturnPage] = useState('1');

  const PageContext = createContext({
    returnPage: returnPage,
    setReturnPage: (newPage: string) => {
      setReturnPage(newPage);
      console.log(newPage);
    },
  });
  return PageContext;
};
export default PageContextt;
