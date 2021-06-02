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
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import * as productService from "../../services/productService";

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
}));

const headCells = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "code", label: "Code" },
  { id: "availability", label: "Availability" },
  { id: "needing_repair", label: "Need To Repair" },
  { id: "durability", label: "Durability" },
  { id: "mileage", label: "Mileage" },
  { id: "price", label: "Price" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const RentalProductsDetailsTable = ({ records, openInPopup, setRecords }) => {
  const classes = useStyles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
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

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    productService.deleteProduct(id);
    setRecords(productService.getAllProducts());
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };
  return (
    <>
      <Toolbar>
        <Controls.Input
          label="Search Products"
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
              <TableCell>{`${record.durability}/${record.max_durability}`}</TableCell>
              <TableCell>
                {record.mileage === null ? 0 : record.mileage}
              </TableCell>
              <TableCell>{record.price}</TableCell>
              <TableCell>
                <Controls.ActionButton
                  color="primary"
                  onClick={() => {
                    openInPopup(record);
                  }}
                >
                  <EditOutlinedIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                  color="secondary"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure to delete this record?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        onDelete(record.id);
                      },
                    });
                  }}
                >
                  <CloseIcon fontSize="small" />
                </Controls.ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      {records.length > 5 && <TblPagination />}
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Controls.Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default RentalProductsDetailsTable;
