import React from "react";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextArea from "react-textarea-autosize";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class TrelloActionButton extends React.Component {
  state = {
    formOpen: false,
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: "",
      });
      dispatch(addList(text));
    }

    return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: "",
      });
      dispatch(addCard(listID, text));
    }

    return;
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add a list" : "Add a card";
    const buttonTextOpacity = list ? "1" : "0.5";
    const buttonTextcolor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,0.15)" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextcolor,
          background: buttonTextBackground,
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;

    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add list" : "Add card";

    return (
      <div>
        <Card
          style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <TextArea
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
            style={{
              resize: "none",
              outline: "none",
              border: "none",
              width: "100%",
              overflow: "hidden",
              //   padding: 8,
              //   borderRadius: 3,
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            varient="contained"
            style={
              list
                ? { color: "white", backgroundColor: "#003a6af2" }
                : { color: "white", backgroundColor: "#026aa7" }
            }
          >
            {buttonTitle}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openFormButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 262,
    paddingLeft: 10,
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
};

export default connect()(TrelloActionButton);
