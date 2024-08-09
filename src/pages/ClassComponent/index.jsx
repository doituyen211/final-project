import NotificationComponent from "../../components/NotificationComponent";
import PageContent from "./layouts/PageContent";
import PageHeader from "./layouts/PageHeader";

const ClassComponent = () => {
  return (
    <div>
      <PageHeader namePage={"Quản lý lớp học"} />
      <PageContent headerContent={"Danh sách lớp học"} />
      <NotificationComponent />
    </div>
  );
};

export default ClassComponent;
