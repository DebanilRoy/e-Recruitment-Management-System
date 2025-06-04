import { useState, useEffect } from "react";
import { useRecruitments } from "../../Context/recruitmentsContext";

export default function ViewSentAppointments() {
    const [recruitmentData, setRecruitmentData] = useState({})
    const [appointments, setAppointments] = useState([]);
    
    const {recruitments, getRecruitments, recruitmentDetails, getRecruitmentDetails} = useRecruitments()
    
    useEffect(() => {
        getRecruitments()
    }, [])

    function getAppointments(event) {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/sentAppointments/getAppointments.php",
            data: JSON.stringify($(event.target).find("input#recruitmentID").val()),
            success: (data) => {
                setAppointments(data)
            },
            error: () => {
                console.log("Error: getApppointments")
            }
        })
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
                                                                               
                                        return (
                                            <tr className={getClassLabel(application.offerStatus) + " " + ((!getClassLabel(application.offerStatus) ? (classname) : null))}>
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