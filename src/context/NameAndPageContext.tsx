import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface NameAndPage {
  name: string;
  page: number;
}

const useValue = () => {
  const [nameAndPage, setNameAndPage] = useState<NameAndPage>({ name: '', page: 1 });
  return {
    nameAndPage,
    setNameAndPage,
  };
};

const NameAndPageContext = createContext({} as ReturnType<typeof useValue>);

const NameAndPageProvider = (props: PropsWithChildren<{}>) => {
  return <NameAndPageContext.Provider value={useValue()} {...props} />;
};

const useNameAndPage = () => useContext(NameAndPageContext);

export { NameAndPageProvider, useNameAndPage };
