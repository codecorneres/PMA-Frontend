import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import TimeTable from "../Timesheet/TimeTable";
import { addTimesheet, getIssue } from "../../actions/board";
// import { useParams } from "react-router-dom";

export default function Timesheet() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state?.board?.project);
  const issue = useSelector((state) => state?.board?.issue);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [startVal, setStartVal] = React.useState(dayjs("2022-04-17T15:30"));
  const [endVal, setEndVal] = React.useState(dayjs("2022-04-17T15:30"));
  // const { id } = useParams();

  const totalTime = (endVal - startVal) / (1000 * 60);

  useEffect(() => {
    if (project?.title) document.title = project.title + " | CodeCorners PMA";
  }, [project?.title]);

  const handleTimeSubmit = () => {
    dispatch(
      addTimesheet({
        startTime: startVal,
        endTime: endVal,
        time_in_minutes: totalTime,
        user_id: Number(user.id),
        project_id: Number(project.id),
        issue_id: Number(issue.id),
      })
    );

    console.log(issue.id, project.id, issue.id, "checkidddd");
  };

  return (
    <div className="board-and-navbar" style={{ maxHeight: "70vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "60px",
            backgroundColor: "white",
            marginTop: "45px",
            padding: "10px 10px",
            width: "80%",
            border: "1px solid gray",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div>Start Time: </div>
                  <DateTimePicker
                    value={startVal}
                    onChange={(newValue) => setStartVal(newValue)}
                    sx={{
                      width: "230px",
                      backgroundColor: "white",
                      borderRadius: 2,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div>End Time: </div>
                  <DateTimePicker
                    value={endVal}
                    onChange={(newValue) => setEndVal(newValue)}
                    sx={{
                      width: "230px",
                      backgroundColor: "white",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </DemoContainer>
          </LocalizationProvider>
          <div style={{ display: "flex", marginRight: "90px" }}>
            <div
              style={{
                marginTop: "35px",
                padding: "17px",
                border: "1px solid gray",
                borderRadius: "3px",
                marginRight: "50px",
              }}
            >
              Total Time: {totalTime} Minutes
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{
                marginTop: "35px",
                // marginLeft: "50px",
                padding: "12px 20px",
              }}
              onClick={handleTimeSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TimeTable issue={issue} />
      </div>
    </div>
  );
}
