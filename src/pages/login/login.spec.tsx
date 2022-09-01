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
});
