import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";
import useStyles from "./useTableStyle";
import UsePagination from "./usePagination";
import UseSort from "./useSort";

/**
 * @author Suresh Tharuma
 * @function UseTable
 **/

const UseTable = (headCells, records) => {
  const classes = useStyles();
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const { TblPagination, recordsAfterPaging } = UsePagination(records);
  const { stableSort, getComparator } = UseSort();

  const dataAfterPagingAndSorting =() => recordsAfterPaging(
    stableSort(records, getComparator(order, orderBy))
  );

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = (props) => {

    const handleSort = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => {
                    handleSort(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    dataAfterPagingAndSorting,
  };
};

export default UseTable;
