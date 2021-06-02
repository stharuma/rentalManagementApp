import React, { useState } from "react";
import SelectedProduct from "./selectProductForm";
import { Grid, Container, ButtonGroup } from "@material-ui/core";
import Controls from "../../../common/Controls";
import { useForm, Form } from "../../../common/useForm";
import BookingProduct from "./bookingProduct";

/**
 * @author Suresh
 * @function BookedProduct
 **/
const initialFValues = {
  toDate: new Date(),
  fromDate: new Date(),
};
const BookedProduct = (props) => {
  const [bookedProduct, setBookedProduct] = useState({});
  const [openBookingPopup, setOpenBookingPopup] = useState(false);

  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    true
  );

  const handleBooking = () => {
    let diffDays = getDifferenceInDays(values.toDate, values.fromDate);
    setBookedProduct({
      ...bookedProduct,
      toDate: values.toDate,
      fromDate: values.fromDate,
      estimateRentalDays: diffDays,
      rentalEstimatePrice: diffDays * bookedProduct.price,
    });

    setOpenBookingPopup(true);
  };

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }

  return (
    <>
      <Container fixed>
        <Grid container justify="left" spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} align="left">
            <SelectedProduct
              isBook={true}
              bookedProduct={bookedProduct}
              setBookedProduct={setBookedProduct}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} align="left">
            <Controls.DatePicker
              name="fromDate"
              label="From Date"
              value={values.fromDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} align="left">
            <Controls.DatePicker
              name="toDate"
              label="To Date"
              value={values.toDate}
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
                disabled={
                  bookedProduct && Object.keys(bookedProduct).length
                    ? false
                    : true
                }
                variant="outlined"
                onClick={handleBooking}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
      <Controls.Popup
        title="Book A Product"
        openPopup={openBookingPopup}
        setOpenPopup={setOpenBookingPopup}
      >
        <BookingProduct
          setOpenPopup={setOpenBookingPopup}
          bookedProduct={bookedProduct}
          setRecords={props.setRecords}
        />
      </Controls.Popup>
    </>
  );
};

export default BookedProduct;
