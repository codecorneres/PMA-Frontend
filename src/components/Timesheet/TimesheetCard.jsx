import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import useStyles from "../../utils/modalStyles";
import { getTimesheetsOfUser } from "../../actions/board";
import { useDispatch } from "react-redux";

const TimesheetCard = ({ timesheetId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmitClick = () => {
    dispatch(getTimesheetsOfUser(timesheetId));
  };

  // console.log(timesheetId, "timesheed Id");

  return (
    <>
      <Link
        to={`/timesheet/${timesheetId}`}
        key={timesheetId}
        style={{ textDecoration: "none" }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "30px" }}
          className={classes.button}
          onClick={handleSubmitClick}
        >
          Add Timesheet
        </Button>
      </Link>
    </>
  );
};

export default TimesheetCard;
