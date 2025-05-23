import { createContext, useContext, useState, useEffect } from "react"
import $ from "jquery"

const recruitmentsContext = createContext()

export const useRecruitments = () => useContext(recruitmentsContext)

export default function RecruitmentsProvider({children}) { 
    const [recruitments, setRecruitments] = useState([])
    const [recruitmentDetails, setRecruitmentDetails] = useState()

    function getRecruitments () {
        return new Promise((resolve) => $.ajax({
            type: "POST",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/utils/getRecruitments.php",
            success: (data) => {
                setRecruitments(data)
            },
            error: () => {
                return "Error retrieving data"
            }
        }))
    }

    function getRecruitmentDetails (event) {
        event.preventDefault()
        const recruitmentID = $(event.target).find("select#recruitmentID").val()
        recruitmentID === "-- select --" ? 
            alert("Select Recruitment ID") :
            recruitments.map(recruitment => recruitment.recruitmentID === recruitmentID && setRecruitmentDetails(recruitment))
    }

    return (
        <recruitmentsContext.Provider value={{recruitments, getRecruitments, recruitmentDetails, getRecruitmentDetails}}>
            {children}
        </recruitmentsContext.Provider>
    )
}