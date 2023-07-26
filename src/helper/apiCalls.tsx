import axios from 'axios';

export function getApi(api:string) {
    try {
        let response = axios.get(api);
        return response
    } catch (error) {
        return error;
    }
}