// Importing Dependencies
import { useEffect } from "react";
import $ from 'jquery'
import Login from './Components/Login'
import Registration from "./Components/Recruitee/Registration";
import Content from './Components/Content';
import Modal from "./Context/modalContext";
import Notification from "./Context/notificationContext";
import { useUser } from "./Context/userContext";
import { useRoutes } from "react-router";

export default function App() {
    
    // React state variables
    
    const context = useUser()
    const [isLogin, setIsLogin] = [context.isLogin, context.setIsLogin]
    const setUserID = context.setUserID

    document.getElementById('root').className = ["/"].includes(window.location.pathname) ? "root loginPage" : "root";

    // React Router paths

    const routes = useRoutes(
        !isLogin ? [
            {
                path: "/*",
                element: <Login/>,
            },
            {
                path: "/registration",
                element: <Registration/>
            }
        ] :
    
        [
            {
                path: "/content/*",
                element: <Content />,
            }
        ]   
    )
        
    // useEffect for calling sessionRequest() on page load

    useEffect(() => {
        if (!['/', '/registration'].includes(window.location.pathname)) {
            sessionRequest()
        }
    }, [isLogin]);
    
    // Request session data

    function sessionRequest () {
        $.ajax (
            {
                type: "GET",
                url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/session/sessionRequest.php",
                xhrFields: {
                    withCredentials: true, // Ensure cookies are sent with the request
                },
                success: (data) => {
                    if (data[0] === false) {
                        window.location.href = "/"
                    }

                    else {
                        setIsLogin(data[0])
                        setUserID(data[1])
                    }
                },
                error: () => {
                    console.log("Fetch Failed")
                }
            }
        )
    }

    return (
            <Notification>
                <Modal>
                    {routes}
                </Modal>
            </Notification>
    )  
}

// Destroy Session

export function sessionDestroy () {
    return new Promise((resolve) => {
        $.ajax({
            type: "GET",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/session/sessionDestroy.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            success: () => {
                resolve(true)
            },
            error: () => {
                console.log("Session Not Destroyed")
                resolve(false)
            }
    })})
}
