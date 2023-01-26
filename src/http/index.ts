import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios"
import { ElMessage } from 'element-plus'
import router from "../routes/routes";
const createAxiosByinterceptors = (config?: CreateAxiosDefaults): AxiosInstance => {
    const instance = axios.create({
        timeout: 1000,
        withCredentials: true,
        ...config,
    });
    instance.interceptors.response.use(function (response) {
        console.log(response)

        if (response.data.code === 403) {
            router.replace("/signin")
        }
        if (response.data.code === -1) {
            ElMessage.error(response.data.message)
        }
        return response;
    },
        function (error) {
            ElMessage.error(`${error.config.url} --- ${error.message}`)

            router.replace("/signin")
            return Promise.reject(error);
        });
    return instance;
};

const http = createAxiosByinterceptors({
    // headers: { "Content-Type": "application/json" }
})


export default http