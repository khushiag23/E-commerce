import axios from 'axios';
import { BASE_URL, HTTP_METHODS } from './constant';

export const apiCall = async (endpoint, method=HTTP_METHODS.GET, data=null) => {
    try {
        const response = await axios({
            url: BASE_URL + endpoint,
            method,
            data
        });
        return response;
    } catch (error) {
        console.error("API call error:", error);
        return error.response;
    }
}
