import { render, screen } from "@testing-library/react";
import LoginForm from "@/components/auth/loginForm";
import { useLogin } from "@/hooks/useAuth";
import userEvent from "@testing-library/user-event";

// Mock the useLogin hook
jest.mock("@/hooks/useAuth", () => ({
  useLogin: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

// Mock ForgetPasswordForm to simplify testing
jest.mock("@/components/auth/ForgetPasswordForm", () => {
  const ForgetPasswordForm = () => <div>ForgetPasswordForm Mock</div>;
  ForgetPasswordForm.displayName = "ForgetPasswordForm";
  return ForgetPasswordForm;
});

describe("LoginForm", () => {
  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  test("renders login form elements", () => {
    render(<LoginForm />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /forget password/i }),
    ).toBeInTheDocument();
  });

  test("allows entering email and password", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("submits form with email and password", async () => {
    const mutateMock = jest.fn();
    (useLogin as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mutateMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  test("displays loading state when login is pending", () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /logging in/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/logging in/i);
  });

  test("shows ForgetPasswordForm when forget password button is clicked", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /forget password/i }));
    expect(screen.getByText("ForgetPasswordForm Mock")).toBeInTheDocument();
  });

  test("closes ForgetPasswordForm when backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    // Open forget password modal
    await user.click(screen.getByRole("button", { name: /forget password/i }));
    const forgetPasswordForm = screen.getByText("ForgetPasswordForm Mock");

    // Click backdrop to close
    await user.click(forgetPasswordForm.parentElement!);
    expect(forgetPasswordForm).not.toBeInTheDocument();
  });
});
