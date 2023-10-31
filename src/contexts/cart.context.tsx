import { useEffect, createContext, useState, ReactNode } from "react";

// 1. Define Types for Cart Items
interface CartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
};

// 2. Type the Context
interface CartContextType {
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartItems: CartItem[];
    addItemToCart: (product: CartItem) => void;
    removeItemFromCart: (product: CartItem) => void;
    clearItemFromCart: (product: CartItem) => void;
    cartCount: number;
    cartTotal: number;
}

// Default values for the context (used for auto-suggestions and type safety)
const defaultContext: CartContextType = {
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
};

export const CartContext = createContext<CartContextType>(defaultContext);

// 3. Type the Provider Props
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addCartItem = (cartItems: CartItem[], productToAdd: CartItem) => {
        const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
        if (existingCartItem) {
            return cartItems.map(cartItem =>
                cartItem.id === productToAdd.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        }
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    };

    const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem) => {
        const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);
        if (existingCartItem?.quantity === 1) {
            return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
        }
        return cartItems.map(cartItem =>
            cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    };

    const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) => {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
    };

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd: CartItem) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove: CartItem) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    const clearItemFromCart = (cartItemToClear: CartItem) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        cartCount,
        clearItemFromCart,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
