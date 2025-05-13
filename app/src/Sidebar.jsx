import { useNavigate, Link, replace, NavLink } from "react-router"
import { useUser } from "./userContext"

export default Sidebar

function Sidebar() {
    
    const accType = useUser().accType

    if (accType === "applicant") {
        return (SidebarRecruitee())
    }

    else {
        return (SidebarRecruiter())
    }
}

function sideBarSwitch() {
    document.getElementById("sidebar").classList.toggle("sideBarOpen")
    document.getElementById("root").classList.toggle("sideBarClosed")
}

function SidebarRecruitee() {
    const navigate = useNavigate()
    return(
        <>
            <div id="sidebar" className="sideBar sideBarOpen">
                <div>
                    <svg onClick={() => {sideBarSwitch()}} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" 
                    className="btn bi bi-x-lg sideBarCloseButton" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>
                <div className="navBarDiv">
                    <p className="border-0 text-start mb-0 rounded-1 navLinkHeader">Recruitments</p>
                    <NavLink to="/content/recruitments" end className={(({isActive}) => "btn navLinkButton " + (isActive ? "active" : ""))}>Open Recruitments</NavLink>
                    <div className="horizontalLine"></div>
                    <NavLink to="/content/closedrecruitments" className={({isActive}) => "btn navLinkButton " + (isActive ? "active" : "")}>Closed Recruitments</NavLink>
                    <p className="border-0 text-start mb-0 rounded-1 navLinkHeader">Applications</p>
                    <NavLink to="/content/applications" className={({isActive}) => "btn navLinkButton " + (isActive ? "active" : "")}>Open Applications</NavLink>
                    <div className="horizontalLine"></div>
                    <NavLink to="/content/closedapplications" className={({isActive}) => "btn navLinkButton " + (isActive ? "active" : "")}>Closed Applications</NavLink>
                    <p className="border-0 text-start mb-0 rounded-1 navLinkHeader">Appointment Offers</p>
                    <NavLink to="/content/appointments" className={({isActive}) => "btn navLinkButton " + (isActive ? "active" : "")}>Open Offers</NavLink>
                    <div className="horizontalLine"></div>
                    <NavLink to="/content/closedappointments" id="buttonlapsedappointment" className={({isActive}) => "btn navLinkButton " + (isActive ? "active" : "")}>Previous Offers</NavLink>
                </div>
            </div>
        </>
    )
}

function SidebarRecruiter(props) {
    const navigate = useNavigate()
    return (
        <>
            <div id="sidebar" className="sideBar sideBarOpen">
                <div>
                    <svg onClick={() => {sideBarSwitch()}} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" 
                    className="btn bi bi-x-lg sideBarCloseButton" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>
                <div className="navBarDiv">
                    <p className="border-0 text-start mb-0 rounded-1 navLinkHeader">Recruitments</p>
                    <NavLink to="/content/createrecruitments" className={({isActive}) => "btn border-0 text-start navLinkButton " + (isActive ? "active" : "")}>Create Recruitments</NavLink>
                    <div className="horizontalLine"></div>
                    <NavLink to="/content/addsubjects" className={({isActive}) => "btn border-0 text-start navLinkButton " + (isActive ? "active" : "")}>Add/Modify Subjects</NavLink>
                    <div className="horizontalLine"></div>
                    <NavLink to="/content/managerecruitments" className={({isActive}) => "btn border-0 text-start navLinkButton " + (isActive ? "active" : "")}>Manage Recruitments</NavLink>
                    
                    <p className="border-0 text-start mb-0 rounded-1 navLinkHeader">Result and Rank List</p>
                    <NavLink to="/content/submitresults" className={({isActive}) => "btn border-0 text-start navLinkButton " + (isActive ? "active" : "")}>Submit Results</NavLink>
                    <div className="horizontalLine"></div>
                    <NavLink to="/content/createranklist" className={({isActive}) => "btn border-0 text-start navLinkButton " + (isActive ? "active" : "")}>Create Rank List</NavLink>
                    <p className="border-0 text-start mb-0 rounded-1 navLinkHeader verifyAppointments">Verification and Appointments</p>
                    <NavLink to="/content/verifyapplications" className={({isActive}) => "btn border-0 text-start navLinkButton " + (isActive ? "active" : "")}>Verify Applications</NavLink>
                    <div className="horizontalLine"></div>
                    <NavLink to="/content/sendappointments" className={({isActive}) => "btn border-0 text-start navLinkButton " + (isActive ? "active" : "")}>Send Appointments</NavLink>
                    <div className="horizontalLine"></div>
                    <NavLink to="/content/manageappointments" className={({isActive}) => "btn border-0 text-start navLinkButton " + (isActive ? "active" : "")}>Manage Appointments</NavLink>
                </div>
            </div>
        </>
    )
}

