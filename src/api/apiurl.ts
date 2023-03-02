import axios from "axios";
import { requestInterceptor, responseInterceptor } from "./interceptor";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use(
    requestInterceptor
)

axios.interceptors.response.use(responseInterceptor, responseInterceptor);


const checkErrorResponse = (error: any, optionalConfig: any) => {

    return { error: { errorMessages: `Error with satus code:${error?.response?.status}` } };
    // }
}
export async function getData(apiUrl: string, params = {}, optionalConfig = {}) {
    // try {
    return await axios.get(apiUrl, {
        params
    })
    // }
    // catch (error) {
    // return checkErrorResponse(error, optionalConfig);
    // }
}