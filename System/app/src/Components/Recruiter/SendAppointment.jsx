// Import Dependencies

import { useEffect, useState } from "react"
import { useUser } from "../../Context/userContext"
import $ from 'jquery'
import { SHA256 } from "crypto-js";
import RecruitmentIDSearchBar from "../RecruitmentIDSearchBar";
import { useRecruitments } from "../../Context/recruitmentsContext";
import { getFile } from "../../utils/getFile";
import { useConfirmModal } from "../../Context/modalContext";
import { useNotification } from "../../Context/notificationContext";

// Main component

export default function SendAppointment() {
    const context = useUser();
    const userID = context.userID
    const [recruitmentData, setRecruitmentData] = useState({})
    const [applications, setApplications] = useState([]);
    const [checkedApplications, setCheckedApplications] = useState([])
    
    // Getting context variables and functions

    const {recruitments, getRecruitments, recruitmentDetails, getRecruitmentDetails} = useRecruitments()

    // Getting context components

    const confirmModal = useConfirmModal()
    const Notification = useNotification()

    useEffect(() => {
        getRecruitments()       
    }, [])

    // Sets 'isEnabled' variable as per status of application and availability of vacancies 

    if (recruitmentDetails) {
        var vacancyCount = {
            GEN: recruitmentDetails.vacancyGEN, 
            SC: recruitmentDetails.vacancySC, 
            ST: recruitmentDetails.vacancyST, 
            OBC: recruitmentDetails.vacancyOBC
        }   
    } 

    const applicationRender = applications.map(application => {

        if (application.isVerified === 0 || application.verifyStatus === -1 || ["rejected", "lapsed"].includes(application.offerStatus) ) {
            return {...application, isRowEnabled: false}
        }

        else {
            if (vacancyCount[application.category] > 0 ) {
                vacancyCount[application.category]--
            }

            else if (application.category !== "GEN" && vacancyCount[application.category] > 0 ) {
                vacancyCount[application.category]--
                
            }

            else {
                if (vacancyCount["GEN"] > 0) {
                    vacancyCount["GEN"]--
                }

                else {
                    return {...application, isEnabled: false}
                }
            }

            if (["open", "accepted"].includes(application.offerStatus)) {
                return {...application, isEnabled: false}
            }

            else {
                return {...application, isEnabled: true}
            }
            
        }                                             
    })
        
    // Retrieves recruitment data from backend

    function getRecruitmentData(event) {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/sendAppointments/getRecruitmentDetails.php",
            data: JSON.stringify($(event.target).find("select").val()),
            success: (data) => {
                setRecruitmentData({...data, remaining: (data['vacancytotal'] - (data['open'] + data['accepted']))})
            },
            error: () => {
                console.log("Error")
            }
        })
    }

    function updateVacancyCounter(event) {
        setRecruitmentData(prev => ({...prev, remaining: (event.target.checked) ? (prev.remaining - 1) : (prev.remaining + 1)}))
    }
    
    // Retrieves applications data from backend

    function getApplications(event) {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/sendAppointments/getApplications.php",
            data: JSON.stringify($(event.target).find("select").val()),
            success: (data) => {
                setApplications(data)
            },
            error: () => {
                console.log("Error: getApplicationDetails")
            }
        })
    }

    // Backend call to send appointment

    async function sendAppointment(event) {
        event.preventDefault()
        const sendConfirm = await confirmModal("Are you sure you want to send appointment?")
        if (sendConfirm) {
            const formData = new FormData();
            checkedApplications.forEach(application => {
                formData.append(application , $(event.target).find('input[type="file"]#' + application)[0].files[0])
            })

            formData.append("applications", JSON.stringify({applications: checkedApplications, userID: userID}))
            
            $.ajax({
                type: "POST",
                url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/sendAppointments/sendAppointments.php",
                data: formData,
                processData: false,
                contentType: false,
                success: () => {
                    setCheckedApplications([])
                    Notification("Appointment Sent", "success")
                },
                error: () => {
                    Notification("Error: Appointment could not be sent", "error")
                }
            })
        }
    }
  
    // Returns class label as per status of application

    function getClassLabel(status) {
        switch (status) {
            case "open":
                return "offerOpen"
            
            case "accepted":
                return "offerAccepted"
            
            case "rejected":
                return "offerRejectedLapsed"

            case "lapsed":
                return "offerRejectedLapsed"

            default:
                break;
        }
    }
    
    // Updates state variable for checked applications 
    
    function updateCheckedApplications(event, applicationID) {
        (event.target.checked) ? setCheckedApplications(prev => ([...prev, applicationID])) : setCheckedApplications(prev => prev.filter(appID => appID !== applicationID))
    }

    return (
        <>
            <div className="bodyDiv">
                <div className="ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <p className="mb-0 bodyHeading">Send Appointment</p>
                </div>
                <div className="pt-2 ps-2">
                    <div className="divRecruitmentInfo">
                        <form onSubmit={(event) => {getRecruitmentDetails(event); getRecruitmentData(event); getApplications(event)}}>
                            <RecruitmentIDSearchBar>
                                {recruitments.map(recruitment => 
                                    (
                                        recruitment.isFrozen && <option>{recruitment.recruitmentID}</option>
                                    )
                                )}
                            </RecruitmentIDSearchBar>
                            <button className="btn fs-5 buttonPrimary">Submit</button>
                        </form>

                        {recruitmentDetails && (
                            <>
                                <div className="divRecruitmentDetailsLabel">
                                    <p>Post Name : <span >{recruitmentDetails.postName}</span></p>
                                    <p>Location : <span >{recruitmentDetails.location}</span></p>
                                    <p>Total Applications : <span >{recruitmentDetails.applicationCount}</span></p>
                                    <p>Total Vacancies : <span >{recruitmentDetails.vacancyTotal}</span></p>
                                    <p>GEN : <span >{recruitmentDetails.vacancyGEN}</span></p>
                                    <p>SC : <span >{recruitmentDetails.vacancySC}</span></p>
                                    <p>ST : <span >{recruitmentDetails.vacancyST}</span></p>
                                    <p>OBC : <span >{recruitmentDetails.vacancyOBC}</span></p>
                                </div>
                
                                <div className="divAppointmentsDetails">
                                    <p className="fs-5">Appointments Open  : <span >{recruitmentData.open}</span></p>
                                    <p className="fs-5">Appointments Accepted  : <span >{recruitmentData.accepted}</span></p>
                                    <p className="fs-5">Appointments Rejected : <span >{recruitmentData.rejected_lapsed}</span></p>
                                    <p className="fs-5">Remaining Vacancies : <span >{recruitmentData.remaining}</span></p>
                                </div>
                            </>
                        )}
                    
                    </div>
                    
                    {recruitmentDetails && (
                        <form onSubmit={(event) => sendAppointment(event)}>
                            <table className="table tableSendAppointment">
                                <thead>
                                    <tr>
                                        <td colSpan="8">
                                            <input type="text" id="" placeholder="Search Application"
                                                className="form-control tableSearchBar"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th className="rank">Rank</th>
                                        <th className="subResAppltnID">ApplicationID</th>
                                        <th className="subResApplntName">Applicant Name</th>
                                        <th className="subResApplntID">ApplicantID</th>
                                        <th className="subResDob">Date of Birth</th>
                                        <th>Category</th>
                                        <th className="appointment">Appointment Letter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        applicationRender.map(application => {
                                            console.log(application.applicationID)
                                            
                                            return (
                                                <tr className={getClassLabel(application.offerStatus) + " " + ((!application.offerStatus && !application.isEnabled) ? "disabled" : "")}>
                                                    <td onChange={(event) => {updateVacancyCounter(event); updateCheckedApplications(event, application.applicationID)} } 
                                                        className="align-middle text-center checkboxSendAppointment">
                                                        {application.isEnabled && <input className="form-check-input align-middle m-0 checkbox" type="checkbox" id="checkboxNoLabel"/>} 
                                                    </td>
                                                    <td className="rank">{application.rank}</td>
                                                    <td>{application.applicationID.toUpperCase()}</td>
                                                    <td>{application.applicantName}</td>
                                                    <td>{application.applicantID}</td>
                                                    <td>{application.dob}</td>
                                                    <td>{application.category}</td>
                                                    <td>
                                                        { (application.offerStatus === null) 
                                                            ?   application.isEnabled
                                                                    && <input className="appntLetterUpload" type="file" id={application.applicationID} required={checkedApplications.includes(application.applicationID)} />
                                                                    
                                                            :   (<span onClick={() => {getFile(SHA256(application.applicationID).toString(), "appointments")}} className="offerFileLink">View Offer</span>) 
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <button className="btn buttonPrimary">Send Appointment</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}