import { createContext, useContext, useEffect, useState } from "react";

const notificationContext = createContext()

export const useNotification = () => useContext(notificationContext)

export default function Notification({children}) {
    const [notifState, setNotifState] = useState({isActive: false, message: "", status: "success"})

    function showNotification(message, status) {
        setNotifState({isActive: true, message: message.toUpperCase(), status})
    }

    useEffect(() => {
        notifState.isActive && setTimeout(() => setNotifState(prev => ({...prev, isActive: false})), 5000)
    }, [notifState.isActive])

    return (
        <notificationContext.Provider value={showNotification}>
            {children}
            <div className={"notification " + (notifState.isActive && "isActive ") + " " + notifState.status}>
                    <p>{notifState.message}</p>
            </div>
        </notificationContext.Provider>
    )
}