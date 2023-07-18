import {
  GET_PROJECTS,
  GET_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_ISSUES,
  GET_ISSUE,
  ADD_ISSUE,
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
} from "../actions/types";

const initialState = {
  projects: [],
  project: null,
  issues: [],
  issue: null,
  lists: [],
  list: null,
  comments: [],
  comment: null,
  attachments: [],
  attachment: null,
  loading: true,
  error: {},
};

const boardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  // console.log(payload, "list of projects");

  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload.projects,
        loading: false,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: payload.project,
        loading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects],
        loading: false,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === payload.project.id ? payload.project : project
        ),
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== payload),
        loading: false,
      };
    case GET_ISSUES:
      return {
        ...state,
        issues: payload,
        loading: false,
      };
    case GET_ISSUE:
      return {
        ...state,
        issue: payload,
        loading: false,
      };
    case ADD_ISSUE:
      return {
        ...state,
        issues: [payload, ...state.issues],
        loading: false,
      };
    case UPDATE_ISSUE:
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue._id === payload._id ? payload : issue
        ),
        loading: false,
      };
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter((issue) => issue._id !== payload),
        loading: false,
      };
    case GET_LISTS:
      return {
        ...state,
        lists: payload,
        loading: false,
      };
    case GET_LIST:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [payload, ...state.lists],
        loading: false,
      };
    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === payload.id) {
            return payload;
          } else {
            return list;
          }
        }),
        loading: false,
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== payload),
        loading: false,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload.comments,
        loading: false,
      };
    case GET_COMMENT:
      return {
        ...state,
        comment: payload.comment,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [payload, ...state.comments],
        loading: false,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === payload.id) {
            return payload;
          } else {
            return comment;
          }
        }),
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== payload.id),
        loading: false,
      };
    case GET_ATTACHMENTS:
      return {
        ...state,
        attachments: payload,
        loading: false,
      };
    case GET_ATTACHMENT:
      return {
        ...state,
        attachment: payload,
        loading: false,
      };
    case ADD_ATTACHMENT:
      return {
        ...state,
        attachments: [payload, ...state.attachments],
        loading: false,
      };
    case UPDATE_ATTACHMENT:
      return {
        ...state,
        attachments: state.attachments.map((attachment) => {
          if (attachment.id === payload.id) {
            return payload;
          } else {
            return attachment;
          }
        }),
      };
    case DELETE_ATTACHMENT:
      return {
        ...state,
        attachments: state.attachments.filter(
          (attachment) => attachment.id !== payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default boardReducer;
