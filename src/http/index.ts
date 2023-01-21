import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios"


const createAxiosByinterceptors = (config?: CreateAxiosDefaults): AxiosInstance => {
    const instance = axios.create({
        timeout: 1000,
        withCredentials: true,
        ...config,
    });
    return instance;
};

const http = createAxiosByinterceptors({
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
})


export default http