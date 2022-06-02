import * as api from "../api";
import * as actions from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: actions.FETCH_ALL, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: actions.FETCH_POST, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: actions.FETCH_SEARCH, payload: data });
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost, history) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.createPost(newPost);
    dispatch({ type: actions.CREATE, payload: data });
    history.push(`/post/${data._id}`);
    dispatch({ type: actions.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: actions.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: actions.DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: actions.LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(comment, id);
    dispatch({ type: actions.COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
