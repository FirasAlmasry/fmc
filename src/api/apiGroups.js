import axios from "../utils/axios";

export const getGroups = async () => {
    const { data } = await axios.get(`/group`);
    return data;
};
export const getGroup = async (id) => {
    const { data } = await axios.get(`/group/${id}`);
    return data;
};

export const getInvites = async () => {
    const { data } = await axios.get(`/invites`);
    return data;
};

export const addGroup = async (req) => {

    const { data } = await axios.post('/group', req, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
    });

    return data;
};
export const sendInvite = async (req) => {

    const { data } = await axios.post('/invites', req, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
    });

    return data;
};

export const acceptInvite = async (id) => {

    const { data } = await axios.put(`/invites/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
    });

    return data;
};

export const rejectInvite = async (id) => {

    const { data } = await axios.delete(`/invites/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
    });

    return data;
};