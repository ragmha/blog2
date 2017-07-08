import mapKeys from "lodash.mapkeys";
import omit from "lodash.omit";

import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../constants";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      const data = action.payload.data;
      return {
        ...state,
        [data.id]: data
      };
    case FETCH_POSTS:
      return mapKeys(action.payload.data, "id");

    case DELETE_POST:
      return omit(state, action.payload);

    default:
      return state;
  }
}
