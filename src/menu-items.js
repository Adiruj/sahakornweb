export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'ui-element',
            title: 'Application',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'app1',
                    title: 'Recruitment & Selection',
                    type: 'collapse',
                    icon: 'feather icon-search',
                    children: [
                        {
                            id: 'Manpower-page',
                            title: 'Manpower',
                            type: 'item',
                            url: '/manpower/main'
                        },
                        {
                            id: 'Candidate-page',
                            title: 'Candidate',
                            type: 'item',
                            url: '/candidate/main'
                        },
                        {
                            id: 'Register-page',
                            title: 'Register / Edit',
                            type: 'item',
                            url: '/register/main'
                        },
                        {
                            id: 'PD-page',
                            title: 'PD Request / Approve',
                            type: 'item',
                            url: '/PD/main'
                        },
                    ]
                },
                {
                    id: 'app2',
                    title: 'Traning & Development',
                    type: 'item',
                    icon: 'feather icon-trending-up',
                    url: '#'
                },
                {
                    id: 'app3',
                    title: 'Compensation & Benefit',
                    type: 'item',
                    icon: 'feather icon-credit-card',
                    url: '#'
                },
                {
                    id: 'app4',
                    title: 'Employment & Relation',
                    type: 'item',
                    icon: 'feather icon-users',
                    url: '#'
                }
            ]
        },
        {
            id: 'pages',
            title: 'Setting',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'setting',
                    title: 'Setting',
                    type: 'item',
                    url: '/basic/tabs-pills',
                    icon: 'feather icon-settings',
                },
                {
                    id: 'sample-page',
                    title: 'Profile',
                    type: 'item',
                    url: '/sample-page',
                    classes: 'nav-item',
                    icon: 'feather icon-user'
                },
                {
                    id: 'docs',
                    title: 'About',
                    type: 'item',
                    url: '/docs',
                    classes: 'nav-item',
                    icon: 'feather icon-help-circle'
                },
                {
                    id: 'disabled-menu',
                    title: 'Logout',
                    type: 'item',
                    url: '/auth/signout',
                    classes: 'nav-item',
                    icon: 'feather icon-log-out'
                },
            ]
        }
    ]
}