import { createContext } from "react";

interface User {
  username: string;
  id?: string;
}

interface SetContext {
  user: User | undefined | null;
  setDays: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<SetContext | undefined>(undefined);
