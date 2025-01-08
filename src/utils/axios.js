import axios from "axios";

const transport = axios.create({
    baseURL: "https://fms.tinawiworld.com/api",
}); 

transport.interceptors.request.use((config) => {
    
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
transport.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized! Redirecting to login...");
            localStorage.removeItem('accessToken'); 
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default transport;
