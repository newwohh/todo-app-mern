import React from "react";
import axios, { AxiosResponse } from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import Container from "./components/Container";
import Today from "./pages/Today";
import { DayContext } from "./context/DayContext";
import { AuthContext } from "./context/AuthContext";

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

interface CurrentDays {
  day: string;
  date: string;
  tasks: never[];
  link: string;
}

type User = string;

function App(): JSX.Element {
  const [days, setDays] = React.useState<DayInfo[]>([]);
  const [user, setUser] = React.useState<User | null | string>(null);

  const getAllTodos = async () => {
    const id: string = user ? JSON.parse(user) : "";
    const todos: AxiosResponse = await axios.get(
      `https://dailydo.onrender.com/api/todo/tasks/${id}`
    );
    localStorage.setItem("todos", JSON.stringify(todos.data.data.tasks));
    // console.log(todos.data.data.tasks);
    location.reload();
  };

  const storedTodosJSON: string | null = localStorage.getItem("todos") || null;
  const storedTodosArray: string[] = React.useMemo(() => {
    return storedTodosJSON ? JSON.parse(storedTodosJSON) : [];
  }, [storedTodosJSON]);
  if (!storedTodosJSON) {
    getAllTodos();
  }
  // console.log(storedTodosArray);
  const currentDate: Date = new Date();
  const currentDayOfWeek: number = currentDate.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayName = daysOfWeek[currentDayOfWeek];
  const navigation = useNavigate();

  React.useEffect(() => {
    setUser(localStorage.getItem("user"));
    navigation(`/${currentDayName}`);
    const getDaysInCurrentWeek = (): CurrentDays[] => {
      const currentDate: Date = new Date();
      const currentDayOfWeek: number = currentDate.getDay();
      const startDate: Date = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDayOfWeek);
      const daysInWeek: Date[] = [];

      for (let i = 0; i < 7; i++) {
        const day: Date = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        daysInWeek.push(day);
      }
      return daysInWeek.map((el: Date) => {
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        };

        const dateTimeString: string = el.toLocaleString("en-US", options);
        const splittedDate: string[] = dateTimeString.split(" ");

        return {
          day: splittedDate[0].slice(0, -1),
          date: splittedDate[1] + splittedDate[2] + splittedDate[3],
          tasks: storedTodosArray,
          link: splittedDate[0].slice(0, -1),
        } as CurrentDays;
      });
    };

    const daysInCurrentWeek: CurrentDays[] = getDaysInCurrentWeek();
    setDays(daysInCurrentWeek);
  }, [currentDayName, navigation, storedTodosArray]);

  console.log(user);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Container>
          <DayContext.Provider value={{ days, setDays }}>
            <Routes>
              {days.map((el: DayInfo) => {
                return (
                  <Route
                    key={el.day}
                    path={el.link}
                    element={
                      <Today day={el.day} date={el.date} tasks={el.tasks} />
                    }
                  />
                );
              })}
            </Routes>
          </DayContext.Provider>
        </Container>
      </AuthContext.Provider>
    </>
  );
}

export default App;
