import React, { useState, useEffect } from "react";
import * as productService from "../../services/productService";
import RentalProductsDetailsTable from "./rentalProductsDetailsTable";
// import SelectedProduct from "../products/forms/selectProductForm";
import AddIcon from "@material-ui/icons/Add";
import {
  Typography,
  Grid,
  Divider,
  Container,
  makeStyles,
  ButtonGroup,
} from "@material-ui/core";
import Controls from "../../common/Controls";
import BookedProduct from "./forms/bookProductForm";
import ReturnProduct from "./forms/returnProductForm";
import ProductForm from "./forms/productForm";

/**
 * @author
 * @function RentalProducts
 **/

const useStyles = makeStyles((theme) => ({
  newButton: {
    display: "flex",
    right: "10px",
  },
}));

const RentalProducts = (props) => {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openBookPopup, setOpenBookPopup] = useState(false);
  const [openReturnPopup, setOpenReturnPopup] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    productService.addProductsToLocalStorage();
    setRecords(productService.getAllProducts());
  }, []);

  const addOrEdit = (product, resetForm) => {
    if (product.id == null) productService.insertProduct(product);
    else productService.updateProduct(product);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(productService.getAllProducts());
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

   return (
    <>
      <Container fixed>
        <Grid container justify="left" spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} align="left">
            <Typography
              gutterBottom
              variant="subtitle1"
              align="left"
              color="primary"
              fontWeight="fontWeightMedium"
            >
              Products Details:
              <br />
            </Typography>

            <Divider />
            <RentalProductsDetailsTable records={records} setRecords={setRecords} openInPopup={openInPopup}/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} align="left">
            <Controls.Button
              text="Add New Product"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} align="right">
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Controls.Button
                text="Book"
                variant="outlined"
                className={classes.newButton}
                onClick={() => {
                  setOpenBookPopup(true);
                }}
              />
              <Controls.Button
                text="Return"
                variant="outlined"
                className={classes.newButton}
                onClick={() => {
                  setOpenReturnPopup(true);
                }}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
      <Controls.Popup
        title="Book A Product"
        openPopup={openBookPopup}
        setOpenPopup={setOpenBookPopup}
      >
        <BookedProduct
          setOpenPopup={setOpenBookPopup}
          setRecords={setRecords}
        />
      </Controls.Popup>
      <Controls.Popup
        title="Return A Product"
        openPopup={openReturnPopup}
        setOpenPopup={setOpenReturnPopup}
      >
        <ReturnProduct
          setOpenPopup={setOpenReturnPopup}
          setRecords={setRecords}
        />
      </Controls.Popup>
      <Controls.Popup
        title="Product Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductForm recordForEdit={recordForEdit} addOrEdit={addOrEdit}  />
      </Controls.Popup>
    </>
  );
};

export default RentalProducts;
