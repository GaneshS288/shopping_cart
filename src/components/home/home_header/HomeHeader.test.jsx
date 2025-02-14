import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import HomeHeader from "./HomeHeader";

function DummyComponent() {
  return <p>I am dummy</p>;
}

function testSetup(cartItemCount = 2) {
  const username = "Ganesh";

  const routes = [
    {
      path: "/home",
      element: (
        <HomeHeader
          userName={username}
          cartItemCount={cartItemCount}
        ></HomeHeader>
      ),
    },

    {
      path: "/home/cart",
      element: <DummyComponent></DummyComponent>,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/home"],
    initialIndex: 1,
  });

  const user = userEvent.setup();

  return { router, user };
}

describe("Home header", () => {
  it("matches snapshot", () => {
    const { router } = testSetup();

    const { container } = render(
      <RouterProvider router={router}></RouterProvider>
    );

    screen.debug();

    expect(container).toMatchSnapshot();
  });

  it("renders the header", () => {
    const { router } = testSetup();

    render(<RouterProvider router={router}></RouterProvider>);

    const [homeLink, cartLink] = screen.getAllByRole("link");

    expect(homeLink.textContent).toMatch("BlazingCart");
    expect(cartLink).toBeInTheDocument();
  });

  it("renders name and cartItemCount props", () => {
    const { router } = testSetup();

    render(<RouterProvider router={router}></RouterProvider>);

    const userNamePara = screen.getByRole("paragraph");
    const cartItemCount = screen.getByTestId("cartItemCount");
    expect(userNamePara.textContent).toMatch("Ganesh");
    expect(cartItemCount.textContent).toMatch("2");
  });

  it("doesn't render cart item count if count is below 1", () => {
    const { router } = testSetup(0);

    render(<RouterProvider router={router}></RouterProvider>);

    const cartItemCount = screen.queryByTestId("cartItemCount");
    expect(cartItemCount).not.toBeInTheDocument();
  });

  it("navigates to cart", async () => {
    const { router, user } = testSetup();

    render(<RouterProvider router={router}></RouterProvider>);

    const cartLink = screen.getAllByRole("link")[1];

    await user.click(cartLink);
    
    expect(screen.getByRole("paragraph").textContent).toMatch("I am dummy");
  });
});
