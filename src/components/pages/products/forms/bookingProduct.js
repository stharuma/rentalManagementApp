import React from "react";
import { Grid, Container, ButtonGroup, Typography } from "@material-ui/core";
import Controls from "../../../common/Controls";
import * as productService from "../../../services/productService";
/**
 * @author Suresh Tharuma
 * @function BookingProduct
 **/

const BookingProduct = (props) => {
  const handleBookingProcess = () => {
    const bookedProduct = props.bookedProduct;

    bookedProduct["availability"] = false;
    bookedProduct["hasRent"] = true;
    if (bookedProduct.type === "plain") {
      const durability =
        bookedProduct.durability - bookedProduct.estimateRentalDays * 1;
      bookedProduct["estimateDurability"] = durability;
    } else if (bookedProduct.type === "meter") {
      const durability =
        bookedProduct.durability - bookedProduct.estimateRentalDays * 2;
      const estimateMileage = bookedProduct.estimateRentalDays * 10;
      bookedProduct["estimateDurability"] = durability;
      bookedProduct["estimateMileage"] = estimateMileage;
    }
    console.log("bookedProduct", bookedProduct);
    productService.updateProduct(bookedProduct);
    props.setRecords(productService.getAllProducts);
    props.setOpenPopup(false);
  };

  return (
    <>
      {" "}
      <Container fixed>
        <Grid container justify="left" spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} align="left">
            <Typography gutterBottom variant="subtitle1">
              Your estimated price is ${props.bookedProduct.rentalEstimatePrice}
              <br />
              Do you want to procedure?
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} align="right">
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Controls.Button
                text="No"
                variant="outlined"
                onClick={() => {
                  props.setOpenPopup(false);
                }}
              />
              <Controls.Button
                text="Yes"
                variant="outlined"
                onClick={handleBookingProcess}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BookingProduct;
