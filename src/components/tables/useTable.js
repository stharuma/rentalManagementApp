import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import useStyles from "./useTableStyle";

/**
* @author Suresh Tharuma
* @function UseTable
**/

const UseTable = (headCells, records) => {
    const classes = useStyles();
   
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
    };
  };
  
  export default UseTable;
  