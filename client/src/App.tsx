import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import Today from "./pages/Today";
import { DayContext } from "./context/DayContext";
import { AuthContext } from "./context/AuthContext";

interface Task {
  task: string;
  completed: boolean;
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

function App(): JSX.Element {
  const [days, setDays] = React.useState<DayInfo[]>([]);
  const [user, setUser] = React.useState<string | undefined | null>(null);

  const getAllTodos = async () => {
    const id = user ? JSON.parse(user) : "";
    const todos = await axios.get(`http://localhost:5050/api/todo/tasks/${id}`);
    localStorage.setItem("todos", JSON.stringify(todos.data.data.tasks));
    console.log(todos.data.data.tasks);
    location.reload();
  };

  const storedTodosJSON = localStorage.getItem("todos") || null;
  const storedTodosArray: string[] = storedTodosJSON
    ? JSON.parse(storedTodosJSON)
    : [];
  if (!storedTodosJSON) {
    getAllTodos();
  }
  console.log(storedTodosArray);

  React.useEffect(() => {
    setUser(localStorage.getItem("user"));

    const getDaysInCurrentWeek = (): CurrentDays[] => {
      const currentDate: Date = new Date();
      const currentDayOfWeek: number = currentDate.getDay();
      const startDate: Date = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDayOfWeek);
      const daysInWeek: Date[] = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
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
        };
      });
    };

    const daysInCurrentWeek: CurrentDays[] = getDaysInCurrentWeek();
    setDays(daysInCurrentWeek);
  }, []);

  console.log(user);

  return (
    <>
      <Container>
        <DayContext.Provider value={{ days, setDays }}>
          <AuthContext.Provider value={{ user, setUser }}>
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
          </AuthContext.Provider>
        </DayContext.Provider>
      </Container>
    </>
  );
}

export default App;
