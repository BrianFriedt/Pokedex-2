import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useValue = () => {
  const [returnPage, setReturnPage] = useState(1);
  return {
    returnPage,
    setReturnPage,
  };
};

const ReturnPageContext = createContext({} as ReturnType<typeof useValue>);

const ReturnPageProvider = (props: PropsWithChildren<{}>) => {
  return <ReturnPageContext.Provider value={useValue()} {...props} />;
};

const useReturnPage = () => useContext(ReturnPageContext);

export { ReturnPageProvider, useReturnPage };
