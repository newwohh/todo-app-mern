import { createContext } from "react";

interface Task {
  day: string;
  title: string;
  completed: boolean;
  _id: string;
}

interface DayInfo {
  day: string;
  date: string;
  link: string;
  tasks: Task[];
}

interface SetContext {
  days: DayInfo[];
  setDays: React.Dispatch<React.SetStateAction<DayInfo[]>>;
}

export const DayContext = createContext<SetContext | undefined>(undefined);
