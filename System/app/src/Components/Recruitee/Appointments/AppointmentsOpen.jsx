import { useEffect, useState } from "react"
import { useConfirmModal } from "../../../Context/modalContext"
import { useNotification } from "../../../Context/notificationContext"
import $ from 'jquery'

export default function AppointmentsOpen() {
    const [appointments, setAppointments] = useState([])
    
    const Confirm = useConfirmModal()
    const notification = useNotification()

    function getAppointments() {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/viewAppointments/getAppointments.php",
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                setAppointments(data)
            },
            error: (jqXHR) => {
                if (jqXHR.status === 200) { 
                    setAppointments(prev => prev.length !== 0 ? [] : prev)
                }
            }
        })
    }
    
    async function accept(appointmentID) {
        const confirm = await Confirm("Are you sure you want to accept the offer?")
        confirm &&
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/viewAppointments/accept.php",
            data: JSON.stringify(appointmentID),
            success: () => {
                getAppointments()
                notification("Offer Accepted!", "success")
            },
            error: (jqXHR) => {
                notification("Offer could not be Accepted, try again", "fail")
            }
        })
    }

    async function reject(appointmentID) {
        const confirm = await Confirm("Are you sure you want to reject the offer?")
        confirm && $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/viewAppointments/reject.php",
            data: JSON.stringify(appointmentID),
            success: () => {
                getAppointments()
                notification("Offer Rejected", "success")
            },
            error: (jqXHR) => {
                notification("Offer could not be Rejected, try again", "fail")
            }
        })
    }
    
    
    useEffect(() => {
        getAppointments()
    }, [])

    return (
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Appointment Offers  {'>'}  Open Offers</span>
                </div>

                <div className="pt-2 ps-2">
                    {appointments.length ? appointments.map(appointment => (
                        <div className="card d-inline-block cardAppointment">
                            <h5 className="card-title fs-3 mb-3 text-center">{appointment.recruitmentID}</h5>
                            <p className="card-text fs-5">Post: <span>{appointment.postName}</span></p>
                            <p className="card-text fs-5">Salary: <span>{appointment.salary}</span></p>
                            <p className="card-text fs-5">Location: <span>{appointment.location}</span></p>
                            <p className="card-text fs-5">Offer Date: <span>{appointment.offerDate}</span></p>
                            <p className="card-text fs-5">Offer Deadline: <span>{appointment.offerLastDate}</span></p>
                            <button type="button" className="btn btn-light mt-2 me-2 rounded-2 buttonSubmit">View Appointment Letter</button>
                            
                            <br/>
                            <div className="d-flex justify-content-between">
                                {(appointment.offerStatus === "open") && (
                                    <>
                                        <button onClick={() => {accept(appointment.appointmentID)}} className="btn btn-light mt-2 rounded-2 buttonSubmit accept">Accept</button>
                                        <button onClick={() => {reject(appointment.appointmentID)}} className="btn btn-light mt-2 rounded-2 buttonSubmit reject">Reject</button>
                                    </>    
                                )}
                            
                                {(appointment.offerStatus !== "open") && (
                                    <button disabled onClick={() => {accept(appointment.appointmentID)}} className="btn btn-light mt-2 rounded-2 buttonSubmit accept accepted">Accepted!</button>
                                )}
                            </div>

                        </div>)) : (<p>No Open Offers</p>)
                    }
                    
                </div>
            </div>
        </>
    )
}