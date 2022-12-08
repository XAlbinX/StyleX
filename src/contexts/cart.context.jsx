import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems,productToAdd)=>{
    //check if product already exists
    const existingCartItem = cartItems.find(
        (cartItem) =>{return cartItem.id === productToAdd.id}
    )
    //if it exists, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ?{...cartItem, quantity : cartItem.quantity + 1}
            :{...cartItem}
        )
    }
    //if it does not exist, create new cart item
    return [...cartItems, { ...productToAdd, quantity : 1 }];

}

const removeCartItem = (cartItems,productToRemove)=>{
    //identify the product
    const existingCartItem = cartItems.find(
        (cartItem) =>{return cartItem.id === productToRemove.id}
    )

    //Remove from cart when quantity = 1
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => {return cartItem.id !== productToRemove.id})
    }

    //Decrement quantity
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id
        ?{...cartItem, quantity : cartItem.quantity - 1}
        :{...cartItem}
    )
}

const clearCartItem = (cartItems, cartItemToClear) =>{
    return cartItems.filter((cartItem) => {return cartItem.id !== cartItemToClear.id})
}


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems : [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart:()=>{},
    cartCount : 0,
    cartTotal : 0,

})


export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{

        const newCartCount = cartItems.reduce((total,cartItem) => {return total + cartItem.quantity},0) 
        setCartCount(newCartCount);

    },[cartItems])

    useEffect(()=>{

        const newCartTotal = cartItems.reduce((total,cartItem) => {return total + cartItem.quantity * cartItem.price},0) 
        setCartTotal(newCartTotal);

    },[cartItems])

    const addItemToCart = (productToAdd) =>{

       setCartItems(addCartItem(cartItems,productToAdd));

    }

    const removeItemFromCart = (productToRemove) =>{

        setCartItems(removeCartItem(cartItems,productToRemove));
 
    }

    const clearItemFromCart = (cartItemToClear) =>{

        setCartItems(clearCartItem(cartItems,cartItemToClear));
 
    }


    const value = {isCartOpen,setIsCartOpen,cartItems,addItemToCart,removeItemFromCart,cartCount,clearItemFromCart,cartTotal};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )




} 