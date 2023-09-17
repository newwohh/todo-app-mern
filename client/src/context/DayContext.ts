import { createContext } from "react";

interface DayInfo {
  day: string;
  date: string;
  link: string;
}

interface SetContext {
  days: DayInfo[];
  setDays: React.Dispatch<React.SetStateAction<DayInfo[]>>;
}

export const DayContext = createContext<SetContext | null>(null);
