import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useValue = () => {
  const [returnPage, setReturnPage] = useState<string>('1');
  return {
    returnPage,
    setReturnPage,
  };
};

const PageContext = createContext({} as ReturnType<typeof useValue>);

const PageProvider = (props: PropsWithChildren<{}>) => {
  return <PageContext.Provider value={useValue()} {...props} />;
};

const useReturnPage = () => useContext(PageContext);

export { PageProvider, useReturnPage };
