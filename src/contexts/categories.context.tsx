import { useState, useEffect, createContext, ReactNode } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from '../shop-data.js';

// 1. Define Types for Categories
interface Category {
    name: string;
}

interface Product {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
  }

  interface CategoriesMap {
    [key: string]:  Product[];
  }
  
  interface CategoriesContextType {
    categoriesMap: CategoriesMap;
  }

const defaultContext: CategoriesContextType = {
    categoriesMap: {}
};

export const CategoriesContext = createContext<CategoriesContextType>(defaultContext);

// 3. Type the Provider Props
interface CategoriesProviderProps {
    children: ReactNode;
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState<CategoriesMap>({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}
