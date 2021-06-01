import React, { useState } from "react";
import SelectedProduct from "./selectProductForm";
import {
  Grid,
  Container,
  ButtonGroup,
} from "@material-ui/core";
import Controls from "../../../common/Controls";

/**
 * @author Suresh
 * @function BookedProduct
 **/

const BookedProduct = (props) => {
  const [bookedProduct, setBookedProduct] = useState({});
  console.log();
  return (
    <>
      <Container fixed>
        <Grid container justify="left" spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} align="left">
            <SelectedProduct
              isBook={true}
              bookedProduct={bookedProduct}
              setBookedProduct={setBookedProduct}
            />
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
                  //setOpenBookPopup(true);
                }}
              />
              <Controls.Button
                text="Yes"
                variant="outlined"
                onClick={() => {
                  // setOpenReturnPopup(true);
                }}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>{" "}
    </>
  );
};

export default BookedProduct;
