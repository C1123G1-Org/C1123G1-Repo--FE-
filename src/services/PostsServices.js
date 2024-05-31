import axios from 'axios';
import { POST_API } from '../constants/AppConstant';

export const getAllPost = async () => {
    try {
        return (await axios.get(`${POST_API}/newests`)).data;
    } catch (e) {
        return [];
    }
}