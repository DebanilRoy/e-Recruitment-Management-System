// Import Dependencies
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useUser } from '../../Context/userContext'
import { useNotification } from '../../Context/notificationContext'
import { useConfirmModal } from '../../Context/modalContext'
import $ from 'jquery'

// Main Component

export default function Apply() {
    const spaceRx = /\s/
    const nameRx = /[0-9\s]+/
    const numberRx = /[^0-9]/
    const emailRx = /^[a-z0-9]+@([a-z0-9]+([\.-][a-z0-9]+)*)\.[a-z]{2,}$/
    
    const [applicantDetails, setApplicantDetails] = useState({})
    const userID = useUser().userID    
    const { recruitmentID, postName } = useLocation().state

    const navigate = useNavigate()
    
    // Getting context components

    const Confirm = useConfirmModal()
    const notification = useNotification()


    // Retrives applicant data from backend

    function getApplicantData() {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/apply/getApplicantData.php",
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

    // Updates state variable as per change in input component

    function updateData(event) {
        setApplicantDetails(prevData => ({...prevData, [event.target.id]: event.target.value}))
    }
    
    // Backend call to submit application

    async function submitApplication(event) {
        event.preventDefault()
        const confirm = await Confirm("Are you sure you want to submit the Application?")
        confirm && $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/apply/submitApplication.php",
            data: JSON.stringify(applicantDetails),
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            success: () => {
                console.log("Application Submitted!")
                navigate("/content/recruitmentsOpen", {replace: true})
                notification("Application Submitted!", "success")
            },
            error: () => {
                notification("Application could not be Submitted", "fail")
            }
        })
        
    }

    // Checks the input for proper format
    
    function inputCheck(event, regex) {    
        if (regex.test(event.key)) {
            event.preventDefault();
        }
    }

    // Checks the phone number input for proper format

    function phoneNumberCheck(event) {
        if (["Backspace", "Tab"].includes(event.key)) {
            return
        }

        else {
            inputCheck(event, numberRx); 
        }
    }

    // Changes input characters to uppercase

    function upperCase(event) {
        if (!nameRx.test(event.target.value))
            event.target.value = event.target.value.toUpperCase();
    }

    // Block scrolling in certain input components

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
                        <span onClick={() => {navigate("/content/recruitmentsopen", {replace: true})}}>  Open Recruitments  </span>  
                            {'>'}  Apply ({postName})</span>
                </div>
                
                <div className="pt-2 ps-2">  
                    <form onSubmit={(event) => {submitApplication(event)}} action="" className="formApply">
                            <div className="fs-5">
                                <label className="form-label d-block">Applicant ID</label>
                                <input disabled type="text" id="name" value={applicantDetails.applicantID}  
                                className="form-control fs-5 applyFormText"/>
                            </div>                           
                            <div className="fs-5" >
                                <label className="form-label d-block">First Name</label>
                                <input  disabled onChange={(event) => {upperCase(event)}} 
                                        onKeyDown={(event) => {inputCheck(event, nameRx)}} 
                                        type="text" value={applicantDetails.firstName}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5" >
                                <label className="form-label d-block">Last Name</label>
                                <input  disabled onChange={(event) => {upperCase(event)}} 
                                        onKeyDown={(event) => {inputCheck(event, nameRx)}} 
                                        type="text" value={applicantDetails.lastName} 
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5">
                                <label className="form-label d-block">Date of Birth</label>
                                <input  disabled type="date" value={applicantDetails.dob}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5">
                                <label className="form-label d-block">Email</label>
                                <input  disabled onKeyDown={(event) => {inputCheck(event, spaceRx)}} 
                                        type="email" value={applicantDetails.email}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5">
                                <label className="form-label d-block">Mobile Number</label>
                                <input  disabled onKeyDown={(event) => {phoneNumberCheck(event, numberRx)}} 
                                        onFocus={(event) => {addScrollBlock(event)}} 
                                        onBlur={() => {deleteScrollBlock()}} 
                                        type="number" maxLength={10} name="phonenumber" value={applicantDetails.mobile}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            <div className="fs-5">
                                <label className="form-label d-block">Alternate Mobile Number</label>
                                <input onKeyDown={(event) => {phoneNumberCheck(event)}} 
                                        onChange={(event) => {updateData(event)}}
                                        onFocus={(event) => {addScrollBlock(event)}}
                                        onBlur={() => {deleteScrollBlock()}}
                                        type="number" name="phonenumber" value={applicantDetails.alternateMobile || ""}
                                        className="form-control fs-5 applyFormText"/>
                            </div>
                            
                            <div className="fs-5">
                                <label className="form-label d-block">Qualification</label>
                                <select disabled className="form-control fs-5 applyFormText" value={applicantDetails.qualification}>
                                    <option value="">12th</option>
                                    <option value="">Graduate</option>
                                    <option value="">Post Graduate</option>
                                    <option value="">Doctorate</option>
                                </select>
                            </div>
            
                            <div id="category" className="fs-5">
                                <label  className="form-label d-block">Category</label>
                                <select disabled className="form-control fs-5 applyFormText" value={applicantDetails.category}>
                                    <option value="">GEN</option>
                                    <option value="">SC</option>
                                    <option value="">ST</option>
                                    <option value="">OBC</option>
                                </select>
                            </div>

                            <div className="fs-5">
                                <label className="form-label d-block">Address Line 1</label>
                                <input  onChange={(event) => {updateData(event)}} type="text" id="addressFirstLine" 
                                        className="form-control fs-5 applyFormText"
                                        value={applicantDetails.addressFirstLine}/>
                            </div>

                            <div className="fs-5">
                                <label className="form-label d-block">Address Line 2</label>
                                <input onChange={(event) => {updateData(event)}} type="text" 
                                       className="form-control fs-5 applyFormText"
                                       value={applicantDetails.addressSecondLine}/>
                            </div>
                        
                            <div className="fs-5">
                                <label className="form-label d-block">City</label>
                                <input onChange={(event) => {updateData(event)}} type="text" id="city" 
                                       className="form-control fs-5 applyFormText"
                                       value={applicantDetails.city || ""}/>
                            </div>

                            <div className="fs-5">
                                <label className="form-label d-block">District</label>
                                <input onChange={(event) => {updateData(event)}} type="text" 
                                    className="form-control fs-5 applyFormText"
                                    value={applicantDetails.district}/>
                            </div>

                            <div className="fs-5">
                                <label className="form-label d-block">State</label>
                                <input onChange={(event) => {updateData(event)}} type="text" 
                                    className="form-control fs-5 applyFormText"
                                        value={applicantDetails.state}/>
                            </div>

                            <div className="fs-5">
                                <label className="form-label d-block">Pin Code</label>
                                <input onChange={(event) => {updateData(event)}} type="text" 
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