import React, { useState } from "react";
import UseTable from "../../tables/useTable";
import {
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import Controls from "../../common/Controls";
import { Search } from "@material-ui/icons";

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
  { id: "needing_repair", label: "Need To Repair" },
  { id: "durability", label: "Durability" },
  { id: "mileage", label: "Mileage" },
];

const RentalProductsDetailsTable = ({ records }) => {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    dataAfterPagingAndSorting,
  } = UseTable(headCells, records, filterFn);

  const handleSearchRequest = (e) => {
    e.preventDefault();
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.name.toLowerCase().includes(target.value) ||
              x.code.toLowerCase().includes(target.value) ||
              x.durability == target.value ||
              x.mileage == target.value
          );
      },
    });
  };

  return (
    <>
      <Toolbar>
        <Controls.Input
          label="Search Employees"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchRequest}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {dataAfterPagingAndSorting().map((record) => (
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
