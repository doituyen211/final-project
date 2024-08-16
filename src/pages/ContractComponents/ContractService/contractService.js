import axios from "axios";

const apiContract =
  "https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contracts";
const apiPersons =
  "https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Person";

// Lấy danh sách hợp đồng
export const fetchContracts = async () => {
  try {
    const { data } = await axios.get(apiContract);
    // Sắp xếp theo `status` (true trước) và `update_at` (giảm dần)
    const sortedContracts = data.sort((a, b) => {
      if (b.status === a.status) {
        return new Date(b.update_at) - new Date(a.update_at);
      }
      return b.status - a.status;
    });

    return sortedContracts;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu hợp đồng!", error);
    throw error;
  }
};

// Lấy danh sách nhân sự
export const fetchPersons = async () => {
  try {
    const { data } = await axios.get(apiPersons);
    return data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy danh sách nhân sự!", error);
    throw error;
  }
};

// Thêm mới hợp đồng
export const addContract = async (newContract) => {
  try {
    const { data } = await axios.post(apiContract, newContract);
    return data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi thêm hợp đồng!", error);
    throw error;
  }
};

// Cập nhật hợp đồng
export const updateContract = async (updatedContract) => {
  try {
    const { data } = await axios.put(
      `${apiContract}/${updatedContract.id}`,
      updatedContract,
    );
    return data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật hợp đồng!", error);
    throw error;
  }
};

// Xóa hợp đồng (status = false)
export const deleteContract = async (contractId) => {
  try {
    const { data } = await axios.put(`${apiContract}/${contractId}`, {
      status: false,
    });
    return data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật trạng thái hợp đồng!", error);
    throw error;
  }
};
// SQL :
// UPDATE contracts SET status = false WHERE id = $contractId;
// CREATE