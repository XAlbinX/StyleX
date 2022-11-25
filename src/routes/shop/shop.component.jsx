import SHOP_DATA from "../../shop-data.json"

import "./shop.styles.scss"

import { useContext } from "react";
import { ProductsContex } from "../../contexts/products.context";

import ProductCard from "../../component/product-card/product-card.component"

const Shop = ()=>{

    const {products} = useContext(ProductsContex);
    return (
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product = {product}></ProductCard>
            ))}
        </div>
    )


}

export  default Shop;