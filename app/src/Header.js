import { useState } from "react"
import $ from 'jquery'
import { useNavigate } from "react-router";
import { sessionDestroy } from "./App";
import { useUser } from "./userContext";

export default function Header() {
    const navigate = useNavigate();
    const {setIsLogin, setAccType} = useUser()

    async function logout() {
        sessionStorage.clear();

        if (await sessionDestroy()) {
            setIsLogin(false);
            setAccType(null);
            navigate("/", {replace : true})
        }
    }
    
    return (
        <>
            <div className="header">
                
                <h1 className="headerHeading">e-Recruitment Management System</h1>
                
                <p>{"Welcome, " + useUser().userID}</p>
                
                <div className="profileCircle">
                    <div onClick={() => {navigate("/content/profile", {replace: true})}} style={{"cursor": "pointer"}}>
                        <img src="/profile.png" width="55" height="55"/>
                        <p style={{"font-size" : "14px", "text-align" : "center", "height" : "20px"}} className="m-0">Profile</p>
                    </div>
                    <div onClick={() => {logout()}} style={{"cursor": "pointer"}}>
                        <img src="/icon_logout.png" width="55" height="55"/>
                        <p style={{"font-size" : "14px", "text-align" : "center", "height" : "20px"}} className="m-0">Logout</p>
                    </div>                   
                </div>
            </div>
        </>
    )
}