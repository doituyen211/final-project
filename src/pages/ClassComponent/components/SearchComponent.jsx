import { Button, Input } from "antd";

const SearchComponent = () => {
  return (
    <div className="d-flex w-25 gap-3">
      <Input placeholder="Tìm kiếm" />
      <Button>
        <i className="bi bi-search"></i>
      </Button>
    </div>
  );
};

export default SearchComponent;
