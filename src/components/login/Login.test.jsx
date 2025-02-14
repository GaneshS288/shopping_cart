import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./Login.jsx";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function testSetup() {
  const handleSubmit = vi.fn();

  const routes = [
    {
      path: "/",
      element: <Outlet context={[handleSubmit]}></Outlet>,
      children: [
        {
          path: "/login",
          element: <Login></Login>,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/login"],
    initialIndex: 1,
  });

  const user = userEvent.setup();

  return { router, user, handleSubmit };
}

describe("Login", () => {
  it("matches snapshot", () => {
    const { router } = testSetup();
    const { container } = render(
      <RouterProvider router={router}></RouterProvider>
    );

    screen.debug();

    expect(container).toMatchSnapshot();
  });

  it("renders the login page", () => {
    const { router } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);

    const loginTitle = screen.getByRole("heading");
    const userNameInput = screen.getByLabelText("Username :");
    const [loginAsUserButton, loginAGuestButton] =
      screen.getAllByRole("button");

    expect(loginTitle.textContent).toMatch("BlazingCart");
    expect(userNameInput).toBeInTheDocument();
    expect(loginAsUserButton.textContent).toMatch("Log in as User");
    expect(loginAGuestButton.textContent).toMatch("Log in as Guest");
  });

  it("calls the submit handler with inputted username", async () => {
    const { router, user, handleSubmit } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);

    const userNameInput = screen.getByLabelText("Username :");
    const [loginAsUserButton] = screen.getAllByRole("button");

    await user.type(userNameInput, "Ganesh");
    await user.click(loginAsUserButton);

    expect(handleSubmit).toHaveBeenCalledWith("Ganesh");
  });

  it("calls the submit handler with Guest", async () => {
    const { router, user, handleSubmit } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);

    const loginAsGuestButton = screen.getAllByRole("button")[1];

    await user.click(loginAsGuestButton);

    expect(handleSubmit).toHaveBeenCalledWith("Guest");
  });
});
