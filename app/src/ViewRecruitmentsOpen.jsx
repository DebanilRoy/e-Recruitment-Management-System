import { useState, useEffect, use } from "react";
import $ from 'jquery'
import { useNavigate } from "react-router";

export default function ViewRecruitmentsOpen(props) {
    const [recruitments, setRecruitments] = useState([])
    const [appliedRecruitments, setAppliedRecruitments] = useState([])

    const navigate = useNavigate()

    function getRecruitments() {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/viewRecruitmentsOpen/getRecruitments.php",
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                const [serverRecruitments, serverAppliedRecruitments] = [data.recruitments, data.appliedRecruitments]
                var recruitments = []
                var appliedRecruitments = []
                
                serverRecruitments.map(recruitment => 
                    {
                        recruitments.push({ recruitmentID: recruitment.recruitmentID, postName: recruitment.postName, salary: recruitment.salary,
                                            location: recruitment.location, 
                                            datePublished: recruitment.datePublished, appLastDate: recruitment.appLastDate})
                    }
                )

                serverAppliedRecruitments.forEach(recruitment => 
                    {
                        appliedRecruitments.push(recruitment.recruitmentID)        
                    }
                )
                
                setRecruitments(recruitments)
                setAppliedRecruitments(appliedRecruitments)
            }
        })
    }

    useEffect(() => {
        getRecruitments()
    }, [])

    return (
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Recruitment  {'>'}  Open Recruitments</span>
                </div>

                <div className="pt-2 ps-2">         
                    {recruitments.map(recruitment => (<div className="card d-inline-block cardViewRecruitments">
                        <h5 className="card-title fs-3 mb-3 text-center">{recruitment.postName}</h5>
                        <p className="card-text fs-5">Recruitment ID : <span>{recruitment.recruitmentID}</span></p>
                        <p className="card-text fs-5">Salary : <span>{recruitment.salary}</span></p>
                        <p className="card-text fs-5">Location : <span>{recruitment.location}</span></p>
                        <p className="card-text fs-5">Open Date : <span>{recruitment.datePublished}</span></p>
                        <p className="card-text fs-5">Last Date : <span>{recruitment.appLastDate}</span></p>
                        <div className="divButtons">
                            <button href="#" className="btn rounded-2 buttonSubmit">View Full Advertisement</button>
                            {appliedRecruitments.findIndex( r => r === recruitment.recruitmentID) >=  0 
                                ? 
                                    <button disabled className=" btn buttonSubmit accept">Applied!</button> : 
                                    <button id="apply" onClick={() => {navigate("/content/apply",  {state: {recruitmentID: recruitment.recruitmentID, 
                                                                                                    postName: recruitment.postName}, replace: true})}} 
                                            className="btn buttonSubmit">Apply</button>
                            
                            }
                            
                        </div>
                    </div>))}
                </div>
            </div>
        </>
    )
}