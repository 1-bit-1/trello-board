import { CONSTANTS } from "../actions";

let listID = 0;

// const initialState = [
//   {
//     title: "Last Episode",
//     id: 0,
//     cards: [
//       {
//         id: 0,
//         text: "we have created this card 0",
//       },
//       {
//         id: 1,
//         text: "we have created this card 1",
//       },
//       {
//         id: 2,
//         text: "we have created this card 2",
//       },
//     ],
//   },
//   {
//     title: "This Episode",
//     id: 1,
//     cards: [
//       {
//         id: 0,
//         text: "we have created this card 0 in this episode",
//       },
//       {
//         id: 1,
//         text: "we have created this card 1 for this episode",
//       },
//       {
//         id: 2,
//         text: "we have created this card 2 here feeeeeeeeeeez we have created this card 2 here feeeeeeeeeeez createdp",
//       },
//     ],
//   },
//   {
//     title: "Next Episode",
//     id: 2,
//     cards: [
//       {
//         id: 0,
//         text: "we have created this card 0 in this episode",
//       },
//       {
//         id: 1,
//         text: "we have created this card 1 for this episode",
//       },
//       {
//         id: 2,
//         text: "we have created this card 2 here",
//       },
//     ],
//   },
//
//
//
// ];

let initialState = localStorage.getItem("lists");

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      if (state) {
        let lstID = [...state].length;
        const sNewList = {
          title: action.payload,
          cards: [],
          id: `list-${lstID}`,
        };
        // listID += 1;
        return [...state, sNewList];
      } else {
        const newList = {
          title: action.payload,
          cards: [],
          id: `list-${listID}`,
        };
        // listID += 1;
        return [newList];
      }

    ///////////////////////////////
    // const newList = {
    //   title: action.payload,
    //   cards: [],
    //   id: `list-${listID}`,
    // };
    // listID += 1;
    // if (state) {
    //   return [...state, newList];
    // }
    // return [newList];
    ///////////////////////////////
    case CONSTANTS.ADD_CARD:
      const cardID = () => {
        let cardLen = 0;
        for (var i = 0; i < state.length; i++) {
          let stateCardLen = state[i].cards.length;
          if (stateCardLen === null) {
            stateCardLen = 0;
          }
          cardLen = cardLen + stateCardLen;
        }
        return cardLen;
      };
      let ID = cardID();
      /////////////////////////////////////////////
      if (state) {
        const newCard = {
          id: `card-${ID}`,
          text: action.payload.text,
        };
        // cardID += 1;
        const newState = state.map((list) => {
          if (list.id === action.payload.listID) {
            return { ...list, cards: [...list.cards, newCard] };
          } else {
            return list;
          }
        });
        return newState;
      } else {
        return;
      }

    case CONSTANTS.UPDATE_LIST:
      // let updatedList;
      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          let title = action.payload.title;
          // updatedList = {
          //   id: list.id,
          //   title: action.payload.title,
          //   cards: list.cards,
          // };
          // state = state.pop(list);
          return { ...list, title: title };
        }
        return { ...list };
      });
      return newState;

    case CONSTANTS.UPDATE_CARD:
      // const updatedCardState = state.map((list) => {
      //   if (list.id === action.payload.listID) {
      //     let cards = list.cards;
      //     const updatedCard = cards.map((card) => {
      //       if (card.id === action.payload.cardID) {
      //         let text = action.payload.text;
      //         let newUpdatedCard = {
      //           id: card.id,
      //           text: text,
      //         };
      //         cards = cards.pop(card);
      //         return { ...list, cards: [cards, newUpdatedCard] };
      //       } else {
      //         return list;
      //       }
      //     });
      //     return updatedCard;
      //   } else {
      //     return { ...list };
      //   }
      // });
      // return updatedCardState;
      return state;

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
      } = action.payload;
      const newDragState = [...state];
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list) => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find((list) => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newDragState;
    }

    default:
      return state;
  }
};

export default listReducer;
