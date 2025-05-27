import { useEffect, useState, formData } from "react"
import { useRecruitments } from "../../Context/recruitmentsContext";
import $ from 'jquery'

export default function AddSubjects () {
    const [subjects, setSubjects] = useState([]);
    const [deletedSubjects, setDeletedSubjects] = useState([]);

    const { recruitments, getRecruitments, recruitmentDetails, getRecruitmentDetails } = useRecruitments()


    useEffect(() => {
        getRecruitments()
    }, [])

    function getSubjects(event) {
        event.preventDefault()
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/createRecruitment/recruitmentDetails.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            data: JSON.stringify($(event.target).find("select").val()),
            success: (data) => {               
                const subjects = data
                
                const test = () => {
                    var final = [];
                    if (subjects.length > 0) {
                        subjects.forEach(subject => {
                            final.push({subjectKey: crypto.randomUUID(), ...subject})
                        })
                    }
                    
                    final.push({subjectKey: crypto.randomUUID(), subjectID: "", subjectName:"", priority: ""})
                    return final
                }
                
                setSubjects(test())
            },
            error: () => {
                console.log("Recruitment Details Rectrive Failed")
            }
        })
    }

    function isEmpty (subjectKey) {
        return subjects.some(subject => subject.subjectKey === subjectKey  && subject.subjectName === "")
    }

    function addCol (subjectKey) {
        if (isEmpty(subjectKey)) {
            setSubjects(prevSubjects => [...prevSubjects, {subjectKey: crypto.randomUUID(), subjectID: "", subjectName: "", priority: ""}])
        }
    }

    function deleteCol(subjectKey) {
        if (subjects.length !== 1 && isEmpty(subjectKey)) {
            const subject = subjects.findIndex(subject => subject.subjectKey === subjectKey);
            
            if (subjects[subject].subjectID) {
                setDeletedSubjects(prevDelSub => [...prevDelSub, subjects[subject].subjectID])
            }

            setSubjects(prevSubjects => prevSubjects.filter(subject => subject.subjectKey !== subjectKey))
        }
    }

    function updateSubject(subjectKey, subjectName) {
        setSubjects(prevSubjects => prevSubjects.map(subject => subject.subjectKey === subjectKey ? ({...subject, subjectName: subjectName}) : subject))
    }

    function handleSubmit(event) {
        event.preventDefault()
            
        const finalSubjects = subjects.map(({subjectKey, ...rest}, index) => ({...rest, priority: index + 1})).slice(0, -1)
             
        const subjectData = {"recruitmentID": recruitmentDetails.recruitmentID,
                             "subjects": finalSubjects,
                             "deletedSubjects": deletedSubjects 
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/modifySubjects/modifySubjects.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            data: JSON.stringify(subjectData),
            success: (data) => {
                console.log("Submit Success")
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
                        <form onSubmit={(event) => {getRecruitmentDetails(event), getSubjects(event)}}>
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
                            <p className="">Post Name : <span className="">{recruitmentDetails.postName}</span></p>
                            <p className="">Location : <span className="">{recruitmentDetails.location}</span></p>
                            <p className="">Total Vacancies : <span className="">{recruitmentDetails.vacancyTotal}</span></p>
                            <p className="">Application Close Date : <span className="">{recruitmentDetails.appLastDate}</span></p>
                        </div>) : null}                          
                    </div>
                                     
                    {(recruitmentDetails) && (<form method="post" onSubmit={(event) => {handleSubmit(event)}} className="">
                        <div className="divModifySubjects">
                            <h4 className="">Subjects</h4>
                            {subjects.map((subject) =>
                                (<input disabled={recruitmentDetails.isPublished ? true: false} key={subject.subjectKey} name="subject[]" type="text" value={subject.subjectName}
                                    onClick={() => addCol(subject.subjectKey)} 
                                    onChange={(event) => updateSubject(subject.subjectKey, event.target.value)} 
                                    onBlur={() => deleteCol(subject.subjectKey)} 
                                    id="" placeholder="Subject Name" 
                                    className="form-control"/>))}
                        
                            <div className="">
                                <button disabled={recruitmentDetails.isPublished ? true : false} name="" id="" className="btn buttonSubmit">Save</button>
                            </div>    
                        </div>

                        
                    </form>)}
                </div>
            
            </div>
        </>
    )
}