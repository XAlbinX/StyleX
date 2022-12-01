import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems,productToAdd)=>{
    //check if product already exists
    const exitingCartItem = cartItems.find(
        (cartItem) =>{return cartItem.id === productToAdd.id}
    )
    //if it exists, increment quantity
    if(exitingCartItem){
        console.log("exists");
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ?{...cartItem, quantity : cartItem.quantity + 1}
            :{...cartItem}
        )
    }
    //if it does not exist, create new cart item
    return [...cartItems, { ...productToAdd, quantity : 1 }];

}


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems : [],
    addItemToCart: () => {},
    cartCount : 0,

})


export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    useEffect(()=>{

        const newCartCount = cartItems.reduce((total,cartItem) => {console.log(total); return total + cartItem.quantity},0) 
        setCartCount(newCartCount);

    },[cartItems])

    const addItemToCart = (productToAdd) =>{

       setCartItems(addCartItem(cartItems,productToAdd));

    }

    const value = {isCartOpen,setIsCartOpen,cartItems,addItemToCart,cartCount};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )




} 