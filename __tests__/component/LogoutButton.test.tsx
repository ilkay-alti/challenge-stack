import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LogoutButton from "@/components/auth/LogoutButton";
import { useLogout } from "@/hooks/useAuth";

// Mock the useLogout hook
jest.mock("@/hooks/useAuth", () => ({
  useLogout: jest.fn(),
}));

describe("LogoutButton", () => {
  it("renders the button with 'Logout' text when not pending", () => {
    (useLogout as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(<LogoutButton />);

    const button = screen.getByRole("button", { name: "Logout" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("renders the button with 'Pending Logout...' text and is disabled when pending", () => {
    (useLogout as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    render(<LogoutButton />);

    const button = screen.getByRole("button", { name: "Pending Logout..." });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("calls the mutate function when the button is clicked", () => {
    const mutate = jest.fn();
    (useLogout as jest.Mock).mockReturnValue({
      mutate,
      isPending: false,
    });

    render(<LogoutButton />);

    const button = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(button);

    expect(mutate).toHaveBeenCalled();
  });
});
