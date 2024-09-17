// Service methods

import axios from 'axios';

const apiEndpoint = 'https://66b1fa111ca8ad33d4f5fb5f.mockapi.io/Position';
export const fetchPosition = async () => {
    try {
        const response = await axios.get(apiEndpoint);
        console.log(response.data);
        // Sorting positions based on 'status'; assuming 'true' values are sorted higher
        return response.data.sort((a, b) => b.status - a.status);
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
        throw error;
    }
};

// Add a new position
export const addPosition = async (newPosition) => {
    try {
        console.log(newPosition);
        const response = await axios.post(apiEndpoint, newPosition);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm chức vụ!', error);
        throw error;
    }
};

// Update an existing position
export const updatePosition = async (updatedPosition) => {
    try {
        const response = await axios.put(`${apiEndpoint}/${updatedPosition.id}`, updatedPosition);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật hợp đồng!', error);
        throw error;
    }
};

// Mark a position as inactive
export const deletePosition = async (id) => {
    try {
        // Fetch current data to maintain other fields
        const currentPosition = await axios.get(`${apiEndpoint}/${id}`);
        const updatePosition = {
            ...currentPosition.data,
            status: false
        };
        const response = await axios.put(`${apiEndpoint}/${id}`, updatePosition);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật trạng thái hợp đồng!', error);
        throw error;
    }
};