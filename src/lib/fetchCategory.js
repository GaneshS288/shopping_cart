async function fetchCategory(category) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`,
      { mode: "cors" }
    );
    if (!res.ok) throw new Error("fetch failed");
    const json = await res.json();
    return json;
  } catch (err) {
    return err;
  }
}

async function fetchAllProducts() {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`, {
      mode: "cors",
    });
    if (!res.ok) throw new Error("fetch failed");
    const json = await res.json();
    return json;
  } catch (err) {
    return err;
  }
}

export { fetchCategory, fetchAllProducts };
