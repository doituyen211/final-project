import axios from "axios";

const apiEndpoint =
  "https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract";

// Lấy danh sách hợp đồng
export const fetchContracts = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    // Sắp xếp theo `status` (true trước) và `updated_at` (giảm dần)
    const sortedContracts = response.data.sort((a, b) => {
      if (b.status === a.status) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return b.status - a.status;
    });

    return sortedContracts;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu!", error);
    throw error;
  }
};

// Thêm mới hợp đồng
export const addContract = async (newContract) => {
  try {
    const response = await axios.post(apiEndpoint, newContract);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi thêm hợp đồng!", error);
    throw error;
  }
};

// Cập nhật hợp đồng
export const updateContract = async (updatedContract) => {
  try {
    const response = await axios.put(
      `${apiEndpoint}/${updatedContract.id}`,
      updatedContract,
    );
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật hợp đồng!", error);
    throw error;
  }
};

// Xóa hợp đồng (status = false)
export const deleteContract = async (contractId, contractToUpdate) => {
  try {
    const response = await axios.put(`${apiEndpoint}/${contractId}`, {
      ...contractToUpdate,
      status: false,
    });
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật trạng thái hợp đồng!", error);
    throw error;
  }
};
