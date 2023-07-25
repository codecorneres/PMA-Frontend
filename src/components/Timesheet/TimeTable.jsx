import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useSelector } from "react-redux";

const columns = [
  { id: "IssueTitle", label: "Issue Name", minWidth: 170 },
  { id: "Start", label: "Start Time", minWidth: 100 },
  {
    id: "End",
    label: "End Time",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "TotalTime",
    label: "Time in Minutes",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function TimeTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const issue = useSelector((state) => state?.board?.issue);

  const tableData = issue?.Timesheets?.map((timesheet) => {
    console.log(timesheet.id, "timesheet Id");
    return {
      IssueTitle: issue.title,
      Start: timesheet.startTime,
      End: timesheet.endTime,
      TotalTime: timesheet.time_in_minutes,
      id: timesheet.id,
    };
  });
  console.log(issue?.Timesheets, "getdattttttt");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(issue, "current issue belonging user");

  return (
    <Paper
      sx={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "8px",
        border: "1px solid gray",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
