import axios from "axios";

export const getDecisionAll = () => {
    return axios.get('https://66b0477a6a693a95b5383ecc.mockapi.io/decision')
        .then(response => response.data)
        .catch(error => {
            console.error('There was an error retrieving the decisions!', error);
            throw error;
        });
};

export const addDecision = (decision) => {
    return axios.post('https://66b0477a6a693a95b5383ecc.mockapi.io/decision', decision)
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error adding the decision!", error);
            throw error;
        });
}; 
export const updateDecision = (id, decision) => {
    return axios.put(`https://66b0477a6a693a95b5383ecc.mockapi.io/decision/${id}`, decision)
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error updating the decision!", error);
            throw error;
        });
};

export const deleteDecision = async (id) => {
    try {
        const response = await axios.delete(`https://66b0477a6a693a95b5383ecc.mockapi.io/decision/${id}`);
        return response.data;
    } catch (error) {
        console.error("There was an error deleting the decision!", error);
        throw error;
    }
};