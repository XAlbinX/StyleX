import { useEffect, createContext, useState, ReactNode } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// 1. Define Types for User
// This is a basic example. You might want to expand on this based on your user's properties.
interface User {
    uid: string;
    displayName?: string;
    email?: string;
    // ... any other properties a user might have
}

// 2. Type the Context
interface UserContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

const defaultContext: UserContextType = {
    currentUser: null,
    setCurrentUser: () => {}
};

export const UserContext = createContext<UserContextType>(defaultContext);

// 3. Type the Provider Props
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
