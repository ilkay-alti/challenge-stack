import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useNewPassword } from "@/hooks/useAuth";
import { toast } from "react-toastify";

// Mock the useNewPassword hook
jest.mock("@/hooks/useAuth", () => ({
  useNewPassword: jest.fn(),
}));

// Mock the toast notification
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("NewPasswordForm", () => {
  const token = "test-token";

  beforeEach(() => {
    (useNewPassword as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    });
  });

  it("renders the form correctly", () => {
    render(<NewPasswordForm token={token} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "New Password" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reset Password" }),
    ).toBeInTheDocument();
  });

  it("shows an error if passwords are less than 6 characters", async () => {
    render(<NewPasswordForm token={token} />);

    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Password must be at least 6 characters long",
      );
    });
  });

  it("shows an error if passwords do not match", async () => {
    render(<NewPasswordForm token={token} />);

    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "654321" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Passwords do not match");
    });
  });

  it("calls the newPasswordMutation.mutate function if passwords are valid", async () => {
    const mutate = jest.fn();
    (useNewPassword as jest.Mock).mockReturnValue({
      mutate,
      isLoading: false,
    });

    render(<NewPasswordForm token={token} />);

    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith({
        token: "test-token",
        password: "123456",
      });
    });
  });
});
