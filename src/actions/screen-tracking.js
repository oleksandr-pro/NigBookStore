/* @flow */
import { SET_CURRENT_SCREEN, SET_CURRENT_TAB } from "../config/redux-events";

export function setScreen(name) {
  return {
    type: SET_CURRENT_SCREEN,
    data: name
  };
}

export function setTab(name) {
  return {
    type: SET_CURRENT_TAB,
    data: name
  };
}
