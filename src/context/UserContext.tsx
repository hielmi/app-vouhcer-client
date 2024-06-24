import {
  useState,
  FC,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "../type/User.type";

export type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  logout: Function;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
    localStorage.clear();
  };

  const contextValue: UserContextType = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
