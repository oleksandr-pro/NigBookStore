import { SET_CURRENT_SCREEN, SET_CURRENT_TAB } from "../config/redux-events";
/* @flow */

const initialState = {
  screen: "Home",
  tab: "Dashboard"
};

export default function screenTracking(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_SCREEN:
      return {
        ...state,
        screen: action.data
      };
    case SET_CURRENT_TAB:
      return {
        ...state,
        tab: action.data
      };

    default:
      return state;
  }
}
