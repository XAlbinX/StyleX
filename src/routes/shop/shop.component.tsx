import "./shop.styles.scss";
import { Route, Routes } from "react-router-dom";
import React, { ReactElement } from 'react'; // Import React and ReactElement

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = (): ReactElement => { // Type the return of the component

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}></Route>
            <Route path=":category" element={<Category/>}></Route>
        </Routes>
    );
}   

export default Shop;
