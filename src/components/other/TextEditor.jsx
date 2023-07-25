import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useState } from "react";
import { updateIssue } from "../../actions/board";
import { getIssue } from "../../actions/board";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import useStyles from "../../utils/modalStyles";

const TextEditor = ({ editing, setEditing, descriptionBody, issue }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [description, setDescription] = useState(descriptionBody);

  function handleDescriptionChange(value, delta, source, editor) {
    setDescription(value.replaceAll(/<\/?p[^>]*>/g, "").replace("<br>", ""));
  }

  const onDescriptionSubmit = async () => {
    dispatch(updateIssue(issue?.id, { description }));
  };

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  console.log(description, "the description in editor");

  return (
    <div>
      <p style={{ textAlign: "start", marginTop: "50px" }}>Add Description</p>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="write your content ...."
          value={!description ? "<br>" : `<p>${description}</p>`}
          onChange={handleDescriptionChange}
          style={{ height: "200px", width: "720px" }}
        ></ReactQuill>
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "50px" }}
        onClick={() => {
          onDescriptionSubmit();
          setEditing(false);
        }}
      >
        Save
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="default"
        style={{ marginTop: "50px", marginLeft: "15px" }}
        onClick={(e) => setEditing(false)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default TextEditor;
