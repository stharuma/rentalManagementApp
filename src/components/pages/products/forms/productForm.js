import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../common/Controls";
import { useForm, Form } from "../../../common/useForm";

/**
 * @author Suresh Tharuma
 * @function ProductForm
 **/

const initialFValues = {
  code: "",
  name: "",
  type: "",
  availability: true,
  needing_repair: false,
  durability: 0,
  max_durability: 0,
  mileage: 0,
  price: 0,
  minimum_rent_period: 0,
};

const ProductForm = (props) => {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("code" in fieldValues)
      temp.code = fieldValues.code ? "" : "This code field is required.";
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This name field is required.";
    if ("type" in fieldValues)
      temp.type = fieldValues.type ? "" : "This type field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  return (
    <>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="code"
              label="Code"
              value={values.code}
              onChange={handleInputChange}
              error={errors.code}
            />
            <Controls.Input
              label="Name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <Controls.Input
              label="Type"
              name="type"
              value={values.type}
              onChange={handleInputChange}
              error={errors.type}
            />
            <Controls.Input
              label="Availability"
              name="availability"
              value={values.availability}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Minimum Rent Period"
              name="minimum_rent_period"
              value={values.minimum_rent_period}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              name="needing_repair"
              label="Need To Repair"
              value={values.needing_repair}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Durability"
              name="durability"
              value={values.durability}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Max Durability"
              name="max_durability"
              value={values.max_durability}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Mileage"
              name="mileage"
              value={values.mileage}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Price"
              name="price"
              value={values.price}
              onChange={handleInputChange}
            />

            <div>
              <Controls.Button type="submit" text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default ProductForm;
