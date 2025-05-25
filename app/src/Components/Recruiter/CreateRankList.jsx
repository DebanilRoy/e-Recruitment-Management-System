import { useEffect, useState } from "react"
import RecruitmentIDSearchBar from "../RecruitmentIDSearchBar"
import $ from 'jquery'
import { useConfirmModal } from "../../Context/modalContext";
import { useRecruitments } from "../../Context/recruitmentsContext";

export default function CreateRankList() {
    const [subjects, setSubjects] = useState([]);
    const [rankList, setRankList] = useState([]);
    const [recruitmentData, setRecruitmentData] = useState({});

    const {recruitments, getRecruitments, recruitmentDetails, getRecruitmentDetails} = useRecruitments()
    const confirmModal = useConfirmModal()

    
    useEffect(() => {
        getRecruitments();
    }, [])
    
    function getRecruitmentData(event) {
        event.preventDefault()
        const form = $(event.target)
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/createRankList/getRecruitmentData.php",
            data: form.serialize(),
            success: (data) => {
                setRecruitmentData(data)
            },
            error: () => {
                console.log("Error: getRecruitmentData")
            }
        })
    }
    
    function getSubjects(event) {
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/addResult/getSubjects.php",
            data: JSON.stringify($(event.target).find("select#recruitmentID").val()),
            success: data => {
                setSubjects(data);
                var subjectNames = {}
                data.forEach(subject => (subjectNames[subject.subjectName] = ""))
            }
        })
    }
    
    function getRankList(event) {
        console.log("getRankList")
        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/createRankList/getRankList.php",
            data: JSON.stringify($(event.target).find("select#recruitmentID").val()),
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
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/createRankList/getRankList.php",
            data: JSON.stringify(recruitmentDetails.recruitmentID),
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
                url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/createRankList/freezeRankList.php",
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
                <div className="pt-2 px-2">         
                    <div className="d-flex divRecruitmentInfo">                       
                        <form onSubmit={(event) => {getSubjects(event); getRecruitmentDetails(event); getRecruitmentData(event); getRankList(event)}}>
                            <RecruitmentIDSearchBar>
                                {recruitments.map(recruitment => 
                                    recruitment.isPublished && <option>{recruitment.recruitmentID}</option>
                                )}
                            </RecruitmentIDSearchBar>                         
                            
                            <button className="btn fs-5">Submit</button>
                        </form>

                        {(recruitmentDetails) ? (<div className="divRecruitmentDetailsLabel createRankListLabel">
                            <p className="">Post Name : <span className="">{recruitmentDetails.postName}</span></p>
                            <p className="">Location : <span className="">{recruitmentDetails.location}</span></p>
                            <p className="">Total Vacancies : <span className="">{recruitmentDetails.vacancyTotal}</span></p>
                            <p className="">Total Applications : <span className="">{recruitmentData.applicationCount ?? null}</span></p>
                            <p className="">Application with Results : <span className="">{recruitmentData.applicationResultCount}</span></p>
                            <p className="">Application without Results : <span className="">{recruitmentData.applicationNonResultCount}</span></p>
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

                    {(recruitmentDetails) && (!recruitmentDetails.isFrozen ? (
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