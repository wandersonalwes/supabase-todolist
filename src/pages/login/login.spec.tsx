import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Login } from ".";

describe("TodoList", () => {
  it("should rendered login page", () => {
    render(<Login />);

    expect(screen.getByTestId("test-login-page")).toBeInTheDocument();
  });

  it("should have password type", () => {
    render(<Login />);

    const inputPassword = screen.getByTestId<HTMLInputElement>("test-password");

    expect(inputPassword.type).toBe("password");
    expect(inputPassword.placeholder).toBe("Senha");
  });

  it("should have email type", () => {
    render(<Login />);

    const inputEmail = screen.getByTestId<HTMLInputElement>("test-email");

    expect(inputEmail.type).toBe("email");
    expect(inputEmail.placeholder).toBe("E-mail");
  });

  it("should have an email and password when submitting the form", () => {
    const onSubmit = vi.fn();
    render(<Login onSubmit={onSubmit} />);

    const form = screen.getByTestId<HTMLFormElement>("test-login-page");
    const inputEmail = screen.getByTestId<HTMLInputElement>("test-email");
    const inputPassword = screen.getByTestId<HTMLInputElement>("test-password");

    fireEvent.change(inputEmail, {
      target: { value: "john.doe@mail.com" },
    });

    fireEvent.change(inputPassword, {
      target: { value: "any_password" },
    });

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      email: "john.doe@mail.com",
      password: "any_password",
    });
  });
});
