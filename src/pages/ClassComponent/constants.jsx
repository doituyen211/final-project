export const getConfigInput = (mode) => [
  {
    label: "Mã lớp",
    placeholder: "Nhập mã lớp",
    disabled: mode,
    type: "text",
  },
  {
    label: "Mã chương trình đào tạo",
    placeholder: "Nhập mã chương trình đào tạo",
    disabled: mode,
    type: "text",
  },
  {
    label: "Tên lớp",
    placeholder: "Nhập tên lớp",
    disabled: mode,
    type: "text",
  },
  {
    label: "Sĩ số",
    placeholder: "Nhập sĩ số",
    disabled: mode,
    type: "text",
  },
  {
    label: "Ngày bắt đầu",
    placeholder: "",
    disabled: mode,
    type: "date",
  },
  {
    label: "Ngày kết thúc",
    placeholder: "",
    disabled: mode,
    type: "date",
  },
];

export const columns = [
  {
    key: "ma_lop",
    label: "Mã lớp",
  },
  {
    key: "ma_ctdt",
    label: "Mã chương trình đào tạo",
  },
  {
    key: "ten_lop",
    label: "Tên lớp",
  },
  {
    key: "si_so",
    label: "Sĩ số",
  },
  {
    key: "ngay_bat_dau",
    label: "Ngày bắt đầu",
  },
  {
    key: "ngay_ket_thuc",
    label: "Ngày kết thúc",
  },
];
