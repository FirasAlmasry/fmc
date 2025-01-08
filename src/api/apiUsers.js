import axios from "../utils/axios";

export const getUsers = async (group_id) => {
    const { data } = await axios.get(`/user?group_id=${group_id}`);
    return data;
};
