import React from "react";
import Container from "./components/Container";
import { Route, Routes } from "react-router-dom";
import Today from "./pages/Today";
import { DayContext } from "./context/DayContext";

interface DayInfo {
  day: string;
  date: string;
  link: string;
}

interface CurrentDays {
  day: string;
  date: string;
  tasks: never[];
  link: string;
}

function App(): JSX.Element {
  const [days, setDays] = React.useState<DayInfo[]>([]);

  React.useEffect(() => {
    const getDaysInCurrentWeek = () => {
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
          tasks: [],
          link: splittedDate[0].slice(0, -1),
        };
      });
    };

    const daysInCurrentWeek: CurrentDays[] = getDaysInCurrentWeek();
    setDays(daysInCurrentWeek);
  }, []);

  console.log(days);

  return (
    <>
      <Container>
        <DayContext.Provider value={{ days, setDays }}>
          <Routes>
            {days.map((el: DayInfo) => {
              return (
                <Route
                  key={el.day}
                  path={el.link}
                  element={<Today day={el.day} date={el.date} />}
                />
              );
            })}
          </Routes>
        </DayContext.Provider>
      </Container>
    </>
  );
}

export default App;
