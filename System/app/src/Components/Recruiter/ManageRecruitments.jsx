import { useState, useEffect } from "react";
import $ from 'jquery'
import { useConfirmModal } from "../../Context/modalContext";
import { useNotification } from "../../Context/notificationContext";
import { getFile } from "../../utils/getFile";
export default function ManageRecruitments() {
    const [recruitments, setRecruitments] = useState([])
    const [recruitmentInfo, setRecruitmentInfo] = useState(null)

    const confirmModal = useConfirmModal()
    const Notification = useNotification()

    function getRecruitments() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/manageRecruitments/getRecruitments.php",
            xhrFields: {
                withCredentials: true
            },
            success: (data) => {
                setRecruitments(data)
            }
        })
    }

    useEffect(() => {
        getRecruitments()
    }, [])

    function saveRecruitmentInfo(event) {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append("recruitmentInfo", JSON.stringify(recruitmentInfo))
        
        if ($(event.target).find('input[type="file"]#' + recruitmentInfo.recruitmentID)[0].files[0]) {
            formdata.append(recruitmentInfo.recruitmentID, $(event.target).find('input[type="file"]#' + recruitmentInfo.recruitmentID)[0].files[0])
        }
        
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/manageRecruitments/saveRecruitmentInfo.php",
            data: formdata,
            processData: false,
            contentType: false,
            success: (data) => {
                getRecruitments()
                Notification("Recruitment Info Saved", "success")
            },  
            error: (jqXHR) => {
                Notification("Error: Recruitment info could not be saved", "error")
            } 
        })
    }

    async function publish(recruitmentID) {
        const publishConfirm = await confirmModal("Are you sure you want to Publish the Recruitment?");
        console.log(publishConfirm)
        if (publishConfirm) {

            $.ajax({
                type: "POST",
                url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/manageRecruitments/publish.php",
                data: JSON.stringify(recruitmentID),
                success: () => {
                    Notification("Recruitment Published", "success")
                    getRecruitments()
                },
                error: () => {
                    Notification("Error: Recruitment could not be published", "error")
                    console.log("Error: publish")
                }
            })
        }

        else {
            console.log("FAlse")
        }
        
    }

    function updateData(recruitmentID, dataKey, data) {
        console.log("Updating: ", data)
        setRecruitmentInfo(prevData => ({...prevData, [dataKey]: data}))
    }

    function dateFormat(date) {
        const newDate = new Date(date).toLocaleDateString('en-GB').replaceAll("/","-" )
        return newDate

    }

    return (
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <span className="mb-0 bodyHeading">Manage Recruitments</span>
                </div>

                <div className="pt-3 ps-2 test">         
                <div id="statusCards" className={"divApplicationStatusCards " + ((recruitmentInfo !== null) && ("statusOpen"))}>
                    {recruitments.map(recruitment => (<div className="card cardManageRecruitments">

                            <h5 className="card-title fs-3 mb-3 text-center">{recruitment.postName}</h5>
                            <p className="card-text fs-5">Recruitment ID : <span>{recruitment.recruitmentID}</span></p>
                            <p className="card-text fs-5">Salary : <span>{recruitment.salary}</span></p>
                            <p className="card-text fs-5">Location : <span>{recruitment.location}</span></p>
                            <p className="card-text fs-5">Open Date : <span>{dateFormat(recruitment.datePublished)}</span></p>
                            <p className="card-text fs-5">Last Date : <span>{dateFormat(recruitment.appLastDate)}</span></p>
                            <div className="">
                                {(!recruitment.isPublished) && (<button onClick={() => {publish(recruitment.recruitmentID)}} href="#" className="btn buttonSubmit">Publish</button>)}
                                <button onClick={() => {setRecruitmentInfo(recruitment)}} 
                                        className=" btn buttonSubmit">Edit</button>
                            </div>
                        </div>
                    ))}
                    
                </div>

                {(recruitmentInfo !== null) && (<div id="status" className="card cardEditRecruitment open">
                        <div className="d-inline-block w-100">
                            <h2 className="d-inline-block card-title mb-2 text-center bottomp">{recruitmentInfo.recruitmentID.toUpperCase()}</h2>
                            <svg onClick={() => {setRecruitmentInfo(null)}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" 
                            className="btn bi bi-x-lg float-end sideBarCloseButton" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </div>
                                               
                        <form onSubmit={(event) => {saveRecruitmentInfo(event)}} 
                              className="formEditRecruitmentDetails">
                            
                            <h4>Basic Details</h4>
                            <div className="">
                                <label htmlFor="" className="d-inline-block">Post Name</label>
                                <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "postName", event.target.value)} } type="text" name="postName" id="" className=""
                                        value={recruitmentInfo.postName}/>
                            </div>
                            <div className="">
                                <label htmlFor="" className="d-inline-block">Salary</label>
                                <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "salary", event.target.value)} } type="text" name="postName" id="" className=""
                                        value={recruitmentInfo.salary}/>
                            </div>
                            <div className="">
                                <label htmlFor="" className="d-inline-block">Location</label>
                                <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "location", event.target.value)} } type="text" name="postName" id="" className=""
                                        value={recruitmentInfo.location}/>
                            </div>
                            <div className="">
                                <label htmlFor="" className="d-inline-block">Open Date</label>
                                <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "datePublished", event.target.value)} } type="date" name="postName" id="" className=""
                                        value={recruitmentInfo.datePublished}/>
                            </div>
                            <div className="">
                                <label htmlFor="" className="d-inline-block">Close Date</label>
                                <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "appLastDate", event.target.value)} } type="date" name="postName" id="" className=""
                                        value={recruitmentInfo.appLastDate}/>
                            </div>
                            
                            <div id="file" className="">
                                <label htmlFor="" className="d-inline-block">Full Advertisement</label>
                                <p onClick={() => {getFile(recruitmentInfo.advertFileName, "recruitment")}}>View</p>
                                <input type="file" id={recruitmentInfo.recruitmentID} className=""
                                        />
                                </div>
                            
                            <h4>Vacancies</h4>
                            
                            <div id="vacancies">
                                <div className="">
                                    <label htmlFor="" className="">Total</label>
                                    <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "vacancyTotal", event.target.value !== "" ? Number(event.target.value) : "")} } type="number" name="postName" id="" 
                                            className={recruitmentInfo.vacancyTotal === (recruitmentInfo.vacancyGEN + recruitmentInfo.vacancySC + recruitmentInfo.vacancyST + recruitmentInfo.vacancyOBC) ? "correct" : "incorrect"}
                                            value={recruitmentInfo.vacancyTotal}/>
                                </div>
                                
                                <div className="">
                                    <label htmlFor="" className="d-inline-block">GEN</label>
                                    <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "vacancyGEN", event.target.value !== "" ? Number(event.target.value) : "")} } type="number" name="postName" id="" className=""
                                            value={recruitmentInfo.vacancyGEN}/>
                                </div>
                                <div className="">
                                    <label htmlFor="" className="d-inline-block">SC</label>
                                    <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "vacancySC", event.target.value !== "" ? Number(event.target.value) : "")} } type="number" name="postName" id="" className=""
                                            value={recruitmentInfo.vacancySC}/>
                                </div>
                                <div className="">
                                    <label htmlFor="" className="d-inline-block">ST</label>
                                    <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "vacancyST", event.target.value !== "" ? Number(event.target.value) : "")} } type="number" name="postName" id="" className=""
                                            value={recruitmentInfo.vacancyST}/>
                                </div>
                                <div className="">
                                    <label htmlFor="" className="d-inline-block">OBC</label>
                                    <input onChange={(event) => {updateData(recruitmentInfo.recruitmentID, "vacancyOBC", event.target.value !== "" ? Number(event.target.value) : "")} } type="number" name="postName" id="" className=""
                                            value={recruitmentInfo.vacancyOBC}/>
                                </div>
                            </div>
                            
                            <button type="submit" className="btn buttonSubmit">Save</button>
                        </form>
                </div>)}
                </div>
            </div>
        </>
    )
}