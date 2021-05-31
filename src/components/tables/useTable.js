import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import useStyles from "./useTableStyle";
import UsePagination from "./usePagination";

/**
* @author Suresh Tharuma
* @function UseTable
**/

const UseTable = (headCells, records) => {
    const classes = useStyles();
    const { TblPagination, recordsAfterPaging } = UsePagination(records);

    const TblContainer = (props) => (
      <Table className={classes.table}>{props.children}</Table>
    );
  
    const TblHead = (props) => {
      return (
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>{headCell.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    };
  
    return {
      TblContainer,
      TblHead,
      TblPagination, 
      recordsAfterPaging
    };
  };
  
  export default UseTable;
  