// Import Dependencies

import { useEffect, useState, formData } from "react"
import { useRecruitments } from "../../Context/recruitmentsContext";
import { useNotification } from "../../Context/notificationContext";
import $ from 'jquery'

// Main Component

export default function AddSubjects () {
    const [subjects, setSubjects] = useState([]);
    const [deletedSubjects, setDeletedSubjects] = useState([]);

    const { recruitments, getRecruitments, 
            recruitmentDetails, getRecruitmentDetails } = useRecruitments()

    // Getting context components

    const Notification = useNotification()

    useEffect(() => {
        getRecruitments()
    }, [])

    // Backend call to retrieve subjects data

    function getSubjects(event) {
        event.preventDefault()
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL 
                    + "/src/createRecruitment/recruitmentDetails.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            data: JSON.stringify($(event.target).find("select").val()),
            success: (subjects) => {               
                setSubjects([...subjects.map(subject => ({key: crypto.randomUUID(), ...subject})), 
                                {key: crypto.randomUUID(), subjectID: "", subjectName:"", priority: ""}
                            ])
            },
            error: (xhrFields) => {
                if (xhrFields.status === 200) {
                    setSubjects([{key: crypto.randomUUID(), subjectID: "", subjectName:"", priority: ""}])
                }
                else {
                    console.log("Recruitment Details Rectrive Failed")
                }
                
            }
        })
    }

    function isEmpty (key) {
        return subjects.some(subject => subject.key === key  && subject.subjectName === "")
    }

    // Adds an object in the subjects state variable array

    function addCol (key) {
        if (isEmpty(key)) {
            setSubjects(prevSubjects => [...prevSubjects, 
                {key: crypto.randomUUID(), subjectID: "", subjectName: "", priority: ""}])
        }
    }

    // Deletes object from the subjects state variable array

    function deleteCol(key) {
        if (subjects.length !== 1 && isEmpty(key)) {
            setSubjects(prevSubjects => prevSubjects.filter(subject => subject.key !== key))
        }
    }

    // Updates state variable as per change in input component

    function updateSubject(key, subjectName) {
        setSubjects(prevSubjects => 
            prevSubjects.map(subject => subject.key === key ? ({...subject, subjectName: subjectName}) : subject))
    }

    // Backend call to save subjects
    
    function saveSubjects(event) {
        event.preventDefault()
            
        const finalSubjects = subjects.map(({key, ...rest}, index) => ({...rest, priority: index + 1})).slice(0, -1)
             
        const subjectData = {"recruitmentID": recruitmentDetails.recruitmentID,
                             "subjects": finalSubjects,
        }

        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/modifySubjects/modifySubjects.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            data: JSON.stringify(subjectData),
            success: (data) => {
                Notification("Subjects Saved", "success")
            } 
        })
            
    }

    return (
        <>
            <div className="d-inline-block bodyDiv">
                <div className="bodyHeadingDiv">
                    <p className="mb-0 bodyHeading">Add/Modify Subjects</p>
                </div>
                    
                <div className="pt-2 px-2">         
                    <div className="d-flex divRecruitmentInfo">
                        <form onSubmit={(event) => {getRecruitmentDetails(event); getSubjects(event)}}>
                            <div className="fs-5">
                                <label htmlFor="" className="d-block">Recruitment ID</label>
                                <select name="recruitmentID" id="recruitmentID"  
                                        className="form-control fs-5">
                                            <option>-- select --</option>
                                    {recruitments.map(recruitment => (
                                            <option>{recruitment.recruitmentID}</option>
                                        ))}
                                </select>
                            </div>
                            
                            <button className="btn fs-5 buttonSubmit">Submit</button>
                        </form>
                    
                        {(recruitmentDetails) ? (<div className="divRecruitmentDetailsLabel modifySubjectsLabel">
                            <p>Post Name : <span>{recruitmentDetails.postName}</span></p>
                            <p>Location : <span>{recruitmentDetails.location}</span></p>
                            <p>Total Vacancies : <span>{recruitmentDetails.vacancyTotal}</span></p>
                            <p>Application Close Date : <span>{recruitmentDetails.appLastDate}</span></p>
                        </div>) : null}                          
                    </div>
                                     
                    {(recruitmentDetails) && (<form method="post" onSubmit={(event) => {saveSubjects(event)}}>
                        <div className="divModifySubjects">
                            <h4>Subjects</h4>
                            {subjects.map((subject) =>
                                (<input disabled={recruitmentDetails.isPublished ? true: false} key={subject.key} 
                                    name="subject[]" type="text" value={subject.subjectName}
                                    onFocus={() => addCol(subject.key)} 
                                    onChange={(event) => updateSubject(subject.key, event.target.value)} 
                                    onBlur={() => deleteCol(subject.key)} 
                                    placeholder="Subject Name" 
                                    className="form-control"/>))}
                        
                            <div>
                                <button disabled={recruitmentDetails.isPublished ? true : false} 
                                        className="btn buttonSubmit">Save</button>
                            </div>    
                        </div>

                        
                    </form>)}
                </div>
            
            </div>
        </>
    )
}