import { createContext } from "react";

// interface User {
//   username: string;
//   id?: string;
// }

interface SetContext {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<SetContext | undefined>(undefined);
