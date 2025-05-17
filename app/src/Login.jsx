import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router';   
import { SHA256 } from 'crypto-js';
import $ from 'jquery'
import { useUser } from './userContext';

export default function Login(props) {
    const [credentials, setCredentials] = useState({accType: "Applicant", email: null, pwd: null});
    const [loginCode, setLoginCode] = useState();

    const setIsLogin = useUser().setIsLogin
    const setAccType = useUser().setAccType
    
    const navigate = useNavigate();

    function loginFormSubmit(event) {
        event.preventDefault()
       
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/login.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            data: JSON.stringify({...credentials, pwd: credentials['pwd'] ? SHA256(credentials.pwd).toString() : ""}),
            success(data) {
                if (data[0]) {
                    setIsLogin(data[0])
                    setAccType(data[2])
                    sessionStorage.setItem('accType', data[2])
                    console.log("Item Set: ", sessionStorage.getItem('accType'))
                    data[2] === "applicant" ?
                        navigate("/content/recruitments") : navigate("/content/createrecruitments")
                }
                
                setLoginCode(data[1])
            },
            error(data) {
                console.log("Data Failed")
            }
        })
    }

    function updateData(event) {
        setCredentials(prev => ({...prev, [event.target.id] : event.target.value}))
    }

    function loginError() {
        switch (loginCode) {
            default: 
                return null;

            case -1:
                return ("Details not Entered!")
                
            case -2:
                return ("Incorrect Credentials!")
        }
    }

    return (
        <>
                <div className="text-center divLoginPageHeading">
                    <h1 className="erms headerHeading">e - Recruitment Management System</h1>
                </div>
                <div className="divLoginBox">
                    <form name="loginForm" action="http://localhost:8000/src/login.php" method="post" onSubmit={(event) => loginFormSubmit(event)}>
                        <div className="mx-2 py-4 loginBox">
                            <div className="row justify-content-between m-0 mb-3">
                                <div className="col-6 pb-1 ps-5 fs-4 pe-0">
                                    <p className="text-decoration-underline m-0">Sign In</p>
                                </div>
                            
                                <div className="col-6 pe-5">
                                    <select onChange={(event) => updateData(event)} id="accType" name="accountType" className="form-select float-end loginTypeBox">
                                        <option>Applicant</option>
                                        <option>Recruiter</option>
                                    </select>
                                </div>
                            </div>
                            
                            <label className="form-label fs-4 px-5 pt-3">Applicant ID/Email/Phone</label>
                            <div className="px-4 py-2 px-5">
                                <input onChange={(event) => {updateData(event)}} value={credentials.email} id="email" type="text" name="email" 
                                        className="form-control-lg w-100" />
                            </div>
                            <label className="form-label fs-4 px-5 pt-3">Password</label>
                            <div className="px-4 py-2 px-5">
                                <input onChange={(event) => {updateData(event)}} value={credentials.pwd} id="pwd" type="password" name="pwd" 
                                        className="form-control-lg w-100" />
                            </div>
                            <p className="px-4 py-2 px-5 m-0" >{loginError()}</p>
                            <button className="btn btn-light btn-lg m-5 mt-3">Submit</button>
                                
                            <div className="m-0 divLoginBoxFooter">
                                <a onClick={() => navigate("/registration", {replace:true})} className="d-inline-block float-start text-decoration-none anchorRegistration"
                                    >Registration</a>
                                <a className="d-inline-block float-end text-decoration-none anchorForgotPassword"
                                        href="">Forgot Password</a>                
                            </div>
                        </div>
                    </form>
                    
                </div>

            <div>
            </div>
        </> 
    ) 
}