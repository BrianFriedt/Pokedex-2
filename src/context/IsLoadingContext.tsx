import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useValue = () => {
  const [isLoading, setIsLoading] = useState(true);
  return {
    isLoading,
    setIsLoading,
  };
};

const IsLoadingContext = createContext({} as ReturnType<typeof useValue>);

const IsLoadingProvider = (props: PropsWithChildren<{}>) => {
  return <IsLoadingContext.Provider value={useValue()} {...props} />;
};

const useIsLoading = () => useContext(IsLoadingContext);

export { IsLoadingProvider, useIsLoading };
