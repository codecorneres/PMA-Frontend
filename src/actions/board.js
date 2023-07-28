import axios from "axios";
import {
  GET_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  ADD_PROJECT,
  ADD_ISSUE,
  GET_ISSUES,
  GET_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
  GET_LISTS,
  GET_LIST,
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
  GET_COMMENT,
  UPDATE_COMMENT,
  ADD_ATTACHMENT,
  DELETE_ATTACHMENT,
  GET_ATTACHMENTS,
  GET_ATTACHMENT,
  UPDATE_ATTACHMENT,
  ADD_TIMESHEET,
  GET_TIMESHEETS,
  DELETE_TIMESHEET,
  MOVE_ISSUE,
  MOVE_LIST,
} from "./types";
import BASE_URL from "../utils/baseurl";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Get Projects
export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/projects/projects`);

    // console.log(res.data, "List of all projects ascasd");

    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Project
export const getProject = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/projects/projects/${id}`);
    // console.log(res.data, "project in action file");

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Add Project
export const addProject = (body) => async (dispatch) => {
  try {
    const data = JSON.stringify({ body });

    const res = await axios.post(`${BASE_URL}/projects/project`, data, config);
    // console.log(res.data, "resssss");

    dispatch({
      type: ADD_PROJECT,
      payload: res.data.project,
    });
    dispatch(getProjects);
  } catch (error) {
    console.log(error);
  }
};

// Update Project
export const updateProject = (id, title) => async (dispatch) => {
  try {
    const body = JSON.stringify({ title });
    const res = await axios.put(
      `${BASE_URL}/projects/projects/${id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
    dispatch(getProject(id));
  } catch (error) {
    console.log(error);
  }
};

// Delete Project
export const deleteProject = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/projects/projects/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
    dispatch(getProject(id));
  } catch (error) {
    console.log(error);
  }
};

// Get Issues
export const getIssues = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/issues/issues`);

    dispatch({
      type: GET_ISSUES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Issue
export const getIssue = (id) => async (dispatch) => {
  try {
    // console.log(id, "the issue id");
    const res = await axios.get(`${BASE_URL}/issues/issues/${id}`);

    dispatch({
      type: GET_ISSUE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Add Issue
export const addIssue = (issueData) => async (dispatch) => {
  try {
    const body = JSON.stringify({ issueData });
    const res = await axios.post(`${BASE_URL}/issues/issue`, body, config);

    dispatch({
      type: ADD_ISSUE,
      payload: res.data,
    });

    dispatch(getProject(issueData.project_id));
  } catch (error) {
    console.log(error);
  }
};

// Update Issue
export const updateIssue = (id, formData) => async (dispatch) => {
  try {
    const { description, title } = formData;
    console.log(id, description, title, "ggggggggggg in actions");
    const body = JSON.stringify({ description, title });

    const res = await axios.put(
      `${BASE_URL}/issues/issues/${id}`,
      body,
      config
    );
    dispatch(getIssue(id));

    dispatch({
      type: UPDATE_ISSUE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete Issue
export const deleteIssue = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/issues/issues/${id}`);

    dispatch({
      type: DELETE_ISSUE,
      payload: id,
    });
    dispatch(getProject(res.data.project_id));
  } catch (error) {
    console.log(error);
  }
};

// Get Lists
export const getLists = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/lists/lists`);
    // console.log(res.data, "all the lists");
    dispatch({
      type: GET_LISTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get list
export const getList = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/lists/lists/${id}`);

    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Add List
export const addList = (listData) => async (dispatch) => {
  try {
    const body = JSON.stringify({ listData });
    const res = await axios.post(`${BASE_URL}/lists/list`, body, config);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });
    dispatch(getProject(listData.project_id));
  } catch (error) {
    console.log(error);
  }
};

// Update List
export const updateList = (id, title) => async (dispatch) => {
  try {
    const body = JSON.stringify({ title });
    const res = await axios.put(`${BASE_URL}/lists/lists/${id}`, body, config);

    dispatch({
      type: UPDATE_LIST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete List
export const deleteList = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/lists/lists/${id}`);

    dispatch({
      type: DELETE_LIST,
      payload: id,
    });
    dispatch(getProject(res.data.project_id));
  } catch (error) {
    console.log(error);
  }
};

// Add Comment
export const addComment = (commentData) => async (dispatch) => {
  try {
    const data = JSON.stringify({ commentData });

    const res = await axios.post(`${BASE_URL}/comments/comment`, data, config);
    // console.log(res.data, "add comment api");
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Comments
export const getComments = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/comments/comments`);

    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Comment
export const getComment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/comments/comments/${id}`);

    dispatch({
      type: GET_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update Comment
export const updateComment = (id, commentData) => async (dispatch) => {
  try {
    const body = JSON.stringify({ commentData });

    const res = await axios.put(
      `${BASE_URL}/comments/comments/${id}`,
      body,
      config
    );

    // console.log(res.data, "Update comment api");

    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete Comment
export const deleteComment = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/comments/comments/${id}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

// Add Attachment
export const addAttachment = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/attachments/attachment`,
      body,
      config
    );

    dispatch({
      type: ADD_ATTACHMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Attachments
export const getAttachments = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/attachments/attachments`);

    dispatch({
      type: GET_ATTACHMENTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Attachment
export const getAttachment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/attachments/attachments/${id}`);

    dispatch({
      type: GET_ATTACHMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update Attachment
export const updateAttachment = (id, body) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/attachments/attachments/${id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_ATTACHMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete Attachment
export const deleteAttachment = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/attachments/attachments/${id}`);

    dispatch({
      type: DELETE_ATTACHMENT,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

// Add Timesheets
export const addTimesheet = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/timesheets/timesheet`,
      body,
      config
    );

    dispatch({
      type: ADD_TIMESHEET,
      payload: res.data,
    });
    dispatch(getIssue(body.issue_id));
  } catch (error) {
    console.log(error);
  }
};

// Get Timesheets of a User
export const getTimesheetsOfIssue = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/timesheets/timesheets/${id}`);
    // console.log(res.data, "timesheets in actions");
    dispatch({
      type: GET_TIMESHEETS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete a Timesheet
export const deleteTimesheet = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/timesheets/timesheet/${id}`);

    dispatch({
      type: DELETE_TIMESHEET,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

// Move Issue
export const moveIssue = (issueId, formData) => async (dispatch) => {
  console.log("moveIssue");
  // try {
  //   const body = JSON.stringify(formData);

  //   const res = await axios.put(`/api/issue/moveIssues/${issueId}`, body, config);

  //   dispatch({
  //     type: MOVE_ISSUE,
  //     payload: res.data,
  //   });
  // } catch (error) {
  //     console.log(error);
  // }
};

// Move list
export const moveList = (listId, formData) => async (dispatch) => {
  console.log("moveList");
  // try {
  //   const body = JSON.stringify(formData);

  //   const res = await axios.put(`/api/lists/moveLists/${listId}`, body, config);

  //   dispatch({
  //     type: MOVE_LIST,
  //     payload: res.data,
  //   });
  // } catch (error) {
  //     console.log(error)
  // }
};
