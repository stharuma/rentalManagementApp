import React from "react";
import { Grid, Container, ButtonGroup, Typography } from "@material-ui/core";
import Controls from "../../../common/Controls";
import * as productService from "../../../services/productService";
/**
 * @author Suresh Tharuma
 * @function BookingProduct
 **/

const ReturningProduct = (props) => {
  const handleReturningProcess = () => {
    const returnedProduct = props.returnedProduct;

    returnedProduct["availability"] = true;
    returnedProduct["hasRent"] = false;
    if (returnedProduct.type === "plain") {
      const durability =
        returnedProduct.durability - returnedProduct.totalRentalDays * 1;
      returnedProduct["durability"] = durability;
    } else if (returnedProduct.type === "meter") {
      const durability =
        returnedProduct.durability -
        returnedProduct.totalRentalDays * 2 -
        (2 * returnedProduct.totalMileage) / 10;
      returnedProduct["durability"] = durability;
    }
    console.log("returnedProduct", returnedProduct);
    productService.updateProduct(returnedProduct);
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
              Your Total price is ${props.returnedProduct.totalRentalPrice}
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
                text="Confirm"
                variant="outlined"
                onClick={handleReturningProcess}
              />

            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ReturningProduct;
