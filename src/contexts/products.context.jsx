import { useState } from "react";
import { createContext } from "react";

import PRODUCTS from '../shop-data.json';

export const ProductsContex = createContext({
    products:[]
})

export const ProductProvider = ({children})=>{
    const [products,setProducts] = useState(PRODUCTS);
    const value = {products};
    return(
        <ProductsContex.Provider value = {value}>
            {children}
        </ProductsContex.Provider>
    )
}