import { Button, CardContent, TextField } from "@material-ui/core";
import CardMUI from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SubjectIcon from "@material-ui/icons/Subject";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getComment, updateComment } from "../../actions/board";
import { useEffect, useState } from "react";

const CommentCard = ({ commentId }) => {
  const [commentBody, setCommentBody] = useState("");
  const [commentEditing, setCommentEditing] = useState(false);

  const comment = useSelector((state) =>
    state?.board?.comments?.find((comment) => {
      return comment.id === commentId;
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment(commentId));
  }, []);

  useEffect(() => {
    if (comment) {
      setCommentBody(comment?.body);
    }
  }, [comment]);

  const handleDelete = () => {
    dispatch(deleteComment(commentId));
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
  };

  // console.log(comment, "a single comment for card");

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
