import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Start from "./pages/Start";
import { MemoryRouter } from "react-router-dom";
import Today from "./pages/Today";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthContext";
import { DayContext } from "./context/DayContext";
import React from "react";

interface Task {
  day: string;
  title: string;
  completed: boolean;
}

interface DayInfo {
  day: string;
  date: string;
  link: string;
  tasks: Task[];
}

type User = string;

const MockToday = () => {
  const tasks = [
    { day: "Monday", title: "Task 1", completed: false },
    { day: "Monday", title: "Task 2", completed: true },
    { day: "Monday", title: "Task 3", completed: false },
  ];
  const [user, setUser] = React.useState<User | null | string>(null);
  const [days, setDays] = React.useState<DayInfo[]>([]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <DayContext.Provider value={{ days, setDays }}>
        <MemoryRouter>
          <Today day="Monday" date="September 17, 2023" tasks={tasks} />
        </MemoryRouter>
      </DayContext.Provider>
    </AuthContext.Provider>
  );
};

describe("<Start /> Component", () => {
  it("should render without errors", () => {
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>
    );
    const startElement = screen.getByText("Start your day");
    expect(startElement).not.toBeNull();
  });

  it("if welcome message showing", () => {
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>
    );

    const welcomeMessageHeading = screen.getByTestId("welcome-message");
    expect(welcomeMessageHeading).toHaveTextContent("Start Your Day Strong!");
  });

  it("check if the button is clicked", () => {
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>
    );

    const welcomeButton = screen.getByTestId("start-button");
    fireEvent.click(welcomeButton);
    expect(welcomeButton).toBeInTheDocument();
  });
});

describe("<Login /> Component", () => {
  it("check the login include input", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginInput = screen.getByTestId("username");
    expect(loginInput).toBeInTheDocument();
  });

  it("check login include button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByTestId("login-button");
    fireEvent.click(loginButton);
    expect(loginButton).toBeInTheDocument();
  });
});

describe("<Today /> Component", () => {
  it("should start button in the component", () => {
    render(<MockToday />);

    const startButton = screen.getByTestId("start-button");
    fireEvent.click(startButton);
    expect(startButton).toBeInTheDocument();
  });

  it("show page today", () => {
    render(<MockToday />);

    const showToday = screen.getByTestId("day");
    expect(showToday).not.toBeNull();
  });

  it("check page show date", () => {
    render(<MockToday />);

    const showToday = screen.getByTestId("date");
    expect(showToday).not.toBeNull();
  });
});
