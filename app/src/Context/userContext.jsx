import { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [userID, setUserID] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [accType, setAccType] = useState("");

    useEffect(() => {
        const storedAccType = sessionStorage.getItem('accType')
        if (storedAccType) {
            console.log("storedAccType: true")
            setAccType(storedAccType)
        }
    }, [])
    
    return (
        <UserContext.Provider value={{isLogin, setIsLogin, accType, setAccType, userID, setUserID}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)