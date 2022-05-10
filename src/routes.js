import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const manpowermain = React.lazy(() => import('./Demo/UIElements/Basic/manpowermain'));
const manpowerdept = React.lazy(() => import('./Demo/UIElements/Basic/manpowerdept'));
const manpowerdeptdetail = React.lazy(() => import('./Demo/UIElements/Basic/manpowerdeptdetail'));

const candidatemain = React.lazy(() => import('./Demo/UIElements/Basic/candidatemain'));
const candidatedept = React.lazy(() => import('./Demo/UIElements/Basic/candidatedept'));
const candidatedeptdetail = React.lazy(() => import('./Demo/UIElements/Basic/candidatedeptdetail'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const registermain = React.lazy(() => import('./Demo/UIElements/Basic/registermain'));

const PDMain = React.lazy(() => import('./Demo/UIElements/Basic/pdmain'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/manpower/main', exact: true, name: 'Manpower Dept', component: manpowermain },
    { path: '/manpower/main/dept/:Dept', exact: true, name: 'Manpower Dept', component: manpowerdept },
    { path: '/manpower/main/dept/detail/:Dept/:Position', exact: true, name: 'Manpower Dept Detail', component: manpowerdeptdetail },
    { path: '/candidate/main', exact: true, name: 'Basic Badges', component: candidatemain },
    { path: '/candidate/dept/:Dept', exact: true, name: 'Basic Badges', component: candidatedept },
    { path: '/candidate/dept/detail/:Dept/:Position', exact: true, name: 'Basic Badges', component: candidatedeptdetail },
    { path: '/register/main', exact: true, name: 'Register', component: registermain },
    { path: '/register/main/:Id', exact: true, name: 'Register Action', component: registermain },
    { path: '/pd/main', exact: true, name: 'PD Main', component: PDMain },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;