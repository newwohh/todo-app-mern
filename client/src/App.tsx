import React from "react";
import Container from "./components/Container";
import { Route, Routes } from "react-router-dom";
import Today from "./pages/Today";
import { DayContext } from "./context/DayContext";

function App() {
  const [days, setDays] = React.useState();

  function getDaysInCurrentWeek() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDayOfWeek);

    const daysInWeek = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      daysInWeek.push(day);
    }

    return daysInWeek;
  }

  const daysInCurrentWeek = getDaysInCurrentWeek();
  console.log(daysInCurrentWeek);

  const date = getDaysInCurrentWeek();

  console.log(date);
  return (
    <>
      <Container>
        <DayContext.Provider value={{ days, setDays }}>
          <Routes>
            <Route path="/tuesday" element={<Today day="Tuesday" />} />
          </Routes>
        </DayContext.Provider>
      </Container>
    </>
  );
}

export default App;
