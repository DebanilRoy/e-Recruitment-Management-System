import { useEffect, useState } from "react"
import $ from 'jquery'
import RecruitmentIDSearchBar from "../RecruitmentIDSearchBar";
import { useRecruitments } from "../../Context/recruitmentsContext";
import { useConfirmModal } from "../../Context/modalContext";

export default function VerifyApplications() {
//    const [recruitmentID, setRecruitmentID] = useState(null);
    const [openApplicationBio, setOpenApplicationBio] = useState(false);
    const [applicationBio, setApplicationBio] = useState({});
    const [applications, setApplications] = useState([]);
    const [applicationsData, setApplicationsData] = useState({});
    const [checkedApplications, setCheckedApplications] = useState([]);

    const {recruitments, getRecruitments, recruitmentDetails, getRecruitmentDetails} = useRecruitments()

    const confirmModal = useConfirmModal()

    useEffect(() => {
        getRecruitments()
    }, [])

    function getApplicationsData(event) {
        event.preventDefault()
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/verifyApplications/getApplicationsData.php",
            data: JSON.stringify($(event.target).find("select").val()),
            success: (data) => {
                setApplicationsData(data)
            }
        })
    }

    function getApplications(event) {
        event.preventDefault()
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/verifyApplications/getApplications.php",
            data: JSON.stringify($(event.target).find("select").val()),
            success: (applications) => {
                setApplications(applications)
            }
        })
    }

    function getApplicationBio(applicationID) {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/verifyApplications/getApplicationBio.php",
            data: JSON.stringify(applicationID),
            success: data => {
                console.log(data)
                setApplicationBio(data)
                setOpenApplicationBio(true);
            }
        })
    }
    
    async function verifyApplications(event) {
        event.preventDefault()
        const action = event.nativeEvent.submitter.name === "verify" ? "verify" : "reject"
        const confirmVerify = await confirmModal("Are you sure you want to " + action + " " + checkedApplications.length + " applications ?")

        if (confirmVerify) {
            $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src//verifyApplications/verifyApplications.php",
            data: JSON.stringify([(event.nativeEvent.submitter.name === "verify" ? "verify" : "reject"), checkedApplications]),
            success: (data) => {
                console.log("Success")
                
            }
        })}
    }

    function updateCheckedApplications(event, applicationID) {
        (event.target.checked) ? setCheckedApplications(prev => ([...prev, applicationID])) : setCheckedApplications(prev => prev.filter(appID => appID !== applicationID))
    }

    return (
        <>
            <div className="bodyDiv">
                <div className="bodyHeadingDiv">
                    <span className="bodyHeading">Verify Application</span>
                </div>
                <div className="pt-2 ps-2">

                <div className="divRecruitmentInfo"> 
                    <form onSubmit={(event) => {getRecruitmentDetails(event); getApplications(event); getApplicationsData(event)}}>
                        <RecruitmentIDSearchBar>
                            {recruitments.map(recruitment => (
                                recruitment.isFrozen && <option>{recruitment.recruitmentID}</option>
                            ))}
                        </RecruitmentIDSearchBar>
                                                
                        <button className="btn fs-5">Submit</button>
                    </form>
                    
                    {(recruitmentDetails) ? (
                        <div className="divRecruitmentDetailsLabel verifyApplicationsLabel">
                            <p>Post Name : <span>{recruitmentDetails.postName}</span></p>
                            <p>Location : <span>{recruitmentDetails.location}</span></p>
                            <p>Total Vacancies : <span>{recruitmentDetails.vacancyTotal}</span></p>
                            <p>Total Applications : <span>{applicationsData.applicationCount}</span></p>
                            <p>Applications Checked : <span>{applicationsData.checked}</span></p>
                            <p>Application Verified : <span>{applicationsData.verified}</span></p>
                        </div>
                    ) : null}
                </div>     
                    
                    
                    {openApplicationBio && (
                        <div id="bio" className="divVerifyApplBio divVerifyApplBioOpen">
                            <div>
                                <p>Application ID: <span>{applicationBio.applicationID.toUpperCase()}</span></p>                         
                                <p>Name: <span>{applicationBio.applicantName}</span></p>                        
                                <p>Category: <span><a href="">{applicationBio.category}</a></span></p>                            
                                <p>Mobile: <span>{applicationBio.mobile}</span></p>                          
                                <p>Address: <br/>
                                    <span>{applicationBio.addressFirstLine}</span>
                                    <br/>                           
                                    <span>{applicationBio.addressSecondLine}</span>
                                </p>
                                                
                            </div>  
                            
                            <div>
                                <p>Rank: <span>{applicationBio.rank}</span></p>
                                <p>Date of Birth: <span>{applicationBio.dob}</span></p>
                                <p>Qualification: <span><a href="">{applicationBio.qualification}</a></span></p>
                                <p>Email: <span>{applicationBio.email}</span></p>
                                <p>City: <span>{applicationBio.city}</span></p>
                                <p>District: <span>{applicationBio.district}</span></p>
                                <p>State: <span>{applicationBio.state}</span></p>
                            </div>
                            <svg onClick={() => setOpenApplicationBio(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" 
                                className="btn bi bi-x-lg float-end sideBarCloseButton" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </div>
                    )}

                    {recruitmentDetails && (<form onSubmit={(event) => {verifyApplications(event)}}>
                        <table className="tableVerifyApplication">
                            <thead>
                                <tr>
                                    <td colSpan="7">
                                        <input type="text" name="" id="" placeholder="Search Rank" className="form-control tableSearchBar"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Rank</th>
                                    <th>ApplicationID</th>
                                    <th>Applicant Name</th>
                                    <th>ApplicantID</th>
                                    <th>Date of Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(application => (<tr key={applications.applicationID} className="">
                                    <td className="align-middle text-center verifyApplCheckbox">
                                        <div className="d-inline-block form-check p-0 m-0">
                                            <input  disabled={(application.isVerified === 1) && true} status={(application.verifyStatus === 1) ? "verified": "rejected"} 
                                                    onClick={(event) => {updateCheckedApplications(event, application.applicationID)}}
                                                    className="form-check-input m-0 checkbox" type="checkbox" 
                                                    id={application.applicationID} aria-label="..."/>
                                        </div>
                                    </td>
                                    <td className="rank">{application.rank}</td>
                                    <td className=""><span onClick={() => {getApplicationBio(application.applicationID)}}>{application.applicationID.toUpperCase()}</span></td>
                                    <td className="">{application.applicantName}</td>
                                    <td className="">{application.applicantID}</td>
                                    <td className="">{application.dob}</td>
                                </tr>))}
                            </tbody>
                        </table>
                        
                        <div className="divVerifyApplicationOption">
                            <button name="verify" id="" 
                            className="btn">Verify</button>
                            <button name="reject" id=""
                            className="btn">Reject</button>
                        </div>
                    </form>)}
                </div>
            </div>
        </>
    )
}