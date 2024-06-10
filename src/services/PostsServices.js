import axios from 'axios';
import { POST_API } from '../constants/AppConstant';
import Cookies from "js-cookie";

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

// Bình
export const getPostWithPageAndStatus = async (page,status) => {
    try {
        return (await axios.get(`${POST_API}/mgt/${page}?status=${status}`)).data;
    } catch (e) {
        return [];
    }
}

export const createPost = async (postDto) => {
    try {
        return (await axios.post(`${POST_API}/create`, postDto)).data;
    } catch (e) {
        return [];
    }
}

export const updatePost = async (id,postDto) => {
    try {
        return (await axios.put(`${POST_API}/`+id, postDto,)).data;
    } catch (e) {
        return [];
    }
}

export const deletePost = async (id) => {
    try {
        return (await axios.delete(`${POST_API}/`+id)).data;
    } catch (e) {
        return [];
    }
}