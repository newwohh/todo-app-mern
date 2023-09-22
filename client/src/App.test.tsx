import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Start from "./pages/Start";
import { MemoryRouter } from "react-router-dom";
import Today from "./pages/Today";

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

  it("should render without errors", async () => {
    render(
      <Today
        day="Monday"
        date="September 17, 2023"
        tasks={[{ day: "test", title: "Monday", completed: false }]}
      />
    );
    await waitFor(() => {
      const dayTypography = screen.getByTestId("start-button");
      fireEvent.click(dayTypography);
      expect(dayTypography).toBeInTheDocument();
    });
  });
});

// describe("<Today /> Component", () => {

// });
