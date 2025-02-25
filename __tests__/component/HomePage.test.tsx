import HomePage from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("HomePage", () => {
  it("HomePage Render a h1 ", () => {
    render(<HomePage />);
    const heading = screen.getByText("HomePage");

    expect(heading).toBeInTheDocument();
  });
});
