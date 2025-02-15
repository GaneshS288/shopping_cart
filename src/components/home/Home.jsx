import { useOutletContext, useParams } from "react-router-dom";
import HomeHeader from "./home_header/HomeHeader";
import HomeNav from "./home_nav/HomeNav";

function Home() {
  const { username } = useOutletContext();
  const { category } = useParams();

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
