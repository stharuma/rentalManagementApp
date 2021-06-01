import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import Controls from "../../../common/Controls";
import * as productService from "../../../services/productService";

/**
 * @author Suresh Tharuma
 * @function SelectedProduct
 **/
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    flexGrow: 1,
  },
}));

const SelectedProduct = (props) => {
  const classes = useStyles();
  const {isBook, bookedProduct, setBookedProduct, returnProduct, setReturnProduct } = props;
  const [availableProductsByName, setAvailableProductsByName] = useState([]);
  const [notAvailableProductsByName, setNotAvailableProductsByName] = useState([]);

  const _onInputNameChange = (event, value) => {
    console.log("value ", value);
    if(isBook){
      setAvailableProductsByName(productService.getAllAvailableProducts());
    }else{
      setNotAvailableProductsByName(productService.getAllNotAvailableProducts());
    }
      
    
  };

  const onFocus = (event) => {
    if (event.target.autocomplete === "off") {
      event.target.autocomplete = "noop";
    }
  };

  return (
    <>
      <Grid container spacing={3} className={classes.pageContent}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id="fname"
            name="name"
            value={isBook ? bookedProduct : returnProduct}
            options={isBook ? availableProductsByName : notAvailableProductsByName}
            getOptionLabel={(option) => option && option.name ? option.name + "/" + option.code :""}
            style={{ width: 500 }}
            onInputChange={_onInputNameChange}
            onChange={(e, value) => {
              isBook ? setBookedProduct(value):setReturnProduct(value);
            }}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                label={isBook ? "Select Product For Book" : "Select Product For Return"}
                variant="outlined"
                fullWidth
                autoComplete="off"
                              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SelectedProduct;
