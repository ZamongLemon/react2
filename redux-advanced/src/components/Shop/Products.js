import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  { id: "p1", price: 6.12, title: "My First Book ", description: "desc1" },
  { id: "p2", price: 5.335, title: "My Second Book ", description: "desc2" },
  { id: "p3", price: 4.32, title: "My Third Book ", description: "desc3" },
  { id: "p4", price: 10.23, title: "My Fourth Book ", description: "desc4" }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            price={item.price}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
