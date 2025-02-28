import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const dummyProductData = {
  category: "men's clothing",
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  price: 109.95,
  rating: { rate: 3.9, count: 120 },
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
};

function DummyComponent() {
  return(
    <p>I am dummy</p>
  );
}

const addToCart = vi.fn();
const removeFromCart = vi.fn();
const cart = [];

function testSetup() {
  const routes = [
    {
      path : "/home/products",
      element: <ProductCard productData={dummyProductData} handleAddToCart={addToCart} handleRemoveFromCart={removeFromCart} cart={[]}></ProductCard>,
    },
    {
      path: "/home/products/:id",
      element: <DummyComponent></DummyComponent>
    }
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/home/products"],
    initialIndex: 1,
  });

  const user = userEvent.setup();

  return { router, user }
}

describe("Product Card", () => {
  it("matches snapshot", () => {
    const { router } = testSetup();
    const {container} = render(<RouterProvider router={router}></RouterProvider>);
    
    expect(container).toMatchSnapshot();
  })

  it("renders the card", () => {
    const { router } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);
    screen.debug()
   

    const [ productImg ] = screen.getAllByRole("img");
    const productTitle = screen.getByRole("heading");
    const [addToCartButton, decrementQty , incrementQty, viewDetailsButton] = screen.getAllByRole("button");

    expect(productImg).toBeInTheDocument();
    expect(productTitle.textContent).toBe(dummyProductData.title);
    expect(addToCartButton.textContent).toBe("Add to Cart");
    expect(viewDetailsButton.textContent).toBe("View Details");
  });

  it("navigates to product page when view details is clicked", async () => {
    const { router, user } = testSetup();
    render(<RouterProvider router={router}></RouterProvider>);

    const viewDetailsLink = screen.getByRole("link");

    await user.click(viewDetailsLink);
    
    expect(screen.getByRole("paragraph").textContent).toBe("I am dummy");
  }) 
});
