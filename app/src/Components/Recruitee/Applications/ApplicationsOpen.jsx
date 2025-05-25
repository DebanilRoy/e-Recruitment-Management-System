import { useEffect, useState } from 'react'
import $ from 'jquery'
import { useConfirmModal } from '../../../Context/modalContext'
import { useNotification } from '../../../Context/notificationContext'

export default function ApplicationsOpen() {
    const [applications, setApplications] = useState([])
    const [applicationStatus, setApplicationStatus] = useState(null)

    const confirmModal = useConfirmModal()
    const notification = useNotification()

    function getApplications() {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/viewApplications/getApplications.php",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: () => {<h1>Hello</h1>},
            success: (data) => {
                setApplications(data)    
            },
            error: () => {
                $("#null_applications").show()
                setApplications([])
                
                setApplicationStatus(null)

            }
        })
    }

    useEffect(() => {
        getApplications()
    }, [])

    async function cancelApplication(applicationID) {
        const confirm = await confirmModal("Are you sure you want to Cancel the Application?")
        confirm && $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/viewApplications/cancelApplication.php",
            data: JSON.stringify(applicationID),
            success: () => {
                getApplications()
                notification("Application Cancelled", "success")
            },
            error: () => {
                console.log("Error: cancelApplication")
            }
        })
    }

    return (
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Applications  {'>'}  Submitted Applications</span>
                </div>
            
                <div className="pt-2 ps-2 test">         
                    <div id="statusCards" className={"divApplicationStatusCards " + ((applicationStatus !== null) && ("statusOpen"))}>
                        {(applications.length) ? applications.map(application => (
                            <div className="card d-inline-block cardApplication"> 
                                    <h5 className="card-title fs-3 mb-3 text-center">{application.applicationID.toUpperCase()}</h5>
                                    <p className="card-text fs-5">Post: <span>{application.postName}</span></p>
                                    <p className="card-text fs-5">Salary: <span>{application.salary}</span></p>
                                    <p className="card-text fs-5">Location: <span>{application.location}</span></p>
                                    <p className="card-text fs-5">Submission Date: <span>{application.submissionDate}</span></p>
                                    <div className="divButtons">
                                        <button type="button" className="btn rounded-2 buttonSubmit">View Full Advertisement</button>
                                        <button onClick={() => {setApplicationStatus(application)}} type="button" className="btn rounded-2 buttonSubmit">Status</button>
                                    </div>
                                </div>
                        )) : null}
                        <p id="null_applications">No applications!</p>
                    </div>
                    {(applicationStatus !== null) && (
                        <div id="status" className="card cardApplicationStatus">
                            <div>
                                <h2 className="d-inline-block card-title mb-2 text-center bottomp">{applicationStatus.applicationID.toUpperCase()}</h2>
                                <svg onClick={() => {setApplicationStatus(null)}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" 
                                className="btn bi bi-x-lg float-end sideBarCloseButton" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                            </div>
                
                            <p className="">Application Date : <span>{applicationStatus.submissionDate}</span></p>
                            <p className="">Post : <span>{applicationStatus.postName}</span></p>
                            <p className="">Salary : <span>{applicationStatus.salary}</span></p>
                            <p className="">Location : <span>{applicationStatus.location}</span></p>
                            <p className="">Open Date : <span>{applicationStatus.datePublished}</span></p>
                            <p className="">Close Date : <span>{applicationStatus.appLastDate}</span></p>

                            

                            <div className="statusDiv">
                                <h4>Status</h4>
                                <p>Application: </p><span className="green">{"Submitted".toUpperCase()}</span>
                                <p>Rank List: </p><span className={applicationStatus.isFrozen ? "green" : "yellow"}>
                                                        {applicationStatus.isFrozen ? "Generated".toUpperCase(): "PENDING"}</span>
                                <p>Verification: </p><span className={  applicationStatus.isVerified ? 
                                                                            (applicationStatus.verifyStatus ? "green" : "red") : "yellow"}>
                                                                                {  applicationStatus.isVerified ? 
                                                                                        (applicationStatus.verifyStatus ? "VERIFIED" : "REJECTED") : "PENDING"}</span>
                                <p>Offer: </p><span className={applicationStatus.isVerified ? (applicationStatus.appStatus === ("rejected" || "lapsed") ? "red" : "green") : "yellow"}>{applicationStatus.isVerified ? (applicationStatus.appStatus ? applicationStatus.appStatus.toUpperCase() : "NO OFFERS") : "PENDING"}</span>
                                <p></p>
                            </div>
                            
                            <div>
                                <button type="button" className="btn btn-light mt-2 rounded-2 buttonSubmit">View Full Advertisement</button>
                                <button onClick={() => {cancelApplication(applicationStatus.applicationID)}} type="button" className="btn btn-light mt-2 rounded-2 buttonSubmit">Cancel Application</button>
                            </div>
                        </div>
                    )}
                </div>     
            </div>
        </>
    )
}