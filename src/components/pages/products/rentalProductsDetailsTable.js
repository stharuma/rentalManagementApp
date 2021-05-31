import React, { useState } from "react";
import UseTable from "../../tables/useTable";
import { TableBody, TableRow, TableCell, makeStyles } from "@material-ui/core";

/**
 * @author Suresh Tharuma
 * @function RentalProducts
 **/

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "code", label: "Code" },
  { id: "availability", label: "Availability" },
  { id: "needToRepair", label: "Need To Repair" },
  { id: "durability", label: "Durability" },
  { id: "mileage", label: "Mileage" },
];

const RentalProductsDetailsTable = ({ records }) => {
  const classes = useStyles();
  const { TblContainer, TblHead, TblPagination, recordsAfterPaging } = UseTable(headCells, records);

  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPaging().map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.code}</TableCell>
              <TableCell>{record.availability.toString()}</TableCell>
              <TableCell>{record.needing_repair.toString()}</TableCell>
              <TableCell>{record.durability}</TableCell>
              <TableCell>{record.mileage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      {records.length > 5 && <TblPagination />}
    </>
  );
};

export default RentalProductsDetailsTable;
