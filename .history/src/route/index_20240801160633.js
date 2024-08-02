import {SubjectComponent, UserComponent} from '../pages';

export const routeSideBar = [
    {
        name: "Dashboard",
        icon: "nav-icon fas fa-tachometer-alt",
        component: UserComponent,
        to: "/",
        child: []
    },

    {
        name: "Form",
        icon: "nav-icon fas fa-edit",
        to: "#",
        child: [
            {
                name: "List",
                icon: "nav-icon fas fa-tachometer-alt",
                to: "/list",
                component: UserComponent,
            }
        ]
    },
    {
        name: "Education",
        icon: "nav-icon fas fa-book",
        to: "#",
        child: [
            {
                name: "Quản lý học viên",
                icon: "nav-icon fas fa-user",
                to: "/students",
            },
            {
                name: "Quản lý môn học",
                icon: "nav-icon fas fa-book",
                component: SubjectComponent,
                to: "/subjects",
            },
            {
                name: "Quản lý lớp",
                icon: "nav-icon fas fa-chalkboard-teacher",
                to: "/classes",
            },
            {
                name: "Quản lý bảo lưu",
                icon: "nav-icon fas fa-pause-circle",
                to: "/reservations",
            },
            {
                name: "Quản lý thành viên lớp",
                icon: "nav-icon fas fa-users",
                to: "/class-members",
            },
            {
                name: "Quản lý chương trình đào tạo",
                icon: "nav-icon fas fa-cogs",
                to: "/programs",
            },
            {
                name: "Quản lý điểm danh",
                icon: "nav-icon fas fa-calendar-check",
                to: "/attendance",
            },
            {
                name: "Quản lý khoá học",
                icon: "nav-icon fas fa-clipboard-list",
                to: "/courses",
            },
            {
                name: "Quản lý lịch học",
                icon: "nav-icon fas fa-calendar-alt",
                to: "/schedules",
            },
            {
                name: "Quản lý lịch thi",
                icon: "nav-icon fas fa-calendar-plus",
                to: "/exams",
            },
            {
                name: "Quản lý điểm số",
                icon: "nav-icon fas fa-chart-line",
                to: "/grades",
            }
        ]
    }
]
