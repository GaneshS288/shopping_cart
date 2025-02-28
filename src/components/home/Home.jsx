import { useOutletContext, useParams } from "react-router-dom";
import HomeHeader from "./home_header/HomeHeader";
import HomeNav from "./home_nav/HomeNav";
import { useEffect, useState } from "react";
import { fetchAllProducts, fetchCategory } from "../../lib/fetchCategory";
import styles from "./Home.module.css";
import Products from "./products/Products";
import LoadingWheel from "./loading_wheel/LoadingWheel";
import Cart from "./cart/Cart";
import ProductPage from "./product_page/ProductPage";

function Home() {
  const { username } = useOutletContext();
  const { category, productId } = useParams();
  const [categoriesData, setCategoriesData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const cartItemCount = cart.reduce((accu, next) => {
    return accu + next.quantity;
  }, 0);

  function addToCart(productData) {
    let productInCart = cart.find((data) => data.id === productData.id);
    if (productInCart) {
      let newCart = cart.filter((data) => data.id !== productInCart.id);
      productData.quantity += productInCart.quantity;
      setCart([...newCart, productData]);
    } else {
      setCart([...cart, productData]);
    }
  }

  function removeFromCart(productData) {
    let productInCart = cart.find((data) => data.id === productData.id);

    if (productInCart) {
      let newCart = cart.filter((data) => data.id !== productInCart.id);
      setCart([...newCart]);
    }
  }

  function clearCart() {
    setCart([]);
  }

  async function populateCategoriesData(selectedCategory) {
    const dataPresent = Object.hasOwn(categoriesData, selectedCategory);

    if (dataPresent || selectedCategory === "prodcuts") return;
    else {
      setLoading(true);
      let data = await fetchCategory(selectedCategory);
      setCategoriesData({ ...categoriesData, [selectedCategory]: data });
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchdata() {
      setLoading(true);
      const allProducts = await fetchAllProducts();
      setCategoriesData((state) => ({ ...state, products: allProducts }));
      setLoading(false);
    }

    fetchdata();
  }, []);

  return (
    <>
      <header>
        <HomeHeader
          userName={username}
          cartItemCount={cartItemCount}
        ></HomeHeader>
      </header>
      <section className={styles["category-nav-container"]}>
        {category !== undefined ? (
          <HomeNav
            handleClick={populateCategoriesData}
            selectedCategory={category}
          ></HomeNav>
        ) : (
          <HomeNav
            handleClick={populateCategoriesData}
            selectedCategory={"products"}
          ></HomeNav>
        )}
      </section>
      <main>
        {isLoading ? <LoadingWheel></LoadingWheel> : null}

        {category === "cart" && !isLoading ? (
          <Cart
            cart={cart}
            handleRemoveFromCart={removeFromCart}
            handleClearCart={clearCart}
          ></Cart>
        ) : null}

        {category !== "cart" && category !== undefined && !isLoading ? (
          <Products
            productsData={categoriesData[category]}
            handleAddToCart={addToCart}
            handleRemoveFromCart={removeFromCart}
            cart={cart}
          ></Products>
        ) : null}

        {productId !== undefined ? (
          <ProductPage
            productData={categoriesData.products.find(
              (data) => (data.id = productId)
            )}
            handleAddToCart={addToCart}
            handleRemoveFromCart={removeFromCart}
            cart={cart}
          ></ProductPage>
        ) : null}
      </main>
    </>
  );
}

export default Home;
