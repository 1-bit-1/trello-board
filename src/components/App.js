import React, { Component } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../actions";
// import { HashRouter } from "react-router-dom";

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  render() {
    const { lists } = this.props;
    console.log(lists);

    if (lists) {
      return (
        // <HashRouter basename="/">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="App">
            <h2 style={{ color: "white", marginLeft: 15 }}>
              Trello Board Clone
            </h2>
            <div style={styles.listsContainer}>
              {lists.map((list) => (
                <TrelloList
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                />
              ))}
              <TrelloActionButton list />
            </div>
          </div>
        </DragDropContext>
        // </HashRouter>
      );
    } else {
      return (
        // <HashRouter base="/">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="App">
            <h2 style={{ color: "white", marginLeft: 15 }}>
              Trello Board Clone
            </h2>
            <div style={styles.listsContainer}>
              <TrelloActionButton list />
            </div>
          </div>
        </DragDropContext>
        // </HashRouter>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
});

const styles = {
  listsContainer: {
    display: "flex",
  },
};

export default connect(mapStateToProps)(App);
