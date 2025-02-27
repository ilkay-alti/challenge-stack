import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import { useForgetPassword } from "@/hooks/useAuth";

// Hook'u mocklama
jest.mock("@/hooks/useAuth", () => ({
  useForgetPassword: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}));

describe("ForgetPasswordForm", () => {
  beforeEach(() => {
    (useForgetPassword as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  test("form elementlerini doğru şekilde render eder", () => {
    render(<ForgetPasswordForm />);

    expect(
      screen.getByRole("heading", { name: /şifremi unuttum/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit request/i }),
    ).toBeInTheDocument();
  });

  test("kullanıcı e-posta girebilmeli", async () => {
    const user = userEvent.setup();
    render(<ForgetPasswordForm />);

    const emailInput = screen.getByLabelText(/e-posta adresi/i);
    await user.type(emailInput, "test@example.com");

    expect(emailInput).toHaveValue("test@example.com");
  });

  test("geçerli e-posta ile form gönderimi", async () => {
    const mutateMock = jest.fn();
    (useForgetPassword as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });

    const user = userEvent.setup();
    render(<ForgetPasswordForm />);

    await user.type(
      screen.getByLabelText(/e-posta adresi/i),
      "test@example.com",
    );
    await user.click(screen.getByRole("button", { name: /submit request/i }));

    expect(mutateMock).toHaveBeenCalledWith(
      { email: "test@example.com" },
      expect.objectContaining({
        onSettled: expect.any(Function),
      }),
    );
  });

  test("yüklenme durumunda buton devre dışı kalır", () => {
    (useForgetPassword as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    render(<ForgetPasswordForm />);

    const submitButton = screen.getByRole("button", {
      name: /submit request/i,
    });
    expect(submitButton).toBeDisabled();
  });

  test("geçersiz e-posta ile form gönderilmez", async () => {
    const mutateMock = jest.fn();
    (useForgetPassword as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });

    const user = userEvent.setup();
    render(<ForgetPasswordForm />);

    const emailInput = screen.getByLabelText(/e-posta adresi/i);
    await user.type(emailInput, "geçersiz-email");
    await user.click(screen.getByRole("button", { name: /submit request/i }));

    expect(mutateMock).not.toHaveBeenCalled();
  });
});
