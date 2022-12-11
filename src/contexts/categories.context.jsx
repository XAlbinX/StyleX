import { useState,useEffect } from "react";
import { createContext } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
import SHOP_DATA from '../shop-data.js';

export const CategoriesContex = createContext({
    categoriesMap:{}
})

export const CategoriesProvider = ({children})=>{
    const [categoriesMap,setCategoriesMap] = useState({});
    //useEffect(()=>{addCollectionAndDocuments('categories',SHOP_DATA)},[])
    useEffect(()=>{
        const getCategoriesMap = async()=>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        
        getCategoriesMap();
    },[])
    const value = {categoriesMap};
    return(
        <CategoriesContex.Provider value = {value}>
            {children}
        </CategoriesContex.Provider>
    )
}