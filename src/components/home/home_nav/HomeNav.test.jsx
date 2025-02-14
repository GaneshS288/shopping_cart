import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import HomeNav from "./HomeNav";

function testSetup() {
  const routes = [
    {
      path: "/home",
      element: <HomeNav></HomeNav>,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/home"],
    initialIndex: 1,
  });

  const user = userEvent.setup();

  return { router, user };
}

describe("Home Nav", () => {
  it("matches snapshot", () => {
    const { router } = testSetup();
    const { container } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders 5 links", () => {
    const { router } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);

    expect(screen.getAllByRole("link").length).toBe(5);
  });
});
