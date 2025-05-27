import { useLocation, useRoutes } from 'react-router'

import Sidebar from './Sidebar'
import Header from './Header'

import Profile from './Profile'
import RecruitmentsOpen from './Recruitee/Recruitments/RecruitmentsOpen'
import RecruitmentsClosed from './Recruitee/Recruitments/RecruitmentsClosed'
import Apply from './Recruitee/Apply'
import ViewApplications from './Recruitee/Applications/ApplicationsOpen'
import ViewClosedApplications from './Recruitee/Applications/ApplicationsClosed'
import AppointmentsOpen from './Recruitee/Appointments/AppointmentsOpen'
import ViewClosedAppointments from './Recruitee/Appointments/AppointmentsClosed'

import CreateRecruitment from './Recruiter/CreateRecruitment'
import ManageRecruitments from './Recruiter/ManageRecruitments'
import AddSubjects from './Recruiter/AddSubjects'
import SubmitResults from './Recruiter/SubmitResults'
import CreateRankList from './Recruiter/CreateRankList'
import VerifyApplications from './Recruiter/VerifyApplications'
import SendAppointment from './Recruiter/SendAppointment'

import RecruitmentsProvider from '../Context/recruitmentsContext'
import { useUser } from '../Context/userContext'

export default function Content(props) { 
    const accType = useUser().accType

    document.getElementById('root').className = "root";
    
    const routes = useRoutes(
        (accType === "applicant") ? [
        {path: "/", element: <RecruitmentsOpen/>},
        {path: "/profile", element: <Profile/>},
        {path: "recruitmentsopen", element: <RecruitmentsOpen/>},
        {path: "recruitmentsclosed", element: <RecruitmentsClosed/>},
        {path: "applicationsopen", element: <ViewApplications/>},
        {path: "applicationsclosed", element: <ViewClosedApplications/>},
        {path: "apply", element: <Apply/>},
        {path: "appointmentsopen", element: <AppointmentsOpen/>},
        {path: "appointmentsclosed", element: <ViewClosedAppointments/>},
    ] : 
    [
        {path: "/", element: <CreateRecruitment/>},
        {path: "createrecruitments", element: <CreateRecruitment/>},
        {path: "addsubjects", element: <AddSubjects/>},
        {path: "managerecruitments", element: <ManageRecruitments/>},
        {path: "submitresults", element: <SubmitResults/>},
        {path: "createranklist", element: <CreateRankList/>},
        {path: "verifyapplications", element: <VerifyApplications/>},
        {path: "sendappointments", element: <SendAppointment/>}
    ])

    const pathname = useLocation().pathname
    
    return (
        <>
            <Sidebar/>

                <Header/>
                    {accType === "recruiter" ? 
                        <RecruitmentsProvider key={pathname}>
                            {routes}
                        </RecruitmentsProvider>
                        
                        :
                        
                        routes
                        
                    }
        </>
    )

}