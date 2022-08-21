import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Grid, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useSnackbar } from 'notistack'
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { studentAction } from "../../action/student.action";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const StudentRegistrationValidation = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  fatherName: Yup.string().required("This field is required"),
  emailId: Yup.string()
    .email("Invalid email address")
    .required("This field is required"),
  address: Yup.string().required("This field is required"),
  mobile: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Mobile number is not valid"
    )
    .required("This field is required"),
  gender: Yup.string().required("This field is required"),
  // dob: Yup.string().required("This field is required"),
  country: Yup.string().required("This field is required"),
});

function AddStudent({studentData}) {

const { enqueueSnackbar } = useSnackbar()
const [files, setFiles] = useState({})
const handleAdd = (values) =>{
  values.id = "5"
  studentData.push(values)
  studentAction(studentData)
  enqueueSnackbar("Record has been added", {
    variant: 'success',
    autoHideDuration: 2000

  })
}

const [thumb, setThumb] = useState({})

const handleFiles = (files) =>{
    let reader = new FileReader();
    reader.onloadend = () => {
      setThumb(reader.result);
    };
    reader.readAsDataURL(files);
    // console.log(files)
}



  return (
    <Box>
      <Container maxWidth={"md"}>
        <Grid container spacing={2}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              fatherName: "",
              emailId: "",
              address: "",
              mobile: "",
              gender: "male",
              dob: "",
              country: "",
              photos:thumb
            }}
            validationSchema={StudentRegistrationValidation}
           
            onSubmit={(values) => {
              handleAdd(values)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  variant="standard"
                  name="firstName"
                  label="First Name"
                  error={errors.firstName && touched.firstName}
                  helperText={errors.firstName}
                />
                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  variant="standard"
                  name="lastName"
                  label="Last Name"
                  error={errors.lastName && touched.lastName}
                  helperText={errors.lastName}
                />

                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  variant="standard"
                  name="fatherName"
                  label="Father Name"
                  error={errors.fatherName && touched.fatherName}
                  helperText={errors.fatherName}
                />

                

                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  variant="standard"
                  name="emailId"
                  label="Email Id"
                  error={errors.emailId && touched.emailId}
                  helperText={errors.emailId}
                />

                

                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  variant="standard"
                  name="address"
                  label="Address"
                  multiline
                  rows={4}
                  error={errors.address && touched.address}
                  helperText={errors.address}
                />
                

                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  variant="standard"
                  name="mobile"
                  label="Mobile no."
                  error={errors.mobile && touched.mobile}
                  helperText={errors.mobile}
                />

                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    
                    <Field
                      type="radio"
                      as={FormControlLabel}
                      name="gender"
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <Field
                      type="radio"
                      as={FormControlLabel}
                      name="gender"
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <Field
                      type="radio"
                      as={FormControlLabel}
                      name="gender"
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>

                
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Stack spacing={2}>
                    <MobileDatePicker
                      inputFormat="MM/DD/YYYY"
                      name="dob"
                      label="DOB"
                      value={values.dob}
                      onChange={(date) => {
                        setFieldValue("dob", date._i);
                        console.log(values);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>

                

                <Field
                  as={TextField}
                  fullWidth
                  type="text"
                  variant="standard"
                  name="country"
                  label="Country"
                  error={errors.country && touched.country}
                  helperText={errors.country}
                  select
                >
                  <MenuItem key={"US"} value={"US"}>
                    USA
                  </MenuItem>
                  <MenuItem key={"IN"} value={"IN"}>
                    India
                  </MenuItem>
                </Field>

                

                <Button
                  sx={{ mb: 3, mt: 3 }}
                  variant="contained"
                  component="label"
                >
                  Upload File
                  <input
                    onChange={(event) => {
                      // setFieldValue("photos", event.target.files[0]);
                      console.log(event.target.files[0])
                      // handleFiles()
                      handleFiles(event.target.files[0])
                    }}
                    accept="image/*"
                    type="file"
                    // multiple
                    hidden
                  />
                </Button>

                <Box>
                 <div>
                  <img style={{"width":"200px", "maxHeight":"300px"}} src={thumb} />
                 </div>
                  
                </Box>

            
                <Button sx={{ mb: 3, mt: 3 }} variant="contained" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Container>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  studentData : state.students.studentData
})

export default connect(mapStateToProps)(AddStudent)