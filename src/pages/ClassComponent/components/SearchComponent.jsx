import { Input } from "antd";
import useClassStore from "../useClassStore";

const SearchComponent = () => {
  const setClassName = useClassStore((state) => state.setClassName);

  const handleChange = (value) => {
    setClassName(value);
  };

  return (
    <div className="d-flex w-25 gap-3">
      <Input
        placeholder="Tìm kiếm"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
