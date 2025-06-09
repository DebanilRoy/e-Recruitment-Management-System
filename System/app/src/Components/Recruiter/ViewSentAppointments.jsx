import { useState, useEffect } from "react";
import $ from 'jquery'
import { SHA256 } from "crypto-js";
import RecruitmentIDSearchBar from "../RecruitmentIDSearchBar";
import { useRecruitments } from "../../Context/recruitmentsContext";
import { getFile } from "../../utils/getFile";

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
            data: JSON.stringify($(event.target).find("select").val()),
            success: (data) => {
                setAppointments(data)
            },
            error: () => {
                console.log("Error: getApppointments")
            }
        })
    }

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
                        <>
                            <table className="table tableSendAppointment">
                                <thead>
                                    <tr>
                                        <td colSpan="8">
                                            <input type="text" name="" id="" placeholder="Search Application"
                                                className="form-control tableSearchBar"/>
                                        </td>
                                    </tr>
                                    <tr className="">
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
                                        appointments.map(appointment => {                          
                                            return (
                                                <tr className={getClassLabel(appointment.offerStatus) + " " + ((!getClassLabel(appointment.offerStatus) ? (classname) : null))}>
                                                    <td className="rank">{appointment.rank}</td>
                                                    <td className="">{appointment.applicationID.toUpperCase()}</td>
                                                    <td className="">{appointment.applicantName}</td>
                                                    <td className="">{appointment.applicantID}</td>
                                                    <td className="">{appointment.dob}</td>
                                                    <td className="">{appointment.category}</td>
                                                    <td className="">
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