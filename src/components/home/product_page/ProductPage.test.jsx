import { render, screen } from "@testing-library/react";
import { expect, it, describe, vi } from "vitest";
import ProductPage from "./ProductPage";

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
    quantity: 2,
  },
];

const addToCart = vi.fn();
const removeFromCart = vi.fn();
const cart = [{ quantity: 3 }];

describe("Product page", () => {
  it("renders the producst page", () => {
    render(
      <ProductPage
        productData={dummyProductData[0]}
        handleAddToCart={addToCart}
        handleRemoveFromCart={removeFromCart}
        cart={cart}
      ></ProductPage>
    );

    const productTitle = screen.getByRole("heading");
    const productImg = screen.getAllByRole("img");
    const [descriptionPara, pricepara, ratingPara, quantityPara] =
      screen.getAllByRole("paragraph");

    expect(productTitle.textContent).toMatch(
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );
    expect(descriptionPara.textContent).toBe(dummyProductData[0].description);
    expect(productImg.length).toBe(2);
    expect(pricepara.textContent).toMatch(`$${dummyProductData[0].price}`);
    expect(quantityPara.textContent).toMatch("1");
  });
});
