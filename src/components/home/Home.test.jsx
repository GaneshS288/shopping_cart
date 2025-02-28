import { describe, expect, it, vi } from "vitest";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
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

const anotherDummyProductData = [
  {
    category: "electronics",
    description: "this is dummy for mocking purpose",
    id: 9,
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    price: 64,
    rating: { rate: 3.3, count: 203 },
    title: "dummy title for mocking purposes",
  },
];

vi.mock("../../lib/fetchCategory", () => {
  return {
    fetchAllProducts: vi.fn(),
    fetchCategory: vi.fn(),
  };
});

vi.mock("./home_header/HomeHeader.jsx", () => {
  return {
    default: ({ userName, cartItemCount }) => {
      return (
        <>
          <p>{userName}</p>
          <span data-testid="cartItemCount">{cartItemCount}</span>
        </>
      );
    },
  };
});

vi.mock("./products/Products.jsx", () => {
  return {
    default: ({ productsData, handleAddToCart, handleRemoveFromCart }) => {
      return (
        <>
          {productsData.map((data) => {
            return (
              <div key={data.id}>
                <h4>{data.title}</h4>
                <button
                  onClick={() => handleAddToCart({ ...data, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button onClick={() => handleRemoveFromCart(data)}>Remove</button>
              </div>
            );
          })}
        </>
      );
    },
  };
});

fetchAllProducts.mockResolvedValue(dummyProductData);
fetchCategory.mockResolvedValue(anotherDummyProductData);

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

  it("renders different category when link is clicked", async () => {
    const { router, user } = testSetup();

    render(<RouterProvider router={router}></RouterProvider>);

    const jeweleryLink = screen.getByText("Jewelery");

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
    await user.click(jeweleryLink);

    await waitFor(() => {
      expect(
        screen.getByText("dummy title for mocking purposes")
      ).toBeInTheDocument();
    });
  });

  it("updates cart item counter when product is added to cart", async () => {
    const { router, user } = testSetup();

    render(<RouterProvider router={router}></RouterProvider>);
    const cartItemCount = screen.getByTestId("cartItemCount");

    await waitFor(async () => {
      const [backPackAddToCartButton] = screen.getAllByText("Add to Cart");
      await user.click(backPackAddToCartButton);
      await user.click(backPackAddToCartButton);
    });

    expect(cartItemCount.textContent).toBe("2");
  });

  it("removes the items from cart when remove on a product card is clicked", async () => {
    const { router, user } = testSetup();

    render(<RouterProvider router={router}></RouterProvider>);
    const cartItemCount = screen.getByTestId("cartItemCount");

    await waitFor(async () => {
      const [backPackAddToCartButton, HDAddButton] = screen.getAllByText("Add to Cart");
      await user.click(backPackAddToCartButton);
      await user.click(backPackAddToCartButton);
      await user.click(HDAddButton);

      const [backPackRemoveButton] = screen.getAllByText("Remove");
      await user.click(backPackRemoveButton)
    });

    expect(cartItemCount.textContent).toBe("1");
  });
});
