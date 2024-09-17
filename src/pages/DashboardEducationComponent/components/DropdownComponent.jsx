import { Button, Dropdown } from "antd";
import useDashBoardStore from "../store";

const DropdownComponent = () => {
  const setYear = useDashBoardStore((state) => state.setYear);
  const year = useDashBoardStore((state) => state.year);

  const items = [
    {
      key: "2022",
      label: "Năm 2022",
      disabled: year === "2022",
    },
    {
      key: "2023",
      label: "Năm 2023",
      disabled: year === "2023",
    },
  ];

  const handleMenuClick = (e) => {
    setYear(e.key);
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement="bottom"
      arrow
    >
      <Button>Chọn năm học</Button>
    </Dropdown>
  );
};

export default DropdownComponent;
