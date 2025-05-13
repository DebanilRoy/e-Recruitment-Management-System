import { useEffect, useState, formData } from "react"
import $ from 'jquery'

export default function AddSubjects () {
    const [subjects, setSubjects] = useState([]);
    const [deletedSubjects, setDeletedSubjects] = useState([]);
    const [recruitmentID, setRecruitmentID] = useState();
    const [recruitments, setRecruitment] = useState([]);
    const [recruitmentDetails, setRecruitmentDetails] = useState(null);

    const subjectsArray = { subjects: subjects,
                            deletedSubjects: deletedSubjects
    }
    
    function retrieveRecruitments(event) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/createRecruitment/retrieveRecruitments.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            success: (data) => {
                setRecruitment(data)
            },
            error: () => {
                console.log("Retrieve Failed")
            }
        })
    }

    useEffect(() => {
        retrieveRecruitments();
    }, [])
    
    function handleSubmitRecruitment(event) {
        event.preventDefault()
        const form = $(event.target)
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/createRecruitment/recruitmentDetails.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            data: form.serialize(),
            success: (data) => {
                
                setRecruitmentID($(event.target).find("[name='recruitmentID']").val())
                const details = data[0]
                setRecruitmentDetails(details)
                
                const subjects = data[1]
                
                const test = () => {
                    var final = [];
                    if (subjects.length > 0) {
                        subjects.forEach(subject => {
                            final.push({subjectKey: crypto.randomUUID(), subjectID: subject.subjectID, subjectName: subject.subjectName, priority: subject.priority})
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

    function checkCol (subjectKey) {
        var isEmpty = true
        const subject = subjects.findIndex(subject => subject.subjectKey === subjectKey);

        if (subjects[subject]["subjectName"] !== "") {
            isEmpty = false
        }

        return isEmpty
    }

    function addCol (subjectKey) {
        if (checkCol(subjectKey)) {
            setSubjects(prevSubjects => [...prevSubjects, {subjectKey: crypto.randomUUID(), subjectID: "", subjectName: "", priority: ""}])
        }
    }

    function deleteCol(subjectKey) {

        if (subjects.length !== 1 && checkCol(subjectKey)) {
            const subject = subjects.findIndex(subject => subject.subjectKey === subjectKey);
            
            if (subjects[subject].subjectID) {
                setDeletedSubjects(prevDelSub => [...prevDelSub, subjects[subject].subjectID])
            }

            setSubjects(prevSubjects => prevSubjects.filter(subject => subject.subjectKey !== subjectKey))
        }
    }

    function updateSubject(subjectKey, value) {
        const subject = subjects.findIndex(subject => subject.subjectKey === subjectKey)
        setSubjects(prevSubjects => {
            const newSubjects = [...prevSubjects];
            newSubjects[subject] = {...newSubjects[subject], subjectName: value}
            return newSubjects
        })
    }

    function handleSubmit(event) {
        const subjectData = new FormData()
        subjectData.append("recruitmentID", JSON.stringify(recruitmentID))
        
        var count = 1;
        const test = () => {
            var final = [];
            if (subjects.length > 1) {
                subjects.forEach(subject => {
                    final.push({subjectKey: crypto.randomUUID(), subjectID: subject.subjectID, subjectName: subject.subjectName, priority: count})
                    count++
                })
            }
            
            return final
        }
        
        const finalSubjects = test()
        
        subjectData.append("subjects", JSON.stringify(finalSubjects))
        subjectData.append("deletedSubjects", JSON.stringify(deletedSubjects))
        
        event.preventDefault()

        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/modifySubjects/modifySubjects.php",
            xhrFields: {
                withCredentials: true, // Ensure cookies are sent with the request
            },
            data: subjectData,
            processData: false,
            contentType: false,
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
                        <form onSubmit={(event) => {handleSubmitRecruitment(event)}}>
                            <div className="fs-5">
                                <h3 htmlFor="" className="d-block">Recruitment ID</h3>
                                <input type="text" name="recruitmentID" id="recruitmentID" list="recruitmentIdOptions" 
                                        className="form-control fs-5"/>
                                <datalist id="recruitmentIdOptions">
                                    {recruitments.map(recruitment => (
                                            <option value={recruitment}/>
                                        ))}
                                </datalist>
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
                                (<input key={subject.subjectKey} name="subject[]" type="text" value={subject.subjectName}
                                    onClick={() => addCol(subject.subjectKey)} 
                                    onChange={(event) => updateSubject(subject.subjectKey, event.target.value)} 
                                    onBlur={() => deleteCol(subject.subjectKey)} 
                                    id="" placeholder="Subject Name" 
                                    className="form-control"/>))}
                        
                            <div className="">
                                <button name="" id="" className="btn buttonSubmit">Save</button>
                            </div>    
                        </div>

                        
                    </form>)}
                </div>
            
            </div>
        </>
    )
}