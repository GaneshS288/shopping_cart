import { useOutletContext, useParams } from "react-router-dom";
import HomeHeader from "./home_header/HomeHeader";
import HomeNav from "./home_nav/HomeNav";
import { useState } from "react";

function Home() {
  const { username } = useOutletContext();
  const { category } = useParams();
  const  [categoriesData, setCategoriesData] = useState([]);
  
  

  console.log(category)
  return (
    <>
      <header>
        <HomeHeader userName={username} cartItemCount={2}></HomeHeader>
      </header>
      <section>
        <HomeNav handleClick={(h)=> h} selectedCategory={category}></HomeNav>
      </section>
    </>
  );
}

export default Home;
