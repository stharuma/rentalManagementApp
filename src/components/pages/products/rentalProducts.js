import React, { useState } from "react";
import * as productService from "../../services/productService";
import RentalProductsDetailsTable from "./rentalProductsDetailsTable";
import SelectedProduct from "../products/forms/selectProductForm";
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
  const [records, setRecords] = useState(productService.getAllProducts());
  const [openBookPopup, setOpenBookPopup] = useState(false);
  const [openReturnPopup, setOpenReturnPopup] = useState(false);

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
            <RentalProductsDetailsTable records={records} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} align="right">
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
        <BookedProduct />
      </Controls.Popup>
      <Controls.Popup
        title="Return A Product"
        openPopup={openReturnPopup}
        setOpenPopup={setOpenReturnPopup}
      >
        <ReturnProduct />
      </Controls.Popup>
    </>
  );
};

export default RentalProducts;
