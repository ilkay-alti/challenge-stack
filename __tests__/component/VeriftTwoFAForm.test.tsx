import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VeriftTwoFAForm from "@/components/auth/VeriftTwoFAForm";
import { useVerify2FA } from "@/hooks/useAuth";

// Mock the useVerify2FA hook
jest.mock("@/hooks/useAuth", () => ({
  useVerify2FA: jest.fn(),
}));

describe("VeriftTwoFAForm", () => {
  beforeEach(() => {
    (useVerify2FA as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  it("renders the form correctly", () => {
    render(<VeriftTwoFAForm />);

    expect(screen.getAllByText("Verify 2FA")[0]).toBeInTheDocument();
    expect(screen.getByLabelText("Token")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Verify 2FA" }),
    ).toBeInTheDocument();
  });

  it("updates the token state when input changes", () => {
    render(<VeriftTwoFAForm />);

    const tokenInput = screen.getByLabelText("Token") as HTMLInputElement;
    fireEvent.change(tokenInput, { target: { value: "123456" } });

    expect(tokenInput.value).toBe("123456");
  });

  it("calls the mutate function with the correct token when the form is submitted", async () => {
    const mutate = jest.fn();
    (useVerify2FA as jest.Mock).mockReturnValue({
      mutate,
      isPending: false,
    });

    render(<VeriftTwoFAForm />);

    const tokenInput = screen.getByLabelText("Token");
    fireEvent.change(tokenInput, { target: { value: "123456" } });

    const submitButton = screen.getByRole("button", { name: "Verify 2FA" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith({ token: "123456" });
    });
  });

  it("disables the submit button when isPending is true", () => {
    (useVerify2FA as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    render(<VeriftTwoFAForm />);

    const submitButton = screen.getByRole("button", { name: "Verify 2FA" });
    expect(submitButton).toBeDisabled();
  });
});
