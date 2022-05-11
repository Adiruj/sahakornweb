import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Page/Dashboard/Default'));

const Manpower_Main = React.lazy(() => import('./Page/UIElements/Recuite/manpowermain'));
const Manpower_Dept = React.lazy(() => import('./Page/UIElements/Recuite/manpowerdept'));
const Manpower_Dept_Detail = React.lazy(() => import('./Page/UIElements/Recuite/manpowerdeptdetail'));

const Candidate_Main = React.lazy(() => import('./Page/UIElements/Recuite/candidatemain'));
const Candidate_Dept = React.lazy(() => import('./Page/UIElements/Recuite/candidatedept'));
const Candidate_Dept_Detail = React.lazy(() => import('./Page/UIElements/Recuite/candidatedeptdetail'));

const Register_Main = React.lazy(() => import('./Page/UIElements/Recuite/registermain'));

const Request_Main = React.lazy(() => import('./Page/UIElements/Recuite/mgrrequest'));
const PD_Main = React.lazy(() => import('./Page/UIElements/Recuite/pdmain'));

const Profilepage = React.lazy(() => import('./Page/Profile/Profile'));


const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/manpower/main', exact: true, name: 'Manpower Main', component: Manpower_Main },
    { path: '/manpower/main/dept/:Dept', exact: true, name: 'Manpower Dept', component: Manpower_Dept },
    { path: '/manpower/main/dept/detail/:Dept/:Position', exact: true, name: 'Manpower Dept Detail', component: Manpower_Dept_Detail },
    { path: '/candidate/main', exact: true, name: 'Basic Badges', component: Candidate_Main },
    { path: '/candidate/dept/:Dept', exact: true, name: 'Basic Badges', component: Candidate_Dept },
    { path: '/candidate/dept/detail/:Dept/:Position', exact: true, name: 'Basic Badges', component: Candidate_Dept_Detail },
    { path: '/register/main', exact: true, name: 'Register', component: Register_Main },
    { path: '/register/main/:Id', exact: true, name: 'Register Action', component: Register_Main },
    { path: '/pd/main', exact: true, name: 'PD Main', component: PD_Main },
    { path: '/request/main', exact: true, name: 'Request Main', component: Request_Main },
    { path: '/profile', exact: true, name: 'Default', component: Profilepage }
];

export default routes;