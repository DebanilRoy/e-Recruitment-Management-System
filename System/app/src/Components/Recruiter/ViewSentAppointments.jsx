// Import Dependencies

import { useState, useEffect } from "react";
import $ from 'jquery'
import { SHA256 } from "crypto-js";
import RecruitmentIDSearchBar from "../RecruitmentIDSearchBar";
import { useRecruitments } from "../../Context/recruitmentsContext";
import { getFile } from "../../utils/getFile";

// Main Component

export default function ViewSentAppointments() {
    const [recruitmentData, setRecruitmentData] = useState({})
    const [appointments, setAppointments] = useState([]);
    
    // Getting context state components and functions

    const {recruitments, getRecruitments, recruitmentDetails, getRecruitmentDetails} = useRecruitments()
    
    useEffect(() => {
        getRecruitments()
    }, [])

    // Retrieve appointments data from backend

    function getAppointments(event) {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/sentAppointments/getAppointments.php",
            data: JSON.stringify($(event.target).find("select").val()),
            success: (data) => {
                setAppointments(data)
            },
            error: () => {
                console.log("Error: getApppointments")
            }
        })
    }

    // Retrieve recruitments data from backend

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

    // Returns class label as per application status

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

    return (
        <>
            <div className="bodyDiv">
                <div className="ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <p className="mb-0 bodyHeading">View Sent Appointments</p>
                </div>
                <div className="pt-2 ps-2">
                    <div className="divRecruitmentInfo">
                        <form onSubmit={(event) => {getRecruitmentDetails(event); getRecruitmentData(event); getAppointments(event)}}>
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
                                    <p>Post Name : <span>{recruitmentDetails.postName}</span></p>
                                    <p>Location : <span>{recruitmentDetails.location}</span></p>
                                    <p>Total Applications : <span>{recruitmentDetails.applicationCount}</span></p>
                                    <p>Total Vacancies : <span>{recruitmentDetails.vacancyTotal}</span></p>
                                    <p>GEN : <span>{recruitmentDetails.vacancyGEN}</span></p>
                                    <p>SC : <span>{recruitmentDetails.vacancySC}</span></p>
                                    <p>ST : <span>{recruitmentDetails.vacancyST}</span></p>
                                    <p>OBC : <span>{recruitmentDetails.vacancyOBC}</span></p>
                                </div>
                
                                <div className="divAppointmentsDetails">
                                    <p className="fs-5">Appointments Open  : <span>{recruitmentData.open}</span></p>
                                    <p className="fs-5">Appointments Accepted  : <span>{recruitmentData.accepted}</span></p>
                                    <p className="fs-5">Appointments Rejected : <span>{recruitmentData.rejected_lapsed}</span></p>
                                    <p className="fs-5">Remaining Vacancies : <span>{recruitmentData.remaining}</span></p>
                                </div>
                            </>
                        )}
                    
                    </div>
                    
                    {recruitmentDetails && (
                        <>
                            <table className="table tableSendAppointment">
                                <thead>
                                    <tr>
                                        <td colSpan="8">
                                            <input type="text" placeholder="Search Application"
                                                className="form-control tableSearchBar"/>
                                        </td>
                                    </tr>
                                    <tr>
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
                                        appointments.map(appointment => {                          
                                            return (
                                                <tr className={getClassLabel(appointment.offerStatus) + " " + ((!getClassLabel(appointment.offerStatus) ? (classname) : null))}>
                                                    <td className="rank">{appointment.rank}</td>
                                                    <td>{appointment.applicationID.toUpperCase() ?? ""}</td>
                                                    <td>{appointment.applicantName}</td>
                                                    <td>{appointment.applicantID}</td>
                                                    <td>{appointment.dob}</td>
                                                    <td>{appointment.category}</td>
                                                    <td>
                                                    <span onClick={() => {getFile(SHA256(appointment.applicationID).toString(), "appointments")}} className="offerFileLink">View Offer</span></td>
                                                </tr>
                                            )                                                
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}