import React from 'react';
import axios from './customize-axios';
const fetchAllTrainingPrograms = (page) => {
    return axios.get(`https://64dc81fbe64a8525a0f699a1.mockapi.io/api/v1/trainin_program?page=${page}&limit=5`);
};
const createProgram = (programName, courseName, fee, timeTrainning) => {
    return axios.post("https://64dc81fbe64a8525a0f699a1.mockapi.io/api/v1/trainin_program", { programName, courseName, fee, timeTrainning })
}
const updateProgram = (id, programName, courseName, fee, timeTrainning, status) => {
    return axios.put(`https://64dc81fbe64a8525a0f699a1.mockapi.io/api/v1/trainin_program/${id}`, { programName, courseName, fee, timeTrainning, status })
}
const deleteProgram = (id) => {
    return axios.delete(`https://64dc81fbe64a8525a0f699a1.mockapi.io/api/v1/trainin_program/${id}`)
}

export { fetchAllTrainingPrograms, createProgram, updateProgram, deleteProgram };