import {
    AllowanceComponents,
    ClassComponent,
    ClassMembersComponent,
    ContractComponents,
    CourseComponent,
    CustomerSaleComponent,
    DashboardSalesComponent,
    DecisionComponent,
    DepartmentComponent,
    ExamComponent,
    LiabilityComponents,
    MarketingCampaignComponent,
    PersonelComponents,
    QualificationComponents,
    ReservationComponent,
    ScheduleComponent2,
    ScoreComponent,
    StudenInforComponent,
    StudentComponent,
    SubjectComponent,
    TimesheetComponent,
    TrainningProgramComponent,
    TuitionFeeComponent,
    UserComponent
} from "../pages";
import DashboardEducationComponent from "../pages/DashboardEducationComponent";
import AttendanceComponent from "../pages/AttendanceComponent";
import AttendanceStudent from "../pages/AttendanceStudentComponent";

export const routeSideBar = [
    {
        name: "Dashboard",
        icon: "nav-icon fas fa-tachometer-alt",
        component: UserComponent,
        to: "/",
        child: [],
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
            },
        ],
    },
    {
        name: "Education",
        icon: "nav-icon fas fa-book",
        to: "#",
        child: [
            {
                name: "Dashboard",
                icon: "nav-icon fas fa-tachometer-alt",
                to: "/dashboard-education",
                component: DashboardEducationComponent,
            },
            {
                name: "Quản lý học viên",
                icon: "nav-icon fas fa-user",
                to: "/students",
                component: StudentComponent,
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
                component: ClassComponent,
                to: "/classes",
            },
            {
                name: "Quản lý bảo lưu",
                icon: "nav-icon fas fa-pause-circle",
                to: "/reservations",
                component: ReservationComponent,
            },
            {
                name: "Thông tin học viên (sau xoa)",
                icon: "nav-icon fas fa-pause-circle",
                to: "/studentinfomation",
                component: StudenInforComponent,
            },

            {
                name: "Quản lý thành viên lớp",
                icon: "nav-icon fas fa-users",
                to: "/class-members",
                component: ClassMembersComponent,
            },
            {
                name: "Quản lý chương trình đào tạo",
                icon: "nav-icon fas fa-cogs",
                to: "/programs",
                component: TrainningProgramComponent,
            },
            {
                name: "Quản lý điểm danh",
                icon: "nav-icon fas fa-calendar-check",
                to: "/attendance",
                component: AttendanceComponent,
            },
            {
                name: "Quản lý khoá học",
                icon: "nav-icon fas fa-clipboard-list",
                component: CourseComponent,
                to: "/courses",
            },
            {
                name: "Quản lý lịch học",
                icon: "nav-icon fas fa-calendar-alt",
                to: "/schedules",
                component: ScheduleComponent2,
            },
            {
                name: "Quản lý lịch thi",
                icon: "nav-icon fas fa-calendar-plus",
                to: "/exams",
                component: ExamComponent,
            },
            {
                name: "Quản lý điểm số",
                icon: "nav-icon fas fa-chart-line",
                to: "/grades",
                component: ScoreComponent,
            },
        ],
    },
    {
        name: "Sales",
        icon: "nav-icon fas fa-dollar-sign",
        to: "#",
        child: [
            {
                name: "Dashboard",
                icon: "nav-icon fas fa-tachometer-alt",
                to: "/dashboard-sales",
                component: DashboardSalesComponent,
            },
            {
                name: "Quản lý học phí",
                icon: "nav-icon fas fa-money-bill-wave",
                to: "/tuitionfee",
                component: TuitionFeeComponent,
            },
            {
                name: "Chến dịch quảng cáo",
                icon: "nav-icon fas fa-money-bill-wave", // Use the appropriate icon for your marketing campaign
                to: "/marketing-campaigns", // Define the route for the new component
                component: MarketingCampaignComponent, // Add your new component here
            },
            {
                name: "Quản lý khách hàng",
                icon: "nav-icon fas fa-user", // Updated icon class
                to: "/khach-hang",
                component: CustomerSaleComponent,
            },
            {
                name: "Chương trình đào tạo",
                icon: "nav-icon fas fa-cogs",
                to: "/sale-program",
                component: TrainningProgramComponent,
            },
            {
                name: "Điểm danh của tao",
                icon: "nav-icon fas fa-cogs",
                to: "/my-attendance",
                component: AttendanceStudent,
            },
        ],
    },
    {
        name: "Form",
        icon: "nav-icon fas fa-edit",
        to: "/form",
        child: [
            {
                name: "List",
                icon: "nav-icon fas fa-tachometer-alt",
                to: "/list",
                component: UserComponent,
            },
        ],
    },
    {
        name: "Personnel",
        icon: "nav-icon fas fa-user-friends ",
        to: "/personal",
        child: [
            {
                name: "Personnel-List",
                icon: "nav-icon fas fa-solid fa-user",
                to: "/personnelList",
                component: PersonelComponents,
                child: [],
            },
            {
                name: "Contract-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/contracts",
                component: ContractComponents,
                child: [],
            },
            {
                name: "Allowance-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/allowances",
                component: AllowanceComponents,
                child: [],
            },
            {
                name: "Qualification-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/qualifications",
                component: QualificationComponents,
                child: [],
            },
            {
                name: "Department-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/departments",
                component: DepartmentComponent,
                child: [],
            },
            {
                name: "Decision-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/decisions",
                component: DecisionComponent,
                child: [],
            },
            {
                name: "Checkin-List",
                icon: "nav-icon fas fa-solid fa-check-to-slot",
                to: "/checkins",
                component: TimesheetComponent,
                child: [],
            },
        ],
    },
    {
        name: "Liability",
        icon: "nav-icon fas fa-edit",
        to: "/liability",
        child: [
            {
                name: "Liability-List",
                icon: "nav-icon fas fa-user-friends",
                to: "/liabilityList",
                component: LiabilityComponents,
                child: [],
            },
        ],
    },


];
