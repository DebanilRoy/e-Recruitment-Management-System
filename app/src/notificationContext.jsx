import { createContext, useContext, useEffect, useState } from "react";

const notificationContext = createContext()

export const useNotification = () => useContext(notificationContext)

export default function Notification({children}) {
    const [notifState, setNotifState] = useState({isActive: false, message: "", status: "",  resolve: null})

    function showNotification(message, status) {
        return new Promise((resolve) => {
            setNotifState({isActive: true, message, status, resolve})
        })
    }

    useEffect(() => {
        console.log("isActive set to false")
        notifState.isActive && setTimeout(() => setNotifState(prev => ({...prev, isActive: false})), 3000)
    }, [notifState.isActive])

    return (
        <notificationContext.Provider value={showNotification}>
            {children}
            <div className={"notification " + (notifState.isActive && "isActive ") + " " + notifState.status}>
                    {notifState.message}
            </div>
        </notificationContext.Provider>
    )
}