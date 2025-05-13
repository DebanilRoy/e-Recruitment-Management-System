import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useUser } from './userContext'
import { useNotification } from './notificationContext'
import { useConfirmModal } from './confirmModal'
import $ from 'jquery'

export default function Apply() {
    const spaceRx = /\s/
    const nameRx = /[0-9\s]+/
    const numberRx = /[^0-9]/
    const emailRx = /^[a-z0-9]+@([a-z0-9]+([\.-][a-z0-9]+)*)\.[a-z]{2,}$/
    
    const [applicantDetails, setApplicantDetails] = useState({})
    const userID = useUser().userID    
    const { recruitmentID, postName } = useLocation().state

    const navigate = useNavigate()
    const Confirm = useConfirmModal()
    const notification = useNotification()

    function getApplicantData(ID) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/apply/getApplicantData.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            success: (data) => {
                setApplicantDetails({   applicantID: userID, recruitmentID: recruitmentID, email: data.email, mobile: data.mobile, alternateMobile: data.alternateMobile, 
                                        firstName: data.firstName, lastName: data.lastName, dob: data.dob, qualification: data.qualification, category: data.category,
                                        addressFirstLine: data.addressFirstLine, addressSecondLine: data.addressSecondLine,
                                        city:data.city, district: data.district, state: data.state, pinCode: data.pinCode})
            }
        })
    }

    useEffect(() => getApplicantData(), [])

    function updateData(event) {
        setApplicantDetails(prevData => ({...prevData, [event.target.id]: event.target.value}))
    }
    
    async function submitApplication(event) {
        event.preventDefault()
        const confirm = await Confirm("Are you sure you want to submit the Application?")
        confirm && $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/apply/submitApplication.php",
            data: JSON.stringify(applicantDetails),
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            success: () => {
                console.log("Application Submitted!")
                navigate("/content/recruitments", {replace: true})
                notification("Application Submitted!", "success")
            },
            error: () => {
                notification("Application could not be Submitted", "fail")
            }
        })
        
    }

    function inputCheck(event, regex) {    
        if (regex.test(event.key)) {
            event.preventDefault();
        }
    }

    function phoneNumberCheck(event) {
        if (["Backspace", "Tab"].includes(event.key)) {
            return
        }

        else {
            inputCheck(event, numberRx); 
        }
    }

    function upperCase(event) {
        if (!nameRx.test(event.target.value))
            event.target.value = event.target.value.toUpperCase();
    }

    function scrollBlock(event) {
        let classname = event.target.name;
        if(classname && classname.includes("phonenumber")){
            event.preventDefault()
        }
    }

    function addScrollBlock() {
        document.addEventListener("wheel", scrollBlock, {passive: false});     
    }

    function deleteScrollBlock() {
        document.removeEventListener("wheel", scrollBlock, {passive: false});
    }

    return (
        <>
            <div className="d-inline-block bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Recruitment  {'>'}  
                        <span onClick={() => {navigate("/content/recruitments", {replace: true})}}>  Open Recruitments  </span>  
                            {'>'}  Apply ({postName})</span>
                </div>
                
                <div className="pt-2 ps-2">  
                    <form onSubmit={(event) => {submitApplication(event)}} action="" className="formApply">
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Applicant ID</label>
                                <input disabled type="text" name="" id="name" value={applicantDetails.applicantID}  
                                className="form-control fs-5 applyFormText"/>
                            </div>                           
                            <div className="fs-5" >
                                <label htmlFor="" className="form-label d-block">First Name</label>
                                <input  disabled onChange={(event) => {upperCase(event)}} 
                                        onKeyDown={(event) => {inputCheck(event, nameRx)}} 
                                        type="text" name="" id="" value={applicantDetails.firstName}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5" >
                                <label htmlFor="" className="form-label d-block">Last Name</label>
                                <input  disabled onChange={(event) => {upperCase(event)}} 
                                        onKeyDown={(event) => {inputCheck(event, nameRx)}} 
                                        type="text" name="" id="" value={applicantDetails.lastName} 
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Date of Birth</label>
                                <input  disabled type="date" name="" id="" value={applicantDetails.dob}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Email</label>
                                <input  disabled onKeyDown={(event) => {inputCheck(event, spaceRx)}} 
                                        
                                        type="email" name="" id="" value={applicantDetails.email}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Mobile Number</label>
                                <input  disabled onKeyDown={(event) => {phoneNumberCheck(event, numberRx)}} 
                                        onFocus={(event) => {addScrollBlock(event)}} 
                                        onBlur={() => {deleteScrollBlock()}} 
                                        type="number" maxLength={10} name="phonenumber" id="" value={applicantDetails.mobile}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Alternate Mobile Number</label>
                                <input onKeyDown={(event) => {phoneNumberCheck(event)}} 
                                        onChange={(event) => {updateData(event)}}
                                        onFocus={(event) => {addScrollBlock(event)}}
                                        onBlur={() => {deleteScrollBlock()}}
                                        type="number" name="phonenumber" id="" value={applicantDetails.alternateMobile || ""}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Qualification</label>
                                <select disabled className="form-control fs-5 applyFormText" value={applicantDetails.qualification}>
                                    <option value="">12th</option>
                                    <option value="">Graduate</option>
                                    <option value="">Post Graduate</option>
                                    <option value="">Doctorate</option>
                                </select>
                            </div>
            
                            <div id="category" className="fs-5">
                                <label htmlFor=""  className="form-label d-block">Category</label>
                                <select disabled className="form-control fs-5 applyFormText" value={applicantDetails.category}>
                                    <option value="">GEN</option>
                                    <option value="">SC</option>
                                    <option value="">ST</option>
                                    <option value="">OBC</option>
                                </select>
                            </div>

                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Address Line 1</label>
                                <input  onChange={(event) => {updateData(event)}} type="text" name="" id="addressFirstLine" 
                                        className="form-control fs-5 applyFormText"
                                        value={applicantDetails.addressFirstLine}/>
                            </div>

                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Address Line 2</label>
                                <input onChange={(event) => {updateData(event)}} type="text" name="" id="" 
                                       className="form-control fs-5 applyFormText"
                                       value={applicantDetails.addressSecondLine}/>
                            </div>
                        
                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">City</label>
                                <input onChange={(event) => {updateData(event)}} type="text" name="" id="city" 
                                       className="form-control fs-5 applyFormText"
                                       value={applicantDetails.city || ""}/>
                            </div>

                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">District</label>
                                <input onChange={(event) => {updateData(event)}} type="text" name="" id="" 
                                    className="form-control fs-5 applyFormText"
                                    value={applicantDetails.district}/>
                            </div>

                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">State</label>
                                <input onChange={(event) => {updateData(event)}} type="text" name="" id="" 
                                    className="form-control fs-5 applyFormText"
                                        value={applicantDetails.state}/>
                            </div>

                            <div className="fs-5">
                                <label htmlFor="" className="form-label d-block">Pin Code</label>
                                <input onChange={(event) => {updateData(event)}} type="text" name="" id="" 
                                    className="form-control fs-5 applyFormText"
                                        value={applicantDetails.pinCode}/>
                            </div>

                            <div>
                                <button className="btn fs-5 buttonSubmit">Submit</button>
                            </div>
                    </form>
                </div>
            </div>
        
        </>
    )
}