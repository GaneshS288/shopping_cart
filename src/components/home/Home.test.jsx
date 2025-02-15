import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { fetchAllProducts, fetchCategory } from "../../lib/fetchCategory";
import Home from "./Home";

const dummyProductData = [
  {
    category: "men's clothing",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    rating: { rate: 3.9, count: 120 },
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
  {
    category: "electronics",
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    id: 9,
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    price: 64,
    rating: { rate: 3.3, count: 203 },
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
  },
];

vi.mock("../../lib/fetchCategory", () => {
  return {
    fetchAllProducts: vi.fn(),
    fetchCategory: vi.fn(),
  };
});

fetchAllProducts.mockResolvedValue(dummyProductData);
fetchCategory.mockResolvedValue(dummyProductData);

function testSetup() {
  const routes = [
    {
      path: "/home",
      element: <Outlet context={{ username: "Ganesh" }}></Outlet>,
      children: [
        {
          path: "/home/:category",
          element: <Home></Home>,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/home", "/home/products"],
    initialIndex: 1,
  });

  const user = userEvent.setup();

  return { router, user };
}

describe("Home page", () => {
  it("renders all products", async () => {
    const { router } = testSetup();

    render(<RouterProvider router={router}></RouterProvider>);

    await waitFor(() => {
      expect(
        screen.getByText(
          "WD 2TB Elements Portable External Hard Drive - USB 3.0"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        )
      ).toBeInTheDocument();
    });
    screen.debug();
  });
});
