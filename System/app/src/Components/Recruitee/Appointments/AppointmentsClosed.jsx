import { useState, useEffect } from "react";
import $ from 'jquery'

export default function AppointmentsClosed() {
    const [closedAppointments, setClosedAppointments] = useState([]);

    function getClosedAppointments() {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/viewAppointments/getClosedAppointments.php",
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                setClosedAppointments(data)
            },
            error: (jqXHR) => {
                if (jqXHR.status !== 200) {
                    console.log("Error")
                }
            }
        })
    }

    useEffect(() => {
        getClosedAppointments()
    }, [])

    return(
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Lapsed/Rejected Offers</span>
                </div>

                <div className="pt-2 ps-2">
                    <div className="divAppointments">
                        {closedAppointments.length ? (closedAppointments.map(appointment => (
                            <div className="card cardAppointment">

                                <h5 className="card-title fs-3 mb-3 text-center">{appointment.recruitmentID}</h5>
                                <p className="card-text fs-5">Post: <span>{appointment.postName}</span></p>
                                <p className="card-text fs-5">Salary: <span>{appointment.salary}</span></p>
                                <p className="card-text fs-5">Location: <span>{appointment.location}</span></p>
                                <p className="card-text fs-5">Offer Date: <span>{appointment.offerDate}</span></p>
                                <p className="card-text fs-5">Offer Deadline: <span>{appointment.offerLastDate}</span></p>
                                <button type="button" className="btn btn-light mt-2 me-2 rounded-2 buttonSubmit">View Appointment Letter</button>
                                
                                {(appointment.offerStatus !== "open") && (
                                    <p disabled className={"m-0  pt-2 rounded-2 text-center buttonSubmit" + appointment.offerStatus}>{appointment.offerStatus.toUpperCase()}</p>
                                )}
                            </div>

                        ))) : (<p>No Open Offers</p>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}