import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import TrelloUpdateButton from "./TrelloUpdateButton";
import { Droppable } from "react-beautiful-dnd";

const TrelloList = ({ title, cards, listID }) => {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        // "deploy": "gh-pages -d build",
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={styles.container}
        >
          <div style={styles.titleContainer}>
            <h3 style={styles.title}>{title}</h3>
            {/* <h3 style={status ? styles.titleOff : styles.title}>{title}</h3> */}
            <TrelloUpdateButton list listID={listID} />
          </div>
          {cards.map((card, index) => (
            <TrelloCard
              listID={listID}
              cardID={card.id}
              key={card.id}
              text={card.text}
              index={index}
            />
          ))}
          <TrelloActionButton listID={listID} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const styles = {
  container: {
    backgroundColor: "#dfe3e6",
    borderRadius: 3,
    width: 300,
    padding: 8,
    height: "100%",
    marginRight: 8,
    cursor: "pointer",
    zIndex: 10,
  },
  title: {
    paddingLeft: 10,
  },
  titleOff: {
    display: "none",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  // editIcon: {
  //   // display: "none",
  //   marginTop: 20,
  //   marginRight: 10,
  // },
};

export default TrelloList;
