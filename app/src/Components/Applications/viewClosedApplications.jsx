import { useState, useEffect } from "react";
import $ from 'jquery'

export default function ViewClosedApplications() {
    const [closedApplications, setClosedApplications] = useState([])
    const [applicationStatus, setApplicationStatus] = useState(null)
    
    function getClosedApplications() {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/viewApplications/getClosedApplications.php",
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                setClosedApplications(data)    
            },
            error: (jqXHR) => {
                if (jqXHR.status === 200) {
                    $("#null_applications").show()
                }
                else {
                    console.log("Error")
                }
            }
        })
    }

    useEffect(() => {
        getClosedApplications()
    }, [])

    return (
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Applications  {'>'}  Closed Applications</span>
                </div>
            
                <div className="pt-2 ps-2 test">         
                    <div id="statusCards" className={"divApplicationStatusCards " + ((applicationStatus !== null) && ("statusOpen"))}>
                        {(closedApplications.length) ? closedApplications.map(application => (
                            <div className="card d-inline-block cardApplication"> 

                            <h5 className="card-title fs-3 mb-3 text-center">{application.applicationID.toUpperCase()}</h5>
                            <p className="card-text fs-5">Post: <span>{application.postName}</span></p>
                            <p className="card-text fs-5">Salary: <span>{application.salary}</span></p>
                            <p className="card-text fs-5">Location: <span>{application.location}</span></p>
                            <div className="divButtons">
                                <button type="button" className="btn btn-light mt-2 me-2 rounded-2 buttonSubmit">View Full Advertisement</button>
                                <button onClick={() => {setApplicationStatus(application)}} type="button" className="btn btn-light float-end mt-2 rounded-2 buttonSubmit">Status</button>
                            </div>

                            </div>
                        )) : null}
                        <p id="null_applications">No Cancelled applications!</p>
                    </div>
                    {(applicationStatus !== null) && (<div id="status" className="d-inline-block card cardApplicationStatus open">

                            <div className="d-inline-block w-100">
                                <h2 className="d-inline-block card-title mb-2 text-center bottomp">{applicationStatus.applicationID.toUpperCase()}</h2>
                                <svg onClick={() => {setApplicationStatus(null)}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" 
                                className="btn bi bi-x-lg float-end sideBarCloseButton" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                            </div>
                                         
                            <p className="mb-1">Application Date : <span>{applicationStatus.submissionDate}</span></p>
                            <p className="mb-1">Post : <span>{applicationStatus.postName}</span></p>
                            <p className="mb-1">Salary : <span>{applicationStatus.salary}</span></p>
                            <p className="mb-1">Location : <span>{applicationStatus.location}</span></p>
                            <p className="mb-1">Open Date : <span>{applicationStatus.datePublished}</span></p>
                            <p className="mb-1">Close Date : <span>{applicationStatus.appLastDate}</span></p>

                            <div className="status">
                                <p>Status : <span>{applicationStatus.status}</span></p>
                            </div>
                            
                            <button type="button" className="btn btn-light mt-2 rounded-2 buttonSubmit">View Full Advertisement</button>

                    </div>)}
                </div>     
            </div>
        </>
    )
}