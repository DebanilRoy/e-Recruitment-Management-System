// Recruitment Search Bar Component

export default function RecruitmentIDSearchBar({children}) {
    return (
        <>
            <div className="fs-5">
                <label htmlFor="" className="d-block">Recruitment ID</label>
                <select name="recruitmentID" id="recruitmentID" className="form-select fs-5">
                    <option>-- select --</option>
                    {children}
                </select>
            </div>            
        </>
    )
}