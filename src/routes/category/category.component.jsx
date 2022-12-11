import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContex } from "../../contexts/categories.context";
import { useParams } from "react-router-dom";

import "./category.styles.scss"
import ProductCard from "../../component/product-card/product-card.component";

const Category = () => {
   const {category} = useParams();
   const {categoriesMap} = useContext(CategoriesContex);
   const [products, setProducts] = useState(categoriesMap[category]);

   useEffect(()=>{
    setProducts(categoriesMap[category])
   },[category,categoriesMap])

   return(
    <Fragment>
    <h2 className="category-title">{category.toUpperCase()}</h2>

    <div className="category-container">
        {products &&
            products.map((product)=> <ProductCard key={product.id} product = {product}/>)
        }
    </div>
    </Fragment>
    
   )


   


}

export default Category;