import { useNavigate, useRoutes } from 'react-router'

import Sidebar from './Sidebar'
import Header from './Header'

import Profile from './profile'
import ViewRecruitmentsOpen from './ViewRecruitmentsOpen'
import ClosedRecruitments from './closedRecruitments'
import Apply from './Apply'
import ViewApplications from './ViewApplications'
import ViewClosedApplications from './viewClosedApplications'
import AppointmentsOpen from './AppointmentsOpen'
import ViewClosedAppointments from './viewClosedAppointments'

import CreateRecruitment from './CreateRecruitment'
import ManageRecruitments from './manageRecruitments'
import AddSubjects from './AddSubjects'
import SubmitResults from './SubmitResults'
import CreateRankList from './CreateRankList'
import VerifyApplication from './VerifyApplication'
import SendAppointment from './SendAppointment'


import { useUser } from './userContext'

export default function Content(props) { 
    const accType = useUser().accType
    console.log(sessionStorage.getItem('accType'))

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
                {routes}

        </>
    )

}