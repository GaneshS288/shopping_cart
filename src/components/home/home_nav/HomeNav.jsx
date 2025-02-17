import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./HomeNav.module.css";

function HomeNav({ handleClick, selectedCategory }) {
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
      <h2 className={styles["categories-title"]}>Categories</h2>
      <nav className={styles["category-nav"]}>
        {categories.map((category) => {
          return (
            <NavLink
              key={category.id}
              to={`/home/${category.linkPostfix}`}
              onClick={() => handleClick(category.linkPostfix)}
              className={() =>
                selectedCategory === category.linkPostfix
                  ? styles["selected-link"]
                  : styles["link"]
              }
            >
              {category.content}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}

HomeNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default HomeNav;
