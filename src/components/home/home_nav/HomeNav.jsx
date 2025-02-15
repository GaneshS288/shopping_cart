import { NavLink } from "react-router-dom";

function HomeNav() {
  const categories = [
    {
      id: 0,
      linkPostfix: "products",
      content: "All",
    },

    {
      id: 1,
      linkPostfix: "electronics",
      content: "Electronics",
    },

    {
      id: 2,
      linkPostfix: "jewelery",
      content: "Jewelery",
    },
    {
      id: 3,
      linkPostfix: "men's clothing",
      content: "Men's clothing",
    },

    {
      id: 4,
      linkPostfix: "women's clothing",
      content: "Women's clothing",
    },
  ];
  return (
    <>
      <h2>Categories</h2>
      <nav>
        {categories.map((category) => {
          return (
            <NavLink key={category.id} to={`/home/${category.linkPostfix}`}>
              {category.content}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}

export default HomeNav;
