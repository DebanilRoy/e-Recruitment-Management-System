import { useState } from "react"
import { useNotification } from "./notificationContext";
import $ from 'jquery'

export default function CreateRecruitment(props) {
    const [recruitmentInput, setRecruitmentInput] = useState({  postName: null,
                                                                salary: null,
                                                                location: null,
                                                                vacancyTotal: null, 
                                                                vacancyGEN: null, 
                                                                vacancySC: null, 
                                                                vacancyST: null, 
                                                                vacancyOBC: null,
                                                                datePublished: null,
                                                                appLastDate: null});
    

    
    function handleSubmit (event) {
        event.preventDefault()
        const form = $(event.target)
        $.ajax({
            type: "POST",
            url: "http://" + process.env.REACT_APP_BACKEND_BASE_URL + "/src/createRecruitment/createRecruitment.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            data: JSON.stringify(recruitmentInput),
            success(data) {
                //set(data)
                console.log("Recruitment Created")
            },
            error(data) {
                console.log("Error")
            }
        },)
    }

    function isEmpty() {
        var empty = false
        Object.values(recruitmentInput).some(info => info === null && (empty = true))
        return empty
    }

    function updateData(event, data) {
        setRecruitmentInput(prev => ({...prev, [event.target.id] : data}))
    }

    function scrollBlock(event) {
        let classname = event.target.name;
        if(classname && classname.includes("phonenumber")){
            event.preventDefault()
        }
    }
    
    function addScrollBlock() {
        document.addEventListener("wheel", scrollBlock, {passive: false});     
    }

    function deleteScrollBlock() {
        document.removeEventListener("wheel", scrollBlock, {passive: false});
    }

    return (
        <>
            <div className="d-inline-block bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <p className="mb-0 bodyHeading">Create Recruitment</p>
                </div>
                    
                <div className="pt-2 px-2">         
                    <form action="http://localhost:8000/src/createRecruitment/createRecruitment.php" method="post" onSubmit={(event) => {handleSubmit(event)}} 
                            className="formCreateRecruitment">
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Post Name</label>
                            <input
                                onChange={(event) => updateData(event, event.target.value)} value={recruitmentInput.postName}
                                type="text" name="postName" id="postName" className="form-control fs-5"
                            />
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Salary</label>
                            <input
                                onChange={(event) => updateData(event, event.target.value)} value={recruitmentInput.salary}
                                type="number" name="salary" id="salary" className="form-control fs-5"/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Location</label>
                            <input
                                onChange={(event) => updateData(event, event.target.value)} value={recruitmentInput.location}
                                type="text" name="location" id="location" className="form-control fs-5"/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Total Vacancies</label>
                            <input 
                                onChange={(event) => updateData(event, event.target.value === "" ? null : Number(event.target.value))} value={recruitmentInput.vacancyTotal}
                                type="number" name="vacancyTotal" id="vacancyTotal" className={"form-control fs-5 " + (recruitmentInput.vacancyTotal ? (recruitmentInput.vacancyTotal === recruitmentInput.vacancyGEN + recruitmentInput.vacancySC + recruitmentInput.vacancyST + recruitmentInput.vacancyOBC ? "correct" : "incorrect") : "")}/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">GEN Vacancies</label>
                            <input 
                                onChange={(event) => updateData(event, event.target.value === "" ? null : Number(event.target.value))} value={recruitmentInput.vacancyGEN}
                                type="number" name="vacancyGEN" id="vacancyGEN" className="form-control fs-5"/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">SC Vacancies</label>
                            <input 
                                onChange={(event) => updateData(event, event.target.value === "" ? null : Number(event.target.value))} value={recruitmentInput.vacancySC}
                                type="number" name="vacancySC" id="vacancySC" className="form-control fs-5"/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">ST Vacancies</label>
                            <input 
                                onChange={(event) => updateData(event, event.target.value === "" ? null : Number(event.target.value) )} value={recruitmentInput.vacancyST}
                                type="number" name="vacancyST" id="vacancyST" className="form-control fs-5"/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">OBC Vacancies</label>
                            <input 
                                onChange={(event) => updateData(event, event.target.value === "" ? null : Number(event.target.value))} value={recruitmentInput.vacancyOBC}
                                type="number" name="vacancyOBC" id="vacancyOBC" className="form-control fs-5"/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Recruitment Publish Date</label>
                            <input 
                                onChange={(event) => updateData(event, event.target.value)} value={recruitmentInput.datePublished}
                                type="date" name="datePublished" id="datePublished" className="form-control fs-5"/>
                        </div>
                        <div className="fs-5">
                            <label htmlFor="" className="form-label">Recruitment Close Date</label>
                            <input 
                                onChange={(event) => updateData(event, event.target.value)} value={recruitmentInput.appLastDate}
                                type="date" name="appLastDate" id="appLastDate" className="form-control fs-5"/>
                        </div>
                        <div className="fs-5">
                            <button disabled={isEmpty() || (recruitmentInput.vacancyTotal !== recruitmentInput.vacancyGEN + recruitmentInput.vacancySC + recruitmentInput.vacancyST + recruitmentInput.vacancyOBC)} 
                                    name="" id="" className="btn fs-5 buttonSubmit">Create</button>
                        </div>
                    </form>
                </div>
            
            </div>
        </>
    )
}