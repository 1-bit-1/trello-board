import { CONSTANTS } from "../actions";

export const addCard = (listID, text) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listID },
  };
};
export const updateCard = (text, listID, cardID) => {
  return {
    type: CONSTANTS.UPDATE_CARD,
    payload: { text, listID, cardID },
  };
};
