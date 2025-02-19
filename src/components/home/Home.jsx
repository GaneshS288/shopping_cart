import { useOutletContext, useParams } from "react-router-dom";
import HomeHeader from "./home_header/HomeHeader";
import HomeNav from "./home_nav/HomeNav";
import { useEffect, useState } from "react";
import { fetchAllProducts, fetchCategory } from "../../lib/fetchCategory";
import styles from "./Home.module.css";
import Products from "./products/Products";
import LoadingWheel from "./loading_wheel/LoadingWheel";

function Home() {
  const { username } = useOutletContext();
  const { category } = useParams();
  const [categoriesData, setCategoriesData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const cartItemCount = cart.reduce((accu, next) => {
    return accu + next.quantity;
  }, 0)

  function addToCart(productData) {
    let productInCart = cart.find((data) => (data.id === productData.id));
    if (productInCart) {
      let newCart = cart.filter((data) => data.id !== productInCart.id);
      productData.quantity += productInCart.quantity;
      setCart([...newCart, productData]);
    } else {
      setCart([...cart, productData]);
    }
  }

  function removeFromCart(productData) {
    let productInCart = cart.find((data) => (data.id === productData.id));

    if(productInCart) {
      let newCart = cart.filter((data) => data.id !== productInCart.id);
      setCart([...newCart]);
    }
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

  console.log(category);
  return (
    <>
      <header>
        <HomeHeader userName={username} cartItemCount={cartItemCount}></HomeHeader>
      </header>
      <section className={styles["category-nav-container"]}>
        <HomeNav
          handleClick={populateCategoriesData}
          selectedCategory={category}
        ></HomeNav>
      </section>
      <main>
        {isLoading ? (
          <LoadingWheel></LoadingWheel>
        ) : (
          <Products
            productsData={categoriesData[category]}
            handleAddToCart={addToCart}
            handleRemoveFromCart={removeFromCart}
            cart={cart}
          ></Products>
        )}
      </main>
    </>
  );
}

export default Home;
