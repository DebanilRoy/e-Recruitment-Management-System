import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useConfirmModal } from '../../Context/modalContext'
import { SHA256 } from 'crypto-js'
import regex from '../../utils/regex'
import $ from 'jquery'

export function updateData(event, setDetails) {
    console.log("Update data called")
    setDetails(prevData => ({...prevData, [event.target.id]: event.target.value}))
}

export function inputCheck(event, regex) {
    return regex.test(event.target.value)
}

export function firstNameCheck(event, setDetails) {
    inputCheck(event, regex.firstNameRx) && updateData(event, setDetails)
}

export function lastNamecheck(event, setDetails) {
    inputCheck(event, regex.lastNameRx) && updateData(event, setDetails)
}

export function phoneNumberCheck(event, setDetails) {
    if (event.target.value.length > 10) {
        return
    } 
    
    else {
        inputCheck(event, regex.numberRx) && updateData(event, setDetails)
    }
}

export function pinCodeCheck(event, setDetails) {
    if (event.target.value.length > 6) {
        return
    } else {
        inputCheck(event, regex.numberRx) && updateData(event, setDetails)
    }
}

export default function Registration() {
    const [applicantDetails, setApplicantDetails] = useState({firstName: "", lastName: "", mobile: "", alternateMobile: ""})
    const [password, setPassword] = useState({password : "", repassword: ""})
    const [applicantID, setApplicantID] = useState(null)
    const [allowSubmit, setAllowSubmit] = useState(false)
    const [photo, setPhoto] = useState()

    const navigate = useNavigate()
    
    function setPhotoPreview(event) {
        try {
            const photo = event.target.files[0];
            setPhoto(URL.createObjectURL(photo))
        }
        
        catch {

        }
    }

    const confirmModal = useConfirmModal();
    
    async function register(event) {
        event.preventDefault()
        const confirm = await confirmModal("Are you sure you want to Register?")
        confirm && ($.ajax({
            type: "POST",
            url: "http://localhost:8000/src/registration/register.php",
            data: JSON.stringify(applicantDetails),
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            success: (data) => {
                setApplicantID(data)
            }
        }))
    }

    async function savePassword(event) {
        event.preventDefault()
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/registration/savePassword.php",
            data: JSON.stringify([{applicantID: applicantID, pwd: SHA256(password['password']).toString()}]),
            success: (data) => {
                navigate("/", {replace: true})
            },
            error: (data) => {

            }
        })
    }

    function updatePassword(event) {
        setPassword(prevData => ({...prevData, [event.target.id]: event.target.value}))
    }

    useEffect(()=> {
        document.body.style.overflow = "auto";
        document.getElementById("root").style.display = "block";
    }, [])

    return (
        !applicantID ? 
        
        <>
            <div className="p-1 pt-1 pb-2 text-center">
                <h1 id="headerRegistration" className="d-inline-block headerHeading">e - Recruitment Management System</h1>
            </div>
            
            <div className="p-3 rounded-2 bg-white">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Registration</span>
                </div>

                <div className="pt-2 ps-2">
                    <form onSubmit={(event) => {register(event)}} action="" className="formRegistration">               
                        <div className="fs-5 divFirstName" >
                            <label htmlFor="" className="form-label">First Name</label>
                            <input onChange={(event) => {firstNameCheck(event, setApplicantDetails)}}
                                    type="text" name="" id="firstName" value={applicantDetails.firstName.toUpperCase()}
                                    className={"form-control fs-5 border regFormText"}/>
                        </div>
                        <div className="fs-5 divLastName" >
                            <label htmlFor="" className="form-label">Last Name</label>
                            <input  onChange={(event) => {lastNamecheck(event, setApplicantDetails)}}
                                    type="text" name="" id="lastName" value={applicantDetails.lastName.toUpperCase()} 
                                    className="form-control fs-5 border regFormText"/>
                        </div>
                        <div className="fs-5 divFileInput">
                            <div className="divPhotoInput">
                                <label className="d-block">Photo</label>
                                <label htmlFor="photo" className="form-label labelPhoto">Upload</label>
                                <input onChange={(event) => {setPhotoPreview(event)}} type="file" accept="image/*" name="" id="photo"
                                        className=""/>
                                <img src={photo} width="200" height="200"/>
                                
                            </div>
                            <div className="fs-5 divDobProof">
                                <label className="form-label d-block">Proof of DoB</label>
                                <input type="file" className="" />
                            </div>
                            <div className="fs-5 divQualificationProof">
                                <label className="form-label d-block">Proof of Qualification</label>
                                <input type="file" className="" />
                            </div>
                            <div className="fs-5 divCategoryProof">
                                <label className="form-label d-block">Proof of Category</label>
                                <input type="file" className="" />
                            </div>
                            <div className="fs-5 divAddressProof">
                                <label className="form-label d-block">Proof of Address</label>
                                <input type="file" className="" />
                            </div>
                            
                        </div>
                        
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Date of Birth</label>
                            <input onChange={(event) => {updateData(event, setApplicantDetails)}} type="date" name="" id="dob" value={applicantDetails.dob}
                                    className="form-control fs-5 border regFormText"/>
                        </div>
                        <div className="w-50 fs-5">
                            <label htmlFor="" className="form-label">Email</label>
                            <input onChange={(event) => {(regex.emailRx.test(event.target.value) ? setAllowSubmit(true) : setAllowSubmit(false)); updateData(event, setApplicantDetails )}}
                                   type="email" name="" id="email" value={applicantDetails.email}
                                   className={(applicantDetails.email && regex.emailRx.test(applicantDetails.email) ? "accept " : "") + (applicantDetails.email && !regex.emailRx.test(applicantDetails.email) ? "reject " : "") + "form-control fs-5 border regFormText"}/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Mobile Number</label>
                            <input  onChange={(event) => {phoneNumberCheck(event, setApplicantDetails)}}
                                    type="text" name="phonenumber" id="mobile" value={applicantDetails.mobile}
                                    className="form-control fs-5 border regFormText"/>
                        </div>
                        <div className="w-50 fs-5">
                            <label htmlFor="" className="form-label">Alternate Mobile Number</label>
                            <input onChange={(event) => {phoneNumberCheck(event, setApplicantDetails)}}
                                    type="text" name="phonenumber" id="alternateMobile" value={applicantDetails.alternateMobile || ""}
                                    className="form-control fs-5 border regFormText"/>
                        </div>
                        
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Qualification</label>
                            <select className="form-control fs-5 border regFormText" 
                                onChange={(event) => {updateData(event, setApplicantDetails)}}
                                id="qualification"
                                >
                                <option value="12th">12th</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Doctorate">Doctorate</option>
                            </select>
                        </div>
        
                        <div className="w-50 fs-5">
                            <label htmlFor="" className="form-label">Category</label>
                            <select className="form-control fs-5 border regFormText" 
                                onChange={(event) => {updateData(event, setApplicantDetails)}}
                                id="category">
                                <option value="GEN">GEN</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                                <option value="OBC">OBC</option>
                            </select>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Address Line 1</label>
                            <input onChange={(event) => {updateData(event, setApplicantDetails)}} type="text" name="" id="addressFirstLine" className="form-control fs-5 border regFormText"
                                    value={applicantDetails.addressFirstLine}/>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Address Line 2</label>
                            <input onChange={(event) => {updateData(event, setApplicantDetails)}} type="text" name="" id="addressSecondLine" className="form-control fs-5 border regFormText"
                                    value={applicantDetails.addressSecondLine}/>
                        </div>
                    
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">City</label>
                            <input onChange={(event) => {updateData(event, setApplicantDetails)}} type="text" name="" id="city" className="form-control fs-5 border regFormText"
                                    value={applicantDetails.city || ""}/>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label">District</label>
                            <input onChange={(event) => {updateData(event, setApplicantDetails)}} type="text" name="" id="district" className="form-control fs-5 border regFormText"
                                value={applicantDetails.district}/>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label">State</label>
                            <input onChange={(event) => {updateData(event, setApplicantDetails)}} type="text" name="" id="state" className="form-control fs-5 border regFormText"
                                    value={applicantDetails.state}/>
                        </div>

                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Pin Code</label>
                            <input onChange={(event) => {pinCodeCheck(event, setApplicantDetails)}} type="text" name="" id="pinCode" className="form-control fs-5 border regFormText"
                                    value={applicantDetails.pinCode}/>
                        </div>

                        <div className="w-100 pb-2 text-center">
                            <button disabled={!allowSubmit} className="btn fs-5 buttonSubmit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </> : 
        
        <>
            <div className="p-1 pt-1 pb-2 text-center">
                <h1 id="headerRegistration" className="d-inline-block headerHeading">e - Recruitment Management System</h1>
            </div>
            
            <div className="p-3 rounded-2 bg-white">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Registration</span>
                </div>

                <div className="pt-2 ps-2">
                    <form onSubmit={(event) => {savePassword(event)}} action="" className="formPassword">               
                        <div>
                            <div className="fs-5" >
                                <label htmlFor="" className="form-label">Password</label>
                                <input onChange={(event) => {updatePassword(event, regex.firstNameRx)}}
                                        type="password" name="" id="password" value={password.password}
                                        className={(password.password && regex.passwordRx.test(password.password) ? "accept " : "") + (password.password && !regex.passwordRx.test(password.password) ? "reject " : "") + " form-control fs-5 border regFormText"}/>
                            </div>

                            <div className="fs-5" >
                                <label htmlFor="" className="form-label">Re-enter Password</label>
                                <input onChange={(event) => {updatePassword(event, regex.firstNameRx)}}
                                        type="password" name="" id="repassword" value={password.repassword}
                                        className={(password.repassword && regex.passwordRx.test(password.repassword) && password.repassword === password.password ? "accept " : "") + (password.repassword && (!regex.passwordRx.test(password.repassword) || password.repassword !== password.password ? "reject " : "")) + "form-control fs-5 border regFormText"}/>
                            </div>

                            <button disabled={(password.password !== password.repassword) ? true : false} 
                                    className="btn fs-5 buttonSubmit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}