import { useEffect, useState } from "react"
import $ from 'jquery'
export default function RecruitmentsClosed () {
    const [closedRecruitments, setClosedRecruitments] = useState([]);
    
    function getClosedRecruitments() {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/viewRecruitmentsOpen/getClosedRecruitments.php",
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                setClosedRecruitments(data)
            },
            error: (jqXHR) => {
                console.log("Code: ", jqXHR.status)
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
        getClosedRecruitments()
    }, [])

    return (
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Recruitment  {'>'}  Open Recruitments</span>
                </div>

                <div className="pt-2 ps-2">
                    {closedRecruitments.map(recruitment => (<div className="card d-inline-block cardViewRecruitments">

                        <h5 className="card-title fs-3 mb-3 text-center">{recruitment.postName}</h5>
                        <p className="card-text fs-5">Recruitment ID : <span>{recruitment.recruitmentID}</span></p>
                        <p className="card-text fs-5">Salary : <span>{recruitment.salary}</span></p>
                        <p className="card-text fs-5">Location : <span>{recruitment.location}</span></p>
                        <p className="card-text fs-5">Open Date : <span>{recruitment.datePublished}</span></p>
                        <p className="card-text fs-5">Last Date : <span>{recruitment.appLastDate}</span></p>
                        <div className="divButtons">
                            <button href="#" className="btn rounded-2 buttonSubmit">View Full Advertisement</button>                               
                        </div>

                    </div>))}
                    <p id="null_applications">No Closed Applications</p>
                </div>
            </div>
        </>
    )
}