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
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ list, index }) => {
  const [addingCard, setAddingCard] = useState(false);
  const dispatch = useDispatch();

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  const getAllIssues = () => {
    dispatch(getProject(list.project_id));
  };

  return (
    <Draggable draggableId={`${list.id}`} index={index}>
      {(provided) => (
        <div
          className="list-wrapper"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list-top">
            <ListTitle list={list} />
            <ListMenu listId={list.id} />
          </div>

          <Droppable droppableId={`${list.id}`} type="card">
            {(provided) => (
              <div
                className={`list ${
                  addingCard ? "adding-card" : "not-adding-card"
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="cards">
                  {list?.issues?.map((issue, index) => (
                    <div>
                      <IssueCard
                        key={issue.id}
                        list={list}
                        issue={issue}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
                {provided.placeholder}

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
            )}
          </Droppable>

          {!addingCard && (
            <div className="create-card-button">
              <Button variant="contained" onClick={() => setAddingCard(true)}>
                + Add a card
              </Button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

List.propTypes = {
  list: PropTypes.shape({}).isRequired,
};

export default List;
