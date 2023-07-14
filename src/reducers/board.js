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
} from "../actions/types";

const initialState = {
  projects: [],
  project: null,
  issues: [],
  issue: null,
  lists: [],
  list: null,
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
          if (list._id === payload._id) {
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
    default:
      return state;
  }
};

export default boardReducer;
