import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getList } from "../../actions/board";
import { getIssues } from "../../actions/board";
import ListTitle from "./ListTitle";
import ListMenu from "./ListMenu";
import Card from "../card/Card";
import CreateCardForm from "./CreateCardForm";
import Button from "@material-ui/core/Button";

const List = ({ listId, index }) => {
  const [addingCard, setAddingCard] = useState(false);
  const lists = useSelector((state) => state?.board?.lists);
  const list = useSelector((state) =>
    state?.board?.lists?.find((list) => {
      return list.id === listId;
    })
  );
  // const issues = useSelector((state) => state?.board?.issues);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [getList, dispatch, listId]);

  useEffect(() => {
    dispatch(getIssues());
  }, [getIssues, dispatch]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  console.log(list, "dudeeeeesssss");
  // console.log(listId, "THE LIST iD THAT i WANT");
  // console.log(list, "a single list");
  // console.log(issues, "issues in a list")
  // const issues = useSelector((state) => state.board.issues);
  return (
    <div className="list-wrapper">
      <div className="list-top">
        <ListTitle list={list} />
        <ListMenu listId={listId} />
      </div>

      <div className={`list ${addingCard ? "adding-card" : "not-adding-card"}`}>
        <div className="cards">
          {list?.issues?.map((issue, index) => (
            <Card key={issue.id} issueId={issue.id} list={list} index={index} />
          ))}
        </div>

        {addingCard && (
          <div ref={createCardFormRef}>
            <CreateCardForm listId={listId} setAdding={setAddingCard} />
          </div>
        )}
      </div>

      {!addingCard && (
        <div className="create-card-button">
          <Button variant="contained" onClick={() => setAddingCard(true)}>
            + Add a card
          </Button>
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  listId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
