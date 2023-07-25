import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getProject } from "../../actions/board";
import { getIssues } from "../../actions/board";
import ListTitle from "./ListTitle";
import ListMenu from "./ListMenu";
import IssueCard from "../card/IssueCard";
import CreateCardForm from "./CreateCardForm";
import Button from "@material-ui/core/Button";

const List = ({ list }) => {
  const [addingCard, setAddingCard] = useState(false);
  const dispatch = useDispatch();

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  const getAllIssues = () => {
    dispatch(getProject(list.project_id));
  };
  useEffect(() => {
    // getAllIssues();
  }, []);

  // console.log(list?.issues, "all the issues");

  return (
    <div className="list-wrapper">
      <div className="list-top">
        <ListTitle list={list} />
        <ListMenu listId={list.id} />
      </div>

      <div className={`list ${addingCard ? "adding-card" : "not-adding-card"}`}>
        <div className="cards">
          {list?.issues?.map((issue) => {
            console.log(issue, "issue fetched out of list");
            return <IssueCard key={issue.id} list={list} issue={issue} />;
          })}
        </div>

        {addingCard && (
          <div ref={createCardFormRef}>
            <CreateCardForm
              listId={list.id}
              setAdding={setAddingCard}
              project_id={list.project_id}
            />
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
  list: PropTypes.shape({}).isRequired,
};

export default List;
