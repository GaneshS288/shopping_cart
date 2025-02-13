import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./Login.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function testSetup() {
  const routes = [
    {
      path: "/login",
      element: <Login></Login>,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/login"],
    initialIndex: 1,
  });

  const user = userEvent.setup();

  return { router, user };
}

describe("Login", () => {
  it("matches snapshot", () => {
    const { router } = testSetup();
    const { container } = render(
      <RouterProvider router={router}></RouterProvider>
    );

    screen.debug()

    expect(container).toMatchSnapshot();
  });

  it("renders the login page", () => {
    const { router } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);

    const userNameInput = screen.getByLabelText("Username :");
    const [loginAsUserButton, loginAGuestButton] = screen.getAllByRole("button");

    expect(userNameInput).toBeInTheDocument();
    expect(loginAsUserButton.textContent).toMatch("Log in as User");
    expect(loginAGuestButton.textContent).toMatch("Log in as Guest");
  });
});
