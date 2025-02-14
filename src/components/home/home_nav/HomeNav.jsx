import { NavLink } from "react-router-dom";

function HomeNav() {
    return(
        <>
        <h2>Categories</h2>
        <nav>
            <button>
                <NavLink to={"/home/products"}>All</NavLink>

            </button>

            <button>
                <NavLink to={"/home/electronics"}>Electronics</NavLink>
            </button>

            <button>
                <NavLink to={"/home/jewelery"}>Jewelery</NavLink>
            </button>

            <button>
                <NavLink to={"/home/men's clothing"}>Men&apos;s clothing</NavLink>
            </button>

            <button>
                <NavLink to={"/home/women's clothing"}>women&apos;s clothing</NavLink>
            </button>
        </nav>
        </>
    );
}

export default HomeNav;