import { useEffect } from "react";

import $ from 'jquery'
import Login from './Login'
import Registration from "./Registration";
import Content from './Content';
import Modal from "./confirmModal";
import Notification from "./notificationContext";
import { useUser } from "./userContext";
import { useRoutes } from "react-router";


export default function App() {  
    const context = useUser()
    const [isLogin, setIsLogin] = [context.isLogin, context.setIsLogin]
    const setUserID = context.setUserID

    document.getElementById('root').className = ["/"].includes(window.location.pathname) ? "root loginPage" : "root";

    console.log("Re render")

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
        
    useEffect(() => {
        if (!['/', '/registration'].includes(window.location.pathname)) {
            sessionRequest()
        }
    }, [isLogin]);
    
/*    useEffect(() => {
        switch (accType) {
            case "Applicant":
                setPage("ViewRecruitments")
                break
            case "Recruiter":
                setPage("CreateRecruitment")
                break
            default :
                break
        }
    }, [accType])
*/
    function sessionRequest () {
        $.ajax (
            {
                type: "GET",
                url: "http://localhost:8000/src/session/sessionRequest.php",
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

export function sessionDestroy () {
    return new Promise((resolve) => {
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/src/session/sessionDestroy.php",
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
