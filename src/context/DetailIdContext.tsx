import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useValue = () => {
  const [detatilId, setDetailId] = useState(1);
  return {
    detatilId,
    setDetailId,
  };
};

const DetailIdContext = createContext({} as ReturnType<typeof useValue>);

const DetailIdProvider = (props: PropsWithChildren<{}>) => {
  return <DetailIdContext.Provider value={useValue()} {...props} />;
};

const useDetailId = () => useContext(DetailIdContext);

export { DetailIdProvider, useDetailId };
