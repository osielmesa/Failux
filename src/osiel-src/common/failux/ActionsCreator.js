// action creators
import {CHANGE_INTERVAL} from "./ActionTypes";

export const changeInterval = value => ({
  type: CHANGE_INTERVAL,
  payload: value
});