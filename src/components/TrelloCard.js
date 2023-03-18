import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TrelloUpdateButton from "./TrelloUpdateButton";
import { Draggable } from "react-beautiful-dnd";

const TrelloCard = ({ text, listID, cardID, index }) => {
  return (
    <Draggable draggableId={String(cardID)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card style={styles.cardContainer}>
            <CardContent>
              <Typography gutterBottom>{text}</Typography>
              <TrelloUpdateButton listID={listID} cardID={cardID} />
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

const styles = {
  cardContainer: {
    marginBottom: 8,
    wordWrap: "break-word",
  },
  // editIcon: {
  //   // display: "none",
  //   float: "right",
  //   marginBottom: 10,
  // },
};

export default TrelloCard;
