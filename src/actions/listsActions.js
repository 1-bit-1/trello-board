import { CONSTANTS } from "../actions";

export const addList = (title) => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: title,
  };
};
export const updateList = (title, listID) => {
  return {
    type: CONSTANTS.UPDATE_LIST,
    payload: { title, listID },
  };
};
export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  return {
    type: "CONSTANTS.DRAG_HAPPENED",
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
    },
  };
};
