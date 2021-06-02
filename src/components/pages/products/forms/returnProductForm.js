import React, { useState } from "react";
import SelectedProduct from "./selectProductForm";
import { Grid, Container, ButtonGroup } from "@material-ui/core";
import Controls from "../../../common/Controls";
import { useForm, Form } from "../../../common/useForm";
import ReturningProduct from "./rerurningProduct";

/**
 * @author Suresh Tharuma
 * @function ReturnProduct
 **/
const initialFValues = {
  usedMileage: 0,
};
const ReturnProduct = (props) => {
  const [returnedProduct, setReturnedProduct] = useState({});
  const [openReturningPopup, setOpenReturningPopup] = useState(false);
  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    true
  );

  const handleReturning = () => {
    console.log('returnedProduct11 ',returnedProduct)
     let diffDays = getDifferenceInDays(new Date(returnedProduct.fromDate), new Date(returnedProduct.toDate));
     console.log('diffDays ',diffDays)
     setReturnedProduct({
      ...returnedProduct,
      totalRentalDays: diffDays,
      totalRentalPrice: diffDays * returnedProduct.price,
      totalMileage: values.usedMileage
    });

    setOpenReturningPopup(true);
  };

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }

  return (
    <>
      <Container fixed>
        <Grid container justify="left" spacing={3}>
          <Grid item xs={12} sm={12} md={8} lg={8} >
            <SelectedProduct
              isBook={false}
              returnProduct={returnedProduct}
              setReturnProduct={setReturnedProduct}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} >
            <Controls.Input
              label="Used Mileage"
              name="usedMileage"
              value={values.usedMileage}
              onChange={handleInputChange}
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
                  props.setOpenPopup(false);
                }}
              />
              <Controls.Button
                text="Yes"
                variant="outlined"
                onClick={handleReturning}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
      <Controls.Popup
        title="return A Product"
        openPopup={openReturningPopup}
        setOpenPopup={setOpenReturningPopup}
      >
        <ReturningProduct
          setOpenPopup={setOpenReturningPopup}
          returnedProduct={returnedProduct}
          setRecords={props.setRecords}
        />
      </Controls.Popup>
    </>
  );
};

export default ReturnProduct;
