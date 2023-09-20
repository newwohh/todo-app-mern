import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Start from "./pages/Start";
import { MemoryRouter } from "react-router-dom";

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
});
