import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface Meta {
  current_page: number;
  last_page: number;
  path: string;
  from: number;
  to: number;
  per_page: number;
  total: number;
}

const useValue = () => {
  const [meta, setMeta] = useState<Meta>();
  return {
    meta,
    setMeta,
  };
};

const MetaContext = createContext({} as ReturnType<typeof useValue>);

const MetaProvider = (props: PropsWithChildren<{}>) => {
  return <MetaContext.Provider value={useValue()} {...props} />;
};

const useMeta = () => useContext(MetaContext);

export { MetaProvider, useMeta };
