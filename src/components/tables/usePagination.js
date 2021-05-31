import React, { useState } from "react";
import {
   TablePagination,
 } from "@material-ui/core";
import useStyles from "./useTableStyle";

/**
 * @author Suresh Tharuna
 * @function UsePagination
 **/

const UsePagination = (records) => {
  const classes = useStyles();
  const pages = [5, 10, 15, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  const recordsAfterPaging = (data) => {
    return data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  
  return {
    TblPagination,
    recordsAfterPaging
  };
};

export default UsePagination;
