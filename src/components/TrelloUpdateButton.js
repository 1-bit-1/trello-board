import React, { Component } from "react";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextArea from "react-textarea-autosize";
// import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import { updateList, updateCard } from "../actions";
// import { isFormOpen } from "./TrelloList";

class TrelloUpdateButton extends Component {
  state = {
    formOpen: false,
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleUpdateList = () => {
    const { listID, dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: "",
      });
      dispatch(updateList(text, listID));
    }

    return;
  };

  handleUpdateCard = () => {
    const { dispatch, listID, cardID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: "",
      });
      dispatch(updateCard(text, listID, cardID));
    }

    return;
  };

  renderUpdateButton = () => {
    const { list } = this.props;

    const buttonTitle = list ? "Edit List Title" : "Edit Card Text";

    return (
      <Icon
        style={list ? styles.editListIcon : styles.editCardIcon}
        title={buttonTitle}
        onClick={this.openForm}
      >
        edit
      </Icon>
    );
  };

  renderForm = () => {
    const { list } = this.props;

    const buttonTitle = list ? "Update list" : "Update card";

    return (
      <div>
        <Card
          style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
            zIndex: 20,
          }}
          status={this.state.formOpen}
        >
          <TextArea
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
            style={list ? styles.listTextArea : styles.cardTextArea}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={list ? this.handleUpdateList : this.handleUpdateCard}
            varient="contained"
            style={{
              color: "white",
              backgroundColor: "#026aa7",
              marginBottom: 8,
            }}
          >
            {buttonTitle}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderUpdateButton();
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
  editListIcon: {
    // display: "none",
    marginTop: 20,
    marginRight: 10,
    // "&:hover": {
    //   display: "block",
    // },
  },
  editCardIcon: {
    // display: "none",
    float: "right",
    marginBottom: 10,
    // "&:hover": {
    //   display: "block",
    // },
  },
  listTextArea: {
    resize: "none",
    outline: "none",
    border: "none",
    width: "100%",
    overflow: "visible",
    fontSize: "1.17em",
    fontWeight: "bold",
  },
  cardTextArea: {
    resize: "none",
    outline: "none",
    border: "none",
    width: "100%",
    overflow: "hidden",
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
  },
};

export default connect()(TrelloUpdateButton);
