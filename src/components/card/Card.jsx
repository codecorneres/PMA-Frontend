import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getIssue, updateIssue } from "../../actions/board";

import CardMUI from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import SubjectIcon from "@material-ui/icons/Subject";
import {
  TextField,
  CardContent,
  Button,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import CardModal from "./CardModal";

const Card = ({ issueId, list, index }) => {
  const [editing, setEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [height, setHeight] = useState(0);
  const [completeItems, setCompleteItems] = useState(0);

  const cardRef = useRef(null);
  const card = useSelector((state) =>
    state.board.issues.find((object) => object.id === issueId)
  );
  const dispatch = useDispatch();

  // console.log(card, "a specific issue")
  // console.log(issueId, "Issue id in frontend");

  useEffect(() => {
    dispatch(getIssue(issueId));
  }, []);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
    }
  }, [card]);

  useEffect(() => {
    cardRef && cardRef.current && setHeight(cardRef.current.clientHeight);
  }, [list, card, cardRef]);

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    dispatch(updateIssue(issueId, { title }));
    setEditing(false);
  };

  return !card ? (
    ""
  ) : (
    <>
      <CardModal
        issueId={issueId}
        open={openModal}
        setOpen={setOpenModal}
        card={card}
        list={list}
      />
      {!editing ? (
        <CardMUI className={`card ${!editing ? "mouse-over" : ""}`}>
          {!editing && (
            <Button
              style={{
                position: "absolute",
                bottom: height - 40,
                left: "180px",
                zIndex: 1,
              }}
              onClick={() => setEditing(true)}
            >
              <EditIcon fontSize="small" />
            </Button>
          )}
          <CardContent
            onClick={() => {
              setOpenModal(true);
            }}
            ref={cardRef}
          >
            {card.title && card.title !== "none" && (
              <div
                className="card-label"
                style={{ backgroundColor: card.label }}
              />
            )}
            <p>{card.title}</p>
            <div className="card-bottom">
              <div className="card-bottom-left">
                {card.description && (
                  <SubjectIcon
                    className="description-indicator"
                    fontSize="small"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </CardMUI>
      ) : (
        <form className="create-card-form" onSubmit={(e) => onSubmitEdit(e)}>
          <CardMUI>
            <CardContent className="card-edit-content">
              <TextField
                margin="normal"
                fullWidth
                multiline
                required
                label="Edit this card's title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDownCapture={(e) => e.key === "Enter" && onSubmitEdit(e)}
              />
            </CardContent>
          </CardMUI>
          <div className="card-actions">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                // setMouseOver(false);
                setTitle(card.title);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

Card.propTypes = {
  issueId: PropTypes.number.isRequired,
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
