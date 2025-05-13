import { use, useState } from "react"
import $ from 'jquery'
import { useConfirmModal } from "./confirmModal";

export default function CreateRankList() {
    const [recruitmentID, setRecruitmentID] = useState(null);
    const [recruitmentDetails, setRecruitmentDetails] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [rankList, setRankList] = useState([]);
    const [isRanklistFrozen, setIsRanklistFrozen] = useState(false);

    const confirmModal = useConfirmModal()

    function getRecruitmentDetails(event) {
        event.preventDefault()
        const form = $(event.target)
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/createRankList/getRecruitmentDetailRankList.php",
            data: form.serialize(),
            success: (data) => {
                setRecruitmentDetails({ postName: data.postName, 
                                        location: data.location, 
                                        vacancyTotal: data.vacancytotal, 
                                        applicationCount: data.applicationcount,
                                        applicationResultCount: data.applicationresultcount,
                                        applicationNonResultCount: data.applicationnonresultcount
                                    })

                setIsRanklistFrozen(data.isFrozen)
            }
        })
    }

    function getSubjects(event) {
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
            }
        })
    }
    
    function getRankList(event) {
        const form = $(event.target)
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/createRankList/getRankList.php",
            data: form.serialize(),
            success: (data) => {
                setRankList(data);
            },
            error: (data) => {
                console.log("Get Rank List Failed")
            }
        })
    }

    function updateRankList() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/src/createRankList/getRankList.php",
            data: JSON.stringify(recruitmentID),
            success: (data) => {
                setRankList(data);
            },
            error: (data) => {
                console.log("Get Rank List Failed")
            }
        })
    }

    async function freezeRankList() {
        const freezeConfirm = await confirmModal("Are you sure you want to Freeze the Rank List?");
        if (freezeConfirm) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8000/src/createRankList/freezeRankList.php",
                data: JSON.stringify(recruitmentID),
                success: (data) => {
                    setIsRanklistFrozen(data)
                },
                error: (data) => {
                    console.log("Rank List Failed")
                }
            }
        )}
    }

    return (
        <>
            <div className="bodyDiv">
                <div className="w-100 ps-2 py-2 rounded-2 bodyHeadingDiv">
                    <p className="mb-0 bodyHeading">Create Rank List</p>
                </div>
                <div className="pt-2 ps-2">         
                    <div className="d-flex divRecruitmentInfo">                       
                        <form onSubmit={(event) => {getRecruitmentDetails(event); getSubjects(event); getRankList(event)}}>
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
                            
                            <button className="btn fs-5">Submit</button>
                        </form>

                        {(recruitmentDetails) ? (<div className="divRecruitmentDetailsLabel createRankListLabel">
                            <p className="">Post Name : <span className="">{recruitmentDetails.postName}</span></p>
                            <p className="">Location : <span className="">{recruitmentDetails.location}</span></p>
                            <p className="">Total Vacancies : <span className="">{recruitmentDetails.vacancyTotal}</span></p>
                            <p className="">Total Applications : <span className="">{recruitmentDetails.applicationCount}</span></p>
                            <p className="">Application with Results : <span className="">{recruitmentDetails.applicationResultCount}</span></p>
                            <p className="">Application without Results : <span className="">{recruitmentDetails.applicationNonResultCount}</span></p>
                        </div>) : null}   
                    </div>
                    
                    
                    {(recruitmentDetails) && (
                        <table className="tableRankList">
                            <thead className="">
                                <tr>
                                    <td style={{width: "100%"}} colSpan={(subjects.length > 0) ? (6 + subjects.length) : (6)}>
                                        <button onClick={(event) => updateRankList(event)} 
                                                className="btn rankListUpdate">Update Rank List</button>
                                        <input type="text" name="" id="" placeholder="Search Rank" className="float-end form-control rounded-0 tableSearchBar"/>
                                    </td>
                                </tr>
                                <tr className="">
                                    <th >Rank</th>
                                    <th>ApplicationID</th>
                                    <th>Applicant Name</th>
                                    <th>ApplicantID</th>
                                    <th>Date of Birth</th>
                                    <th>Total</th>
                                    {(subjects.length > 0) && (subjects.map(subject => (
                                        <th>{subject.subjectName}</th>
                                    )))}
                                </tr>
                            </thead>
                            <tbody>
                                {rankList.map(application => (<tr key={application.key} className="">
                                    <td>{application.rank}</td>
                                    <td>{application.applicationID.toUpperCase()}</td>
                                    <td>{application.applicantName}</td>
                                    <td>{application.applicantID}</td>
                                    <td>{(application.dob)}</td>
                                    <td>{application.total}</td>
                                    {(subjects.length > 0) && (subjects.map(subject => (
                                        <td key={application.rank + subject.subjectName}>{application[subject.subjectName]}</td>
                                    )))}
                                </tr>))}
                            </tbody>
                        </table>
                    )}

                    {(recruitmentDetails) && (!isRanklistFrozen ? (
                        <div className="w-100 mt-3 text-center">
                            <div className="d-inline-block fs-5 mb-3 me-3 regFormDiv">
                                <button onClick={() => freezeRankList()} className="btn btn-light form-control fs-5 buttonPrimary buttonFreezeList">Freeze Rank List</button>
                            </div>
                        </div>) :
                    
                    (   <div className="w-100 mt-3 text-center">
                            <div className="d-inline-block fs-5 mb-3 me-3 regFormDiv">
                            <p className="">Rank List Frozen</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}