// Import Dependencies

import { useState } from 'react'
import { Link, useNavigate } from 'react-router';   
import { SHA256 } from 'crypto-js';
import $ from 'jquery'
import { useUser } from '../Context/userContext';

// Component 'Login'

export default function Login() {
    const [credentials, setCredentials] = useState({accType: "Applicant", email: "", pwd: ""});
    const [loginCode, setLoginCode] = useState(null);

    // Getting context variables

    const setIsLogin = useUser().setIsLogin
    const setAccType = useUser().setAccType
    
    const navigate = useNavigate();

    // Backend API Call for Login

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
                    switch (data[2]) {
                        case "applicant":
                            navigate("/content/recruitmentsopen")
                            break;
                        case "recruiter":
                            navigate("/content/createrecruitments")
                            break;
                    }   
                }
                setLoginCode(data[1])
            },
            error(data) {
                console.log("Data Failed")
            }
        })
    }

    // Updates React State variable as per change in input elements

    function updateData(event) {
        setCredentials(prev => ({...prev, [event.target.id] : event.target.value}))
    }

    // Returns Login Error Message Based on Login Code

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
            
            <form className="loginBox" name="" method="post" onSubmit={(event) => loginFormSubmit(event)}>
                <p className="fs-5">Sign In</p>

                <select onChange={(event) => updateData(event)} id="accType" name="accountType" className="form-select float-end ">
                    <option>Applicant</option>
                    <option>Recruiter</option>
                </select>

                <label className="form-label fs-5">Applicant ID/Email/Phone</label>
                <input onChange={(event) => {updateData(event)}} value={credentials.email} id="email" type="text" name="email" className="form-control fs-5" />

                <label className="form-label fs-5">Password</label>
                <input onChange={(event) => {updateData(event)}} value={credentials.pwd} id="pwd" type="password" name="pwd" 
                            className="form-control fs-5" />

                <p className="loginError">{loginError()}</p>
                
                <button className="btn buttonSubmit">Submit</button>   

                <Link to="/registration"  className="anchorRegistration">Registration</Link>             

            </form>
        </> 
    ) 
}