import axios from 'axios';
import { POST_API } from '../constants/AppConstant';

export const getAllPost = async () => {
    try {
        return (await axios.get(`${POST_API}/all`)).data;
    } catch (e) {
        return [];
    }
}

export const getPostsWithPagination = async () => {
    try {
        return (await axios.get(`${POST_API}/list-post/0`)).data;
    } catch (e) {
        return [];
    }
}

export const getPostById = async (id) => {
    try {
        return (await axios.get(`${POST_API}/${id}`)).data;
    } catch (e) {
        return {};
    }
}