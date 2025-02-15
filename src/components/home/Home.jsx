import { useOutletContext, useParams } from "react-router-dom";
import HomeHeader from "./home_header/HomeHeader";
import HomeNav from "./home_nav/HomeNav";
import { useEffect, useState } from "react";
import { fetchAllProducts, fetchCategory } from "../../lib/fetchCategory";
import { ProductCard } from "../product_card/ProductCard";

function Home() {
  const { username } = useOutletContext();
  const { category } = useParams();
  const [categoriesData, setCategoriesData] = useState({});
  const [isLoading, setLoading] = useState(true);

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
        <HomeHeader userName={username} cartItemCount={2}></HomeHeader>
      </header>
      <section>
        <HomeNav
          handleClick={populateCategoriesData}
          selectedCategory={category}
        ></HomeNav>
      </section>
      <main>
        {isLoading ||
          categoriesData[category].map((data) => (
            <ProductCard key={data.id} productData={data}></ProductCard>
          ))}
      </main>
    </>
  );
}

export default Home;
