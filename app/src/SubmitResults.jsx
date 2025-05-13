import {useState} from 'react'
import $ from 'jquery'

export default function SubmitResults() {
    const [resultData, setResultData] = useState([]);
    const [subjects, setSubjects] = useState([])
    const [recruitmentID, setRecruitmentID] = useState(null)
    const [recruitmentDetails, setRecruitmentDetails] = useState(null)
    const [subjectsNames, setSubjectsNames] = useState(); 

    function getRecruitmentDetails(event) {
        event.preventDefault()
        const form = $(event.target)
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/addResult/getRecruitmentDetails.php",
            data: form.serialize(),
            success: (data) => {
                setRecruitmentDetails(data)
            }
        })
    }

    function getSubjects(event) {
        event.preventDefault()
        const form = $(event.target)
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/addResult/getSubjects.php",
            data: form.serialize(), 
            success: data => {
                setRecruitmentID($(event.target).find("#recruitmentID").val())
                setSubjects(data);
                var subjectNames = {}
                data.forEach(subject => (subjectNames[subject.subjectName] = ""))
                setSubjectsNames(subjectNames)
            }
        })
    }

    function getResults(event) {
        const form = $(event.target)
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/addResult/getResults.php",
            data: form.serialize(),
            success: (results) => {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8000/src/addResult/getSubjects.php",
                    data: form.serialize(), 
                    success: data => {
                        if (results[0]) {
                            var subjectNames = {}
                            data.forEach(subject => (subjectNames[subject.subjectName] = ""))
                            setResultData([{key: crypto.randomUUID(), applicationID: "", applicantName: "", applicantID: "", ...subjectNames}, ...results[1].map(application => ({key: crypto.randomUUID(), ...application}))]);
                        }

                        else {
                            console.log("Error Get Data")
                        }
                    }
                })
            }
        })
    }

    function saveResults() {
        console.log("saveData called")
        var sendData = []
        
        resultData.map(application => (application.applicationID) &&
            subjects.map(subject => {
                sendData.push({ recruitmentID: recruitmentID, 
                                applicationID: application.applicationID, 
                                subjectID : subject.subjectID,
                                result: application[subject.subjectName]}) 
            })
        )
        
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/addResult/saveResults.php",
            data: JSON.stringify(sendData),
            success: (data) => {
                console.log(data);
            },
            error: () => {
                console.log("Error: Send Data")
            }
        })
    }

    function updateData(key, dataKey, data) {
        setResultData(prevData => prevData.map(application => (application.key === key) ? {...application, [dataKey]: data} : application))
    }

    function addRow(key) {
        if (checkRow(key)) {
            const application = resultData.findIndex(application => application.key === key);
            setResultData([...resultData.slice(0, application + 1), {key: crypto.randomUUID(), applicationID: "", applicantName: "", applicantID: "", ...subjectsNames}, ...resultData.slice(application + 1)]);
        }
    }
    
    function deleteRow(key) {
        if (checkRow(key)) {
            setResultData(prevData => prevData.filter(application => application.key !== key));
        }
    }

    function checkRow(key) {
        var isEmpty = true
        const application = resultData.findIndex(application => application.key === key);
        console.log("application: ", application)
        Object.keys(resultData[application]).forEach(objectKey => 
            {
                if (!['key', 'applicantName', 'applicantID', "dob"].includes(objectKey)) {
                    if (resultData[application][objectKey]){ 
                        isEmpty = false
                    }
                }                 
            }
        )   
        return isEmpty;
    }

    return (
        <>
            <div className="d-inline-block bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <p className="mb-0 bodyHeading">Submit Results</p>
                </div>

                <div className="pt-2 ps-2">         
                    <div className="divRecruitmentInfo">
                        <form onSubmit={(event) => {getSubjects(event); getRecruitmentDetails(event); getResults(event)}}>
                            <div className="divFormInputRecruitmentId">
                                <label htmlFor="" className="form-label d-block">Recruitment ID</label>
                                <input type="text" name="recruitmentID" id="recruitmentID" list="recruitmentIdOptions" className="form-control fs-5"/>
                                <datalist id="recruitmentIdOptions">
                                    <option value="ABCD1234"/>
                                    <option value="ABCD1234"/>
                                    <option value="ABCD1234"/>
                                    <option value="ABCD1234"/>
                                    <option value="ABCD1234"/>
                                </datalist>
                            </div>
                            
                            <button className="btn fs-5 buttonPrimary">Submit</button>
                        </form>
                        
                        {(recruitmentDetails) ? (<div className="divRecruitmentDetailsLabel">
                            <p className="">Post Name : <span className="">{recruitmentDetails.postName}</span></p>
                            <p className="">Location : <span className="">{recruitmentDetails.location}</span></p>
                            <p className="">Total Vacancies : <span className="">{recruitmentDetails.vacancyTotal}</span></p>
                            <p className="">Total Applications : <span className="">{recruitmentDetails.applicationCount}</span></p>
                            <p className="">Results Saved : <span className="">{recruitmentDetails.applicationCount}</span></p>
                        </div>) : null}
                    </div>
        
                    {(recruitmentDetails) ? (
                        <>
                            <table className="tableResults">
                                <thead>
                                    <tr>
                                        <td colSpan={(subjects.length > 0) ? (4 + subjects.length) : (4)}>
                                            <input type="text" name="" id="" placeholder="Search Result" 
                                                className="form-control rounded-0 resultSearchBar"/>
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <th className="subResAppltnID">ApplicationID</th>
                                        <th className="subResApplntName">Applicant Name</th>
                                        <th className="subResApplntID">ApplicantID</th>
                                        <th className="subResDob">Date of Birth</th>
                                        {(subjects.length > 0) && (subjects.map(subject => (
                                            <th className="subResSubject">{subject.subjectName}</th>
                                        )))}
                                    </tr>
                                </thead>
                                <tbody id="resultBody">
                                    {resultData.map((application) => (
                                        <tr key={application.key} 
                                            onFocus={() => {addRow(application.key)}} 
                                            onBlur={() => {deleteRow(application.key)}}>
                                            <td className="subResTdInput">
                                                <input  value={application.applicationID.toUpperCase()} 
                                                        onChange={ (event) => {updateData(application.key, "applicationID", event.target.value.toLowerCase())}} 
                                                        type="text" placeholder="ApplicationID" className="form-control"/></td>
                                            <td className="">{application.applicantName}</td>
                                            <td className="">{application.applicantID}</td>
                                            <td className="">{application.dob}</td>
                                            {(subjects.length > 0) && (subjects.map(subject => (
                                            <td className={"subresTdInput " + subject.subjectName}><input value={application[subject.subjectName]} 
                                                onChange={ (event) => {updateData(application.key, subject.subjectName, event.target.value)}} 
                                                type="text" placeholder="Result" className="form-control"/></td>
                                            )))}
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        
                            <div className="w-100 mt-3 text-center">
                                <div className="d-inline-block fs-5 mb-3 me-3 regFormDiv">
                                    <button onClick={() => {saveResults()}} className="btn fs-5 buttonPrimary">Save</button>
                                </div>
                            </div>
                        </>
                    ): null}
                
                
                </div>
                
            </div>
        </>
    )
}