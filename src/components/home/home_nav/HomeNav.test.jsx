import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import HomeNav from "./HomeNav";

function testSetup() {
  const handleClick = vi.fn();

  const routes = [
    {
      path: "/home/:category",
      element: <HomeNav handleClick={handleClick} selectedCategory={"jewelery"}></HomeNav>,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/home/All"],
    initialIndex: 1,
  });

  const user = userEvent.setup();

  return { router, user, handleClick };
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

  it("invokes handleClick by passing clicked category", async () => {
    const { router, user, handleClick } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);

    const jeweleryLink = screen.getByText("Jewelery");
    await user.click(jeweleryLink);

    expect(handleClick).toHaveBeenCalledWith("jewelery");
  });

  it("applies selected class to the category that's selected", async () => {
    const { router, } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);

    const jeweleryLink = screen.getByText("Jewelery");

    expect(jeweleryLink.className).toMatch("selected")
  });
});
