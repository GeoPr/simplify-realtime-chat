import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface ICurrentUser {
  uid: string;
  displayName: string;
  message: string;
  photoURL: string;
}

type TSetState<T> = Dispatch<SetStateAction<T>>;

interface IContextProps {
  currentUser: ICurrentUser | null;
  setCurrentUser: TSetState<null | ICurrentUser>;
  loader: boolean;
  setLoader: TSetState<boolean>;
}

const Context = createContext({} as IContextProps);

export const StateProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);
  const [loader, setLoader] = useState(false);

  const value: IContextProps = {
    currentUser,
    setCurrentUser,
    loader,
    setLoader,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useContextValue = () => useContext(Context);
