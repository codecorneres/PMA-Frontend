import { Button, CardContent, TextField } from "@material-ui/core";
import CardMUI from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SubjectIcon from "@material-ui/icons/Subject";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getComment,
  getIssue,
  updateComment,
} from "../../actions/board";
import { useEffect, useState } from "react";

const CommentCard = ({ commentId, comment, issueId }) => {
  const [commentBody, setCommentBody] = useState("");
  const [commentEditing, setCommentEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (comment) {
      setCommentBody(comment?.body);
    }
  }, [comment]);

  const handleDelete = () => {
    dispatch(deleteComment(commentId));
    setTimeout(() => {
      dispatch(getIssue(issueId));
    }, 50);
  };
  const handleEdit = () => {
    setCommentEditing(true);
  };
  const onCommentSubmit = () => {
    dispatch(
      updateComment(commentId, {
        body: commentBody,
        issue_id: comment.issue_id,
        project_id: comment.project_id,
      })
    );
    setTimeout(() => {
      dispatch(getIssue(issueId));
    }, 50);
  };

  return (
    <>
      {commentEditing ? (
        <div>
          <TextField
            style={{ marginTop: "5px", marginBottom: "10px" }}
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            label="Add Comment"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              onCommentSubmit();
              setCommentEditing(false);
            }}
          >
            Edit
          </Button>
        </div>
      ) : (
        <CardMUI className={`card`}>
          <Button
            style={{
              position: "absolute",
              right: "90px",
              zIndex: 1,
              marginLeft: "40PX",
              paddingTop: "15PX",
            }}
            onClick={() => handleDelete()}
          >
            <DeleteIcon fontSize="small" />
          </Button>
          <Button
            style={{
              position: "absolute",
              right: "30px",
              zIndex: 1,
              paddingTop: "15PX",
            }}
            onClick={handleEdit}
          >
            <EditIcon fontSize="small" />
          </Button>
          <CardContent>
            {commentBody && <div className="card-label" />}

            <p>{commentBody}</p>
          </CardContent>
        </CardMUI>
      )}
    </>
  );
};

export default CommentCard;
