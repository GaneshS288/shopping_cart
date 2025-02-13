import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ProductCard } from "./ProductCard.jsx";
import { createMemoryRouter, RouterProvider } from "react-router-dom";


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

function testSetup() {
  const routes = [
    {
      path : "/home/products",
      element: <ProductCard productData={dummyProductData}></ProductCard>,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/home/products"],
    initialIndex: 1,
  });

  return { router }
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
   

    const productImg = screen.getByRole("img");
    const productTitle = screen.getByRole("heading");
    const [addToCartButton, viewDetailsButton] = screen.getAllByRole("button");

    expect(productImg).toBeInTheDocument();
    expect(productTitle.textContent).toBe(dummyProductData.title);
    expect(addToCartButton.textContent).toBe("Add to Cart");
    expect(viewDetailsButton.textContent).toBe("View Details");
  });
});
