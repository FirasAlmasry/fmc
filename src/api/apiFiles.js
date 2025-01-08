import axios from "../utils/axios";

export const getFiles = async ({group_id, status}) => {
    const { data } = await axios.get(`/document?group_id=${group_id}&status=${status}`);
    return data;
};
export const getFile = async (id) => {
    const { data } = await axios.get(`/document/${id}`);
    return data;
};

export const addFile = async (req) => {
    const { data } = await axios.post('/document', req);
    return data;
};

export const deleteFile = async (id) => {
    const { data } = await axios.delete(`/document/${id}`);
    return data;
};

export const acceptFile = async (id) => {
    const { data } = await axios.put(`/document/${id}`);
    return data;
};

export const chickIn = async (req) => {
    const { data } = await axios.post('/check_in', req);
    return data;
};