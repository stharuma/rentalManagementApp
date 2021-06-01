import React, {useState} from 'react';
import * as productService from "../../services/productService";
import RentalProductsDetailsTable from './rentalProductsDetailsTable';
import { Typography, Grid, Divider, Container } from "@material-ui/core";


/**
* @author
* @function RentalProducts
**/

const RentalProducts = (props) => { 
const [records, setRecords] = useState(productService.getRentalProductData());

console.log('records ', records)
  return(
    <>
    <Container fixed>
      <Grid item xs={12} sm={12} md={12} lg={12} align="left">
      <Typography gutterBottom variant="subtitle1" align="left" color="primary" fontWeight="fontWeightMedium">
        Products Details:
        <br />
      </Typography>
      <Divider />
      <RentalProductsDetailsTable records={records}/>
    
    </Grid>
    </Container>
   
    </>
   )

 }

export default RentalProducts