import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { useNavigate, Outlet,useParams } from "react-router-dom";

import "./category.styles.scss";
import ProductCard from "../../component/product-card/product-card.component";

// Define the type for a single product item
interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

// Define the type for a category
interface Category {
  name: string; // Define the property 'items' as an array of products
}

// Define the type for route parameters
interface Params {
  category: string;
}

// Define a custom type for route parameters
type RouteParams = {
  category: string;
};

const Category = () => {

  const { category } = useParams<RouteParams>();
  const { categoriesMap } = useContext(CategoriesContext);

  // Initialize products as an empty array
  const [products, setProducts] = useState<Product[]>(
    category ? categoriesMap[category] : []
  );

  useEffect(() => {
    if (category) {
      // Accessing the array directly from the selected category
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">
        {category ? category.toUpperCase() : "Category Not Found"}
      </h2>

      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
