import { useEffect, useState } from "react"
import { useUser } from "../../Context/userContext"
import $ from 'jquery'
import RecruitmentIDSearchBar from "../RecruitmentIDSearchBar";
import { useRecruitments } from "../../Context/recruitmentsContext";
import { getFile } from "../../utils/getFile";
import { useConfirmModal } from "../../Context/modalContext";

export default function SendAppointment() {
    const context = useUser();
    const userID = context.userID
    const [recruitmentData, setRecruitmentData] = useState({})
    const [applications, setApplications] = useState([]);
    const [checkedApplications, setCheckedApplications] = useState([])
    
    const {recruitments, getRecruitments, recruitmentDetails, getRecruitmentDetails} = useRecruitments()

    const confirmModal = useConfirmModal()

    useEffect(() => {
        getRecruitments()
    }, [])

    if (recruitmentDetails) {
        var vacancyCount = {GEN: recruitmentDetails.vacancyGEN, 
                            SC: recruitmentDetails.vacancySC, 
                            ST: recruitmentDetails.vacancyST, 
                            OBC: recruitmentDetails.vacancyOBC
    }}

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
                }
            })
        }
    }
  
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
                                    <p className="">Post Name : <span className="">{recruitmentDetails.postName}</span></p>
                                    <p className="">Location : <span className="">{recruitmentDetails.location}</span></p>
                                    <p className="">Total Applications : <span className="">{recruitmentDetails.applicationCount}</span></p>
                                    <p className="">Total Vacancies : <span className="">{recruitmentDetails.vacancyTotal}</span></p>
                                    <p className="">GEN : <span className="">{recruitmentDetails.vacancyGEN}</span></p>
                                    <p className="">SC : <span className="">{recruitmentDetails.vacancySC}</span></p>
                                    <p className="">ST : <span className="">{recruitmentDetails.vacancyST}</span></p>
                                    <p className="">OBC : <span className="">{recruitmentDetails.vacancyOBC}</span></p>
                                </div>
                
                                <div className="divAppointmentsDetails">
                                    <p className="fs-5">Appointments Open  : <span className="">{recruitmentData.open}</span></p>
                                    <p className="fs-5">Appointments Accepted  : <span className="">{recruitmentData.accepted}</span></p>
                                    <p className="fs-5">Appointments Rejected : <span className="">{recruitmentData.rejected_lapsed}</span></p>
                                    <p className="fs-5">Remaining Vacancies : <span className="">{recruitmentData.remaining}</span></p>
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
                                            <input type="text" name="" id="" placeholder="Search Application"
                                                className="form-control tableSearchBar"/>
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th className=""></th>
                                        <th className="rank">Rank</th>
                                        <th className="subResAppltnID">ApplicationID</th>
                                        <th className="subResApplntName">Applicant Name</th>
                                        <th className="subResApplntID">ApplicantID</th>
                                        <th className="subResDob">Date of Birth</th>
                                        <th className="">Category</th>
                                        <th className="appointment">Appointment Letter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    applications.map(application => {
                                        var classname = null;
                                        
                                        if (application.verifyStatus === -1 || ["rejected", "lapsed"].includes(application.offerStatus) ) {
                                            classname = "disabled"
                                        }

                                        else {
                                            if (application.category === "GEN") {
                                                vacancyCount["GEN"] > 0 
                                                    ? vacancyCount[application.category]-- 
                                                    : classname = "disabled" 
                                            }

                                            else {
                                                vacancyCount[application.category] > 0 
                                                    ? vacancyCount[application.category]--     
                                                    : vacancyCount["GEN"] > 0  
                                                        ? vacancyCount["GEN"]-- 
                                                        : classname = "disabled"
                                            }                                          
                                        }
                                        
                                        return (
                                            <tr className={getClassLabel(application.offerStatus) + " " + ((!getClassLabel(application.offerStatus) ? (classname) : null))}>
                                                <td onChange={(event) => {updateVacancyCounter(event); updateCheckedApplications(event, application.applicationID)} } 
                                                    className="align-middle text-center checkboxSendAppointment">
                                                    {(application.offerStatus === null) 
                                                        && ((application.category === "GEN" ? vacancyCount["GEN"] > 0 : vacancyCount[application.category] > 0 || vacancyCount["GEN"] > 0 
                                                        && !checkedApplications.includes(application.applicationID) || !(classname === "disabled"))) 
                                                        && <input className="form-check-input align-middle m-0 checkbox" type="checkbox" id="checkboxNoLabel"/>} 
                                                </td>
                                                <td className="rank">{application.rank}</td>
                                                <td className="">{application.applicationID.toUpperCase()}</td>
                                                <td className="">{application.applicantName}</td>
                                                <td className="">{application.applicantID}</td>
                                                <td className="">{application.dob}</td>
                                                <td className="">{application.category}</td>
                                                <td className="">{(application.offerStatus === null) ? (
                                                    <input  disabled={(!recruitmentData.remaining && !checkedApplications.includes(application.applicationID) || (classname === "disabled")) ? true : false} 
                                                            className="appntLetterUpload" type="file" 
                                                            id={application.applicationID} 
                                                            required={checkedApplications.includes(application.applicationID)}/>) : (<span onClick={() => {getFile(application.offerFileName, "appointments")}} className="offerFileLink">View Offer</span>) }</td>
                                            </tr>
                                                )
                                                
                                    }
                                    
                                    )
                                    }
                                </tbody>
                            </table>

                            <button name="" id="" className="btn buttonPrimary">Send Appointment</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}