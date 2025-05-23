import { useLocation, useRoutes } from 'react-router'

import Sidebar from './Sidebar'
import Header from '../Header'

import Profile from './profile'
import ViewRecruitmentsOpen from './Recruitee/Recruitments/ViewRecruitmentsOpen'
import ClosedRecruitments from './Recruitee/Recruitments/closedRecruitments'
import Apply from '../Apply'
import ViewApplications from './Applications/ViewApplications'
import ViewClosedApplications from './Applications/viewClosedApplications'
import AppointmentsOpen from './AppointmentsOpen'
import ViewClosedAppointments from './Appointments/viewClosedAppointments'

import CreateRecruitment from './Recruiter/CreateRecruitment'
import ManageRecruitments from './Recruiter/manageRecruitments'
import AddSubjects from './Recruiter/AddSubjects'
import SubmitResults from './Recruiter/SubmitResults'
import CreateRankList from './Recruiter/CreateRankList'
import VerifyApplication from './Recruiter/VerifyApplication'
import SendAppointment from './Recruiter/SendAppointment'

import RecruitmentsProvider from '../recruitmentsContext'
import { useUser } from '../userContext'

export default function Content(props) { 
    const accType = useUser().accType

    document.getElementById('root').className = "root";
    
    const routes = useRoutes(
        (accType === "applicant") ? [
        {path: "/", element: <ViewRecruitmentsOpen/>},
        {path: "/profile", element: <Profile/>},
        {path: "recruitments", element: <ViewRecruitmentsOpen/>},
        {path: "closedrecruitments", element: <ClosedRecruitments/>},
        {path: "applications", element: <ViewApplications/>},
        {path: "closedapplications", element: <ViewClosedApplications/>},
        {path: "apply", element: <Apply/>},
        {path: "appointments", element: <AppointmentsOpen/>},
        {path: "closedappointments", element: <ViewClosedAppointments/>},
    ] : 
    [
        {path: "/", element: <CreateRecruitment/>},
        {path: "createrecruitments", element: <CreateRecruitment/>},
        {path: "addsubjects", element: <AddSubjects/>},
        {path: "managerecruitments", element: <ManageRecruitments/>},
        {path: "submitresults", element: <SubmitResults/>},
        {path: "createranklist", element: <CreateRankList/>},
        {path: "verifyapplications", element: <VerifyApplication/>},
        {path: "sendappointments", element: <SendAppointment/>}
    ])

    return (
        <>
            <Sidebar/>

                <Header/>
                    {accType === "recruiter" ? 
                        <RecruitmentsProvider key={useLocation().pathname}>
                            {routes}
                        </RecruitmentsProvider>
                        
                        :
                        
                        routes
                        
                    }
        </>
    )

}